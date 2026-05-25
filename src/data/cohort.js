// src/data/cohort.js
//
// Single source of truth for the active cohort. Edit this file to roll over
// to the next cohort. Imported by:
//   - src/pages/AISummerCampPage.jsx
//   - src/components/cohort/CohortCTA.jsx
//   - src/components/cohort/CohortWaitlistOverlay.jsx
//   - src/pages/ai-summer-camp/welcome.astro
//   - src/components/homepage/CohortCallout.jsx
//   - src/components/layout/CohortAnnouncementBar.astro
//   - src/emails/cohortPaidEmail.js
//   - src/emails/cohortWaitlistEmail.js
//   - api/cohort-status.js
//   - api/stripe-webhook.js
//   - api/waitlist-signup.js
//
// NOTE: previously a .ts file. Switched to .js because the Node runtime that
// astro dev uses for API endpoints (via vercel dev) doesn't natively import
// .ts files. Frontend (Astro/Vite) handles .js identically to .ts.
//
// ROLLOVER CHECKLIST (when launching the next cohort):
//   1. Bump COHORT.id and COHORT.label
//   2. Update DATES (startISO, endISO, fridaysFormatted, timeET, officeHoursET)
//   3. Create a NEW Stripe product + Payment Link, update stripeProductId
//      and stripePaymentLinkUrl
//   4. Bump CALLOUT_DISMISS_KEY so previously-dismissed users see the bar again
//   5. Verify Stripe webhook still subscribes to the new product's
//      checkout.session.completed (if it filters by product)

export const COHORT = {
  // Identity
  id: 'cohort_01',
  label: 'Cohort 01',
  shortLabel: 'AI Summer Camp · Cohort 01',

  // Capacity
  capacity: 15,

  // Stripe — TEST mode values (Plan Task 12, 2026-05-24).
  // When going live, swap these for live-mode equivalents (no `test_` in the
  // Payment Link URL, prod_... ID from live mode).
  stripeProductId: 'prod_UZxdsowkWbTfVI',
  stripePaymentLinkUrl: 'https://buy.stripe.com/test_4gM5kx1gf3h7bKP2OvfIs00',
  priceUSD: 99,

  // Schedule
  startISO: '2026-06-05',
  endISO: '2026-06-26',
  fridaysFormatted: 'Fri Jun 5, 12, 19, 26',
  timeET: '2–3 PM ET',
  officeHoursET: 'Tue 1–2 PM ET',
};
