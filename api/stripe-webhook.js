// api/stripe-webhook.js
//
// Stripe webhook receiver. Subscribes to checkout.session.completed.
// Verifies the Stripe signature, then:
//   1. Appends a row to the Cohort tab of mvp-club-master-list (Sheets API
//      via the bizopstool service account)
//   2. Sends "You're in" email via Resend using CohortPaidEmail template
//
// Node runtime (not edge) is required because signature verification needs
// the raw request body. Vercel's default node functions give us the raw body
// via the `req` stream (when bodyParser is disabled).

import Stripe from 'stripe';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import CohortPaidEmail from '../src/emails/CohortPaidEmail.jsx';
import { appendCohortRow } from '../src/lib/sheets-client.js';
import { COHORT } from '../src/data/cohort.ts';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const resendApiKey = process.env.RESEND_API_KEY;
  const sheetsKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!secretKey || !webhookSecret || !resendApiKey || !sheetsKey) {
    console.error('[stripe-webhook] missing env vars');
    res.status(500).json({ error: 'misconfigured' });
    return;
  }

  const stripe = new Stripe(secretKey, { apiVersion: '2024-06-20' });
  const resend = new Resend(resendApiKey);

  let event;
  try {
    const rawBody = await readRawBody(req);
    const signature = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error('[stripe-webhook] signature verification failed:', err?.message ?? err);
    res.status(400).json({ error: 'invalid signature' });
    return;
  }

  if (event.type !== 'checkout.session.completed') {
    res.status(200).json({ received: true, ignored: event.type });
    return;
  }

  const session = event.data.object;

  if (session.payment_status !== 'paid') {
    res.status(200).json({ received: true, status: session.payment_status });
    return;
  }

  const email = session.customer_details?.email || session.customer_email;
  const fullName = session.customer_details?.name || '';
  const firstName = fullName.trim().split(/\s+/)[0] || '';

  if (!email) {
    console.error('[stripe-webhook] session has no email:', session.id);
    res.status(200).json({ received: true, error: 'no email' });
    return;
  }

  // 1. Append row to Cohort tab via Sheets API (best-effort, log on failure).
  try {
    await appendCohortRow({
      firstName,
      email,
      source: 'cohort_paid',
      cohortId: COHORT.id,
      stripeSessionId: session.id,
    });
  } catch (err) {
    console.error('[stripe-webhook] sheets append failed:', err?.message ?? err);
  }

  // 2. Send "You're in" email via Resend with idempotency key = Stripe event ID.
  try {
    const html = await render(CohortPaidEmail({ firstName: firstName || 'there' }));
    const sendRes = await resend.emails.send(
      {
        from: 'MVP Club <info@mvpclub.ai>',
        to: email,
        subject: "You're in. Welcome to AI Summer Camp Cohort 01.",
        html,
        reply_to: 'info@mvpclub.ai',
      },
      {
        idempotencyKey: event.id,
      }
    );
    if (sendRes.error) {
      console.error('[stripe-webhook] resend error:', sendRes.error);
    }
  } catch (err) {
    console.error('[stripe-webhook] resend send failed:', err?.message ?? err);
  }

  // Always 200 to Stripe — we don't want endless retries on a transient hiccup.
  res.status(200).json({ received: true });
}
