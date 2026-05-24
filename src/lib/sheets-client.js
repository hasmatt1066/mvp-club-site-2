// src/lib/sheets-client.js
//
// Server-side helper for appending cohort signup rows to the `Cohort` tab
// of the `mvp-club-master-list` Google Sheet. Reuses the bizopstool service
// account credentials (loaded from GOOGLE_SERVICE_ACCOUNT_KEY env var).
//
// Used by api/stripe-webhook.js and api/waitlist-signup.js. The Sheets API
// replaces the previous Apps Script POST as the persistence layer for
// cohort signups. Other (non-cohort) signup flows still use Apps Script.

import { google } from 'googleapis';

// Sheet that bizopstool already manages — same ID lives in
// bizopstool/server/lib/email-sender.ts and scripts/send-drip.cjs.
const SHEET_ID = '1aEkiTNpdUm5vv31Ln-zWPvHTZgP-CX_zhBOB08jCpkk';

// Tab + column range. We append below the last row of column A.
// Columns: A=timestamp B=first_name C=email D=source E=cohort_id
//          F=stripe_session_id G=status H=notes
const COHORT_TAB_RANGE = 'Cohort!A:H';

function getServiceAccountCredentials() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY env var is not set');
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY is not valid JSON: ' + (err?.message ?? err));
  }
}

function getSheetsClient() {
  const creds = getServiceAccountCredentials();
  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return google.sheets({ version: 'v4', auth });
}

/**
 * Append a cohort signup row to the Cohort tab.
 *
 * @param {object} args
 * @param {string} args.firstName        - User's first name (may be empty)
 * @param {string} args.email            - User's email (required)
 * @param {string} args.source           - 'cohort_paid' | 'cohort_waitlist'
 * @param {string} args.cohortId         - e.g. 'cohort_01' (from COHORT.id)
 * @param {string} [args.stripeSessionId] - Stripe Checkout session ID for paid sources
 * @returns {Promise<void>}
 */
export async function appendCohortRow({ firstName, email, source, cohortId, stripeSessionId }) {
  const sheets = getSheetsClient();
  const timestamp = new Date().toISOString();
  const row = [
    timestamp,
    firstName || '',
    email || '',
    source || '',
    cohortId || '',
    stripeSessionId || '',
    '', // status — manual annotation field
    '', // notes — manual annotation field
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: COHORT_TAB_RANGE,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  });
}
