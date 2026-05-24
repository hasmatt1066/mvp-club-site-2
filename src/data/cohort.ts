// src/data/cohort.ts
//
// Single source of truth for the active cohort. Edit this file to roll over
// to the next cohort. Imported by:
//   - src/pages/AISummerCampPage.jsx
//   - src/components/cohort/CohortCTA.jsx
//   - src/components/cohort/CohortWaitlistOverlay.jsx
//   - src/pages/ai-summer-camp/welcome.astro
//   - src/components/homepage/CohortCallout.jsx
//   - src/components/layout/CohortAnnouncementBar.astro
//   - src/emails/CohortPaidEmail.jsx
//   - src/emails/CohortWaitlistEmail.jsx
//   - api/cohort-status.js
//   - api/stripe-webhook.js
//   - api/waitlist-signup.js
//
// ROLLOVER CHECKLIST (when launching the next cohort):
//   1. Bump COHORT.id and COHORT.label
//   2. Update DATES (startISO, endISO, fridaysFormatted, timeET, officeHoursET)
//   3. Create a NEW Stripe product + Payment Link, update stripeProductId
//      and stripePaymentLinkUrl
//   4. Bump CALLOUT_DISMISS_KEY so previously-dismissed users see the bar again
//      (current value 'cohort_bar_dismissed_2026_06' lives in
//      src/components/layout/CohortAnnouncementBar.astro)
//   5. Verify Stripe webhook still subscribes to the new product's
//      checkout.session.completed (if it filters by product)

export const COHORT = {
  // Identity
  id: 'cohort_01',
  label: 'Cohort 01',
  shortLabel: 'AI Summer Camp · Cohort 01',

  // Capacity
  capacity: 15,

  // Stripe (replace placeholders during Plan Task 12)
  stripeProductId: 'prod_REPLACE_ME_AFTER_CREATING_IN_STRIPE',
  stripePaymentLinkUrl: 'https://buy.stripe.com/REPLACE_ME_AFTER_CREATING_LINK',
  priceUSD: 99,

  // Schedule
  startISO: '2026-06-05',
  endISO: '2026-06-26',
  fridaysFormatted: 'Fri Jun 5, 12, 19, 26',
  timeET: '2–3 PM ET',
  officeHoursET: 'Tue 1–2 PM ET',
} as const;

export type CohortStatus = 'open' | 'full';
