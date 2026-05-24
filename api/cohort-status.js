// api/cohort-status.js
//
// Vercel edge function. Returns the live capacity status of the active cohort.
//
//   GET /api/cohort-status
//   200 OK
//   Cache-Control: public, s-maxage=60, stale-while-revalidate=300
//   { "status": "open" | "full", "remaining": number | null, "fallback"?: true }
//
// FAILURE MODE: any error (missing env, Stripe timeout, malformed response)
// returns { status: 'open', remaining: null, fallback: true }. We always
// prefer false-positive 'open' over false-positive 'full' — Stripe's own
// inventory cap is the real backstop.

import Stripe from 'stripe';

export const config = { runtime: 'edge' };

const CAPACITY = 15;

export default async function handler(req) {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
  };

  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const productId = process.env.COHORT_01_PRODUCT_ID;

    if (!secretKey || !productId) {
      return new Response(
        JSON.stringify({ status: 'open', remaining: null, fallback: true }),
        { status: 200, headers }
      );
    }

    const stripe = new Stripe(secretKey, { apiVersion: '2024-06-20' });

    // Count paid Checkout Sessions whose line items include our product.
    // We list up to 100 paid sessions and filter client-side. At 15 seats
    // this is comfortably under the limit even if the product had multiple
    // line items per session.
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      expand: ['data.line_items'],
    });

    const paidCount = sessions.data.filter((session) => {
      if (session.payment_status !== 'paid') return false;
      const items = session.line_items?.data ?? [];
      return items.some((item) => item.price?.product === productId);
    }).length;

    const remaining = Math.max(0, CAPACITY - paidCount);
    const status = remaining > 0 ? 'open' : 'full';

    return new Response(JSON.stringify({ status, remaining }), {
      status: 200,
      headers,
    });
  } catch (err) {
    console.error('[cohort-status] error:', err?.message ?? err);
    return new Response(
      JSON.stringify({ status: 'open', remaining: null, fallback: true }),
      { status: 200, headers }
    );
  }
}
