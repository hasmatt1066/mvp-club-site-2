// api/waitlist-signup.js
//
// Vercel node function. Receives waitlist form submissions from the
// CohortWaitlistOverlay component. Appends a row to the Cohort tab of
// mvp-club-master-list (Sheets API via the bizopstool service account)
// and sends the "You're on the waitlist" email via Resend.
//
// This endpoint exists (vs. POST-from-browser-direct-to-Sheets) because
// both the Resend API key and the GCP service account key must stay
// server-side.

import { Resend } from 'resend';
import { render } from '@react-email/components';
import CohortWaitlistEmail from '../src/emails/CohortWaitlistEmail.jsx';
import { appendCohortRow } from '../src/lib/sheets-client.js';
import { COHORT } from '../src/data/cohort.ts';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const sheetsKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!resendApiKey || !sheetsKey) {
    console.error('[waitlist-signup] missing env vars');
    res.status(500).json({ error: 'misconfigured' });
    return;
  }

  let body;
  try {
    body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch (_) {
    res.status(400).json({ error: 'invalid json' });
    return;
  }

  const firstName = (body.firstName || '').toString().trim();
  const email = (body.email || '').toString().trim().toLowerCase();

  if (!email || !email.includes('@')) {
    res.status(400).json({ error: 'invalid email' });
    return;
  }

  const resend = new Resend(resendApiKey);

  // 1. Append row to Cohort tab via Sheets API (best-effort).
  try {
    await appendCohortRow({
      firstName,
      email,
      source: 'cohort_waitlist',
      cohortId: COHORT.id,
      stripeSessionId: '',
    });
  } catch (err) {
    console.error('[waitlist-signup] sheets append failed:', err?.message ?? err);
  }

  // 2. Send waitlist email via Resend with idempotency key.
  try {
    const html = await render(CohortWaitlistEmail({ firstName: firstName || 'there' }));
    const sendRes = await resend.emails.send(
      {
        from: 'MVP Club <info@mvpclub.ai>',
        to: email,
        subject: "You're on the AI Summer Camp Cohort 01 waitlist.",
        html,
        reply_to: 'info@mvpclub.ai',
      },
      {
        idempotencyKey: `cohort_waitlist:${email}`,
      }
    );
    if (sendRes.error) {
      console.error('[waitlist-signup] resend error:', sendRes.error);
    }
  } catch (err) {
    console.error('[waitlist-signup] resend send failed:', err?.message ?? err);
  }

  res.status(200).json({ received: true });
}
