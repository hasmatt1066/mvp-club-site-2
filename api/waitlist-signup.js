// api/waitlist-signup.js
//
// Vercel node function. Receives waitlist form submissions from the
// CohortWaitlistOverlay component. Writes a sheet row via Apps Script
// (source='cohort_waitlist') and sends the "You're on the waitlist" email
// via Resend using CohortWaitlistEmail template.
//
// This endpoint exists (vs. POST-from-browser-direct-to-Apps-Script) because
// the Resend API key must stay server-side.

import { Resend } from 'resend';
import { render } from '@react-email/components';
import CohortWaitlistEmail from '../src/emails/CohortWaitlistEmail.jsx';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  const appsScriptUrl = process.env.APPS_SCRIPT_URL;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!appsScriptUrl || !resendApiKey) {
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

  // 1. Record sheet row via Apps Script (best-effort).
  try {
    const appsRes = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        email,
        timestamp: new Date().toISOString(),
        source: 'cohort_waitlist',
      }),
    });
    if (!appsRes.ok) {
      console.error('[waitlist-signup] apps script returned', appsRes.status);
    }
  } catch (err) {
    console.error('[waitlist-signup] apps script forward failed:', err?.message ?? err);
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
