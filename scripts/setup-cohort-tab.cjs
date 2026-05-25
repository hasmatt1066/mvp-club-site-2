#!/usr/bin/env node
/**
 * setup-cohort-tab.cjs
 *
 * One-time setup + smoke test for the cohort signup flow's storage layer.
 *
 * What it does:
 *   1. Connects to mvp-club-master-list via the service account in
 *      GOOGLE_SERVICE_ACCOUNT_KEY (from .env or env).
 *   2. Lists existing tabs. If `Cohort` is missing, creates it.
 *   3. Writes the canonical header row to Cohort!A1:H1 (idempotent —
 *      only writes if row 1 is empty or doesn't match).
 *   4. Smoke test: appends a dummy row, reads it back, then deletes it.
 *
 * Usage:
 *   node --env-file=.env scripts/setup-cohort-tab.cjs
 *
 * Requires:
 *   GOOGLE_SERVICE_ACCOUNT_KEY env var (the full service account JSON).
 *   Uses Node's built-in --env-file flag (Node 20+) to load .env, so no
 *   dotenv dependency is needed.
 */

const { google } = require('googleapis');

const SHEET_ID = '1aEkiTNpdUm5vv31Ln-zWPvHTZgP-CX_zhBOB08jCpkk';
const TAB_NAME = 'Cohort';
const HEADERS = [
  'timestamp',
  'first_name',
  'email',
  'source',
  'cohort_id',
  'stripe_session_id',
  'status',
  'notes',
];

function loadServiceAccount() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    console.error('FAIL: GOOGLE_SERVICE_ACCOUNT_KEY not set. Paste the JSON into .env first.');
    process.exit(1);
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error('FAIL: GOOGLE_SERVICE_ACCOUNT_KEY is not valid JSON:', err.message);
    process.exit(1);
  }
}

async function main() {
  const creds = loadServiceAccount();
  console.log(`Service account: ${creds.client_email}`);

  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });

  // 1. List tabs
  console.log('\nReading sheet metadata...');
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  const existingTabs = meta.data.sheets.map((s) => s.properties.title);
  console.log(`Existing tabs: ${existingTabs.join(', ')}`);

  const cohortTab = meta.data.sheets.find((s) => s.properties.title === TAB_NAME);

  // 2. Create Cohort tab if missing
  if (!cohortTab) {
    console.log(`\n"${TAB_NAME}" tab does not exist. Creating...`);
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: TAB_NAME,
                gridProperties: { rowCount: 1000, columnCount: HEADERS.length, frozenRowCount: 1 },
              },
            },
          },
        ],
      },
    });
    console.log(`  Created "${TAB_NAME}" tab with frozen header row.`);
  } else {
    console.log(`\n"${TAB_NAME}" tab already exists. Skipping creation.`);
  }

  // 3. Header row (write/verify)
  console.log('\nVerifying header row...');
  const headerResp = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${TAB_NAME}!A1:H1`,
  });
  const currentHeaders = headerResp.data.values?.[0] ?? [];
  const headersMatch = HEADERS.every((h, i) => currentHeaders[i] === h);

  if (!headersMatch) {
    console.log('  Headers missing/mismatched. Writing canonical headers...');
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${TAB_NAME}!A1:H1`,
      valueInputOption: 'RAW',
      requestBody: { values: [HEADERS] },
    });
    console.log(`  Wrote headers: ${HEADERS.join(' | ')}`);
  } else {
    console.log(`  Headers already correct: ${HEADERS.join(' | ')}`);
  }

  // 4. Smoke test: append a row, verify, delete
  console.log('\nSmoke test: appending dummy row...');
  const testRow = [
    new Date().toISOString(),
    '__setup_test__',
    'setup-test@mvpclub.invalid',
    'cohort_paid',
    'cohort_setup_test',
    'cs_setup_test',
    '',
    'smoke test from setup-cohort-tab.cjs — safe to delete',
  ];

  const appendResp = await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${TAB_NAME}!A:H`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [testRow] },
  });
  const appendedRange = appendResp.data.updates.updatedRange;
  console.log(`  Appended to: ${appendedRange}`);

  // Extract the row number from updatedRange (e.g. "Cohort!A5:H5" -> 5)
  const match = appendedRange.match(/!A(\d+):/);
  if (!match) {
    console.error('  Could not parse appended row number from:', appendedRange);
    process.exit(1);
  }
  const rowIndex = parseInt(match[1], 10);

  // Read it back to confirm
  const verifyResp = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${TAB_NAME}!A${rowIndex}:H${rowIndex}`,
  });
  const readBack = verifyResp.data.values?.[0] ?? [];
  if (readBack[2] === testRow[2] && readBack[3] === testRow[3]) {
    console.log('  Verified test row written correctly.');
  } else {
    console.error('  FAIL: read-back row did not match. Got:', readBack);
    process.exit(1);
  }

  // Delete the test row by clearing it (simpler than batchUpdate deleteDimension)
  console.log('  Deleting test row...');
  // Find Cohort sheet ID for the deleteDimension request
  const cohortMeta = (await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID }))
    .data.sheets.find((s) => s.properties.title === TAB_NAME);
  const cohortSheetId = cohortMeta.properties.sheetId;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET_ID,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: cohortSheetId,
              dimension: 'ROWS',
              startIndex: rowIndex - 1, // 0-indexed
              endIndex: rowIndex,
            },
          },
        },
      ],
    },
  });
  console.log('  Test row deleted.');

  console.log('\n✓ Cohort tab is set up and credentials work end-to-end.');
  console.log('  You can now run the local e2e test (Plan Task 15).');
}

main().catch((err) => {
  console.error('\nFAIL:', err?.message ?? err);
  if (err?.errors) console.error(JSON.stringify(err.errors, null, 2));
  process.exit(1);
});
