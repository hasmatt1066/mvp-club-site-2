# AI Summer Camp — Cohort Signup Flow

**Date:** 2026-05-21
**Status:** Approved (Matt) — ready for implementation planning
**Page affected:** `/ai-summer-camp`
**Cohort:** Cohort 01 (starts June 5, 2026, 15 seats, $99)

## Problem

The AI Summer Camp landing page (`src/pages/AISummerCampPage.jsx`) has two CTAs pointing at a placeholder `REGISTRATION_URL = '#'`, with a TODO comment for Matt to wire in a real signup URL. We need to:

1. Let visitors actually sign up.
2. Cap the cohort at 15 paid seats.
3. Once full, route new visitors to a waitlist instead of a dead-end.
4. Email each signup with confirmation of where they landed — "You're in" or "You're on the waitlist."

## Selection model

**First-come-first-served by payment.** A seat is held the moment Stripe records a successful payment. No human review, no application stage.

## Architecture

```
            User lands on /ai-summer-camp
                       │
            GET /api/cohort-status  (Vercel edge, 60s cache, fail-open)
                       │
                       ▼
              ┌────────┴────────┐
         status: open       status: full
              │                  │
              ▼                  ▼
   ┌──────────────────┐   ┌──────────────────────┐
   │ Reserve Your     │   │ Join the Waitlist    │
   │  Spot → Stripe   │   │  → CohortWaitlistOverlay
   │  Payment Link    │   │     POST Apps Script │
   └────────┬─────────┘   │     source=cohort_waitlist
            │             └──────────┬───────────┘
            ▼                        │
     Stripe checkout                 ▼
            │              "You're on the waitlist"
            ▼                        email
   Redirect to
   /ai-summer-camp/welcome
   (Astro page, static "you're in"
    landing — no email trigger here)

   ─── In parallel, server-to-server ───

   Stripe → checkout.session.completed webhook
            │
            ▼
   /api/stripe-webhook (Vercel node)
            │  verify signature
            │  retrieve session → email + name
            │  POST Apps Script (source=cohort_paid)
            ▼
   "You're in" custom email from info@mvpclub.ai
```

## Key behaviors

- **One CTA destination, two states.** Every "Reserve Your Spot" / "Save My Seat" button on the page is the same `<CohortCTA />` component. It internally decides whether to link to Stripe or open the waitlist overlay based on the fetched status. No two separate visible CTAs.
- **Fail open.** If `/api/cohort-status` errors or times out, the page defaults to `status: open`. Stripe's own 15-unit inventory cap is the backstop. We always prefer a false-positive "open" (rare: someone hits Stripe's sold-out page) over a false-positive "full" (we tell a real paying customer the cohort is closed when it isn't).
- **"You made it in" is two signals.** Stripe's automatic receipt (with our customized message), plus the `/ai-summer-camp/welcome` page they land on after payment. The custom "You're in" email from us is fired by the Stripe webhook, server-side, so it works even if the user closes the tab before the welcome page loads.
- **"You're on the waitlist" is one signal.** A custom email triggered by the existing Apps Script pipeline, with a new `source: 'cohort_waitlist'` branch.
- **Idempotent emails.** Apps Script checks the sheet for an existing row with the same email + same source before sending. Reloads and webhook retries don't double-send.

## File changes

### New files

| File | Purpose |
|---|---|
| `src/data/cohort.ts` | Single source of truth: capacity (15), Stripe Payment Link URL, product ID, dates, copy strings. Imported by the page, the callout, the announcement bar, the welcome page, and the API endpoints. Editing this file is the way to roll over to Cohort 02. |
| `api/cohort-status.js` | Vercel edge function. `GET` → asks Stripe how many seats are sold via `stripe.checkout.sessions.list` filtered by product ID and `payment_status='paid'`. Returns `{ status, remaining }`. Caches 60s at the edge via `Cache-Control: public, s-maxage=60, stale-while-revalidate=300`. Fails open. |
| `api/stripe-webhook.js` | Vercel node function (not edge — needs raw request body for signature verification). Subscribes to `checkout.session.completed`. Verifies Stripe signature using `STRIPE_WEBHOOK_SECRET`. Extracts customer email and name from the session. POSTs to the Apps Script with `source: 'cohort_paid'`. Returns 200 fast so Stripe doesn't retry. |
| `src/components/cohort/CohortCTA.jsx` | Dual-state CTA. Takes a `variant` prop (`"hero"` or `"postcard"`) for styling. Fetches status on mount. Renders either a Stripe link or a "Join the Waitlist" button that opens the overlay. Shares click-tracking with the existing `cohort_registration_click` GA event. |
| `src/components/cohort/CohortWaitlistOverlay.jsx` | Modeled on `src/WaitlistOverlay.jsx`. Email + first-name capture. POSTs to Apps Script with `source: 'cohort_waitlist'`. Closes with a confirmation state. Not a generalization of the existing overlay — separate component, shared visual language. |
| `src/pages/ai-summer-camp/welcome.astro` | "You're in" landing page. Fully static — no client-side fetches, no email firing logic, no use of `session_id`. Reuses `asc-` styling. Includes cohort dates, "add to calendar" links (`.ics` download + Google Calendar deep links), what-to-expect copy, and a "you'll get a welcome email shortly" reassurance line. Safe to bookmark or share. |

### Modified files

| File | Change |
|---|---|
| `src/pages/AISummerCampPage.jsx` | Remove `REGISTRATION_URL = '#'` constant and TODO. Replace the two inline anchor tags (hero deal card lines 87–96 + closing postcard lines 372–380) with `<CohortCTA variant="hero" />` and `<CohortCTA variant="postcard" />`. Keep `trackRegistrationClick` as a callback the component invokes. |
| `package.json` | Add `stripe` as a dependency. |
| `docs/email-workflow.md` | Document the two new sources (`cohort_paid`, `cohort_waitlist`) and the updated Apps Script `doPost` branching. |
| Google Apps Script (lives in Google Drive, not the repo) | Branch `doPost` on `source`. Add `sendCohortPaidEmail` and `sendCohortWaitlistEmail` functions. Add idempotency check: skip send if a row with same email + same source already exists. |

### Environment variables (Vercel)

| Var | Purpose | Notes |
|---|---|---|
| `STRIPE_SECRET_KEY` | Server-side Stripe API access. | `sk_live_...` in prod, `sk_test_...` in preview/dev. |
| `STRIPE_WEBHOOK_SECRET` | Verifies webhook calls are from Stripe. | `whsec_...`. Different per environment — test mode and live mode have separate webhook endpoints with separate secrets. |
| `COHORT_01_PRODUCT_ID` | Stripe product ID for filtering. | Could be hardcoded in `cohort.ts` since it isn't secret; env-var is cleaner for test/live swap. |
| `APPS_SCRIPT_URL` | The Google Apps Script web app URL. | Already used in frontend; now used server-side too. |

### Stripe dashboard configuration (outside the repo)

| Where | What |
|---|---|
| Test mode product | $99, 15-unit inventory cap, after-payment redirect to `http://localhost:3000/ai-summer-camp/welcome` (Stripe allows HTTP localhost in test mode), custom receipt message with cohort logistics, metadata `cohort: 'cohort_01'`. No `session_id` interpolation needed — the welcome page is static. |
| Live mode product | Same as above with `https://www.mvpclub.ai/ai-summer-camp/welcome`. Stripe requires HTTPS for live redirects. |
| Test mode webhook | Endpoint `https://<vercel-preview-url>/api/stripe-webhook` subscribing to `checkout.session.completed`. Use `stripe listen --forward-to localhost:3000/api/stripe-webhook` for local dev. |
| Live mode webhook | `https://www.mvpclub.ai/api/stripe-webhook`, same event. |

## Edge cases (handled by design)

| Case | Behavior |
|---|---|
| Stripe API slow or errors during status fetch | Endpoint returns `{status: 'open', remaining: null, fallback: true}` with 200 OK. Page shows Reserve CTA. Stripe's own cap catches stragglers. |
| Stripe webhook arrives twice (retries) | Apps Script's idempotency check sees the row already exists for that email + source; no duplicate email. |
| Welcome page loaded without a Stripe redirect (bookmark, direct visit, refresh) | Page is fully static — renders cohort-logistics content identically. No personalization to miss. |
| User on the page while seat 15 sells | Their page already showed Reserve. They click → Stripe sold-out page. Rare; acceptable. |
| Refund — paid count should drop by 1 | Out of scope for V1 automation. If a refund happens, Matt messages me and we bump capacity in `cohort.ts` to 16 for the affected cohort. Don't over-engineer. |

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Test-mode Stripe sessions counting toward live cap | Strict test/live key separation in Vercel env vars. Separate products in test/live. Preview deploys use test keys. |
| Webhook secret committed to repo | All secrets via Vercel env vars. Never in repo. Webhook secret is environment-specific. |
| Apps Script transient errors | Webhook logs Apps Script failures to Vercel function logs. Matt can spot and manually backfill if needed. No retry logic in V1. |
| Cohort 02 rollover misses stale state | `src/data/cohort.ts` will document the full rollover checklist as a comment: product ID, dates, dismiss key for `CohortAnnouncementBar.astro` (currently `cohort_bar_dismissed_2026_06`). |

## Local e2e test plan

End-to-end testable on a laptop using Stripe's test mode + Stripe CLI for webhook forwarding.

**One-time setup:**
1. Install Stripe CLI (`scoop install stripe` on Windows).
2. `stripe login` → authorize against Matt's Stripe account.
3. Create a test-mode product in Stripe dashboard with the test-mode settings above.
4. Generate a test-mode Payment Link from that product.
5. Put test Payment Link URL in `cohort.ts` (or a local `.env` override).
6. Add `STRIPE_SECRET_KEY` (sk_test_...) to a local `.env` so `vercel dev` picks it up.

**Test run:**
1. Terminal 1: `vercel dev` (runs the site + API endpoints).
2. Terminal 2: `stripe listen --forward-to localhost:3000/api/stripe-webhook` — copy the printed webhook secret into `.env` as `STRIPE_WEBHOOK_SECRET`. Restart terminal 1.
3. Visit `localhost:3000/ai-summer-camp`. CTA fetches status → `remaining: 15` → shows "Reserve Your Spot."
4. Click → test Payment Link.
5. Pay with `4242 4242 4242 4242`, any future expiry, any CVC.
6. Redirected to `/ai-summer-camp/welcome` (static page).
7. Webhook fires → Apps Script writes a row + sends "You're in" email. Verify row in the test Sheet and email in inbox.
8. Refresh `/ai-summer-camp` → `remaining: 14`. CTA still shows Reserve.
9. To test the rollover quickly: temporarily set `COHORT_CAPACITY = 2` in `cohort.ts`. Buy two test seats. Refresh page. CTA now shows "Join the Waitlist."
10. Click waitlist → overlay opens → submit → confirms sheet write + waitlist email.

**Going live:** swap test keys for live keys in Vercel, swap Payment Link URL in `cohort.ts` to the live one, swap webhook endpoint subscription in Stripe.

## Out of scope (V1)

- Automated refund handling (manual capacity bump if it happens).
- Stripe Tax / VAT handling — using Stripe's defaults.
- Cohort 02 specifics — design only covers Cohort 01; `cohort.ts` makes rollover a config edit.
- Generalizing `WaitlistOverlay.jsx` to share with the community waitlist — two separate components is the right trade.
- Promo codes, multi-seat purchases, team discounts.
- Reseating a waitlisted person if a refund creates an opening — manual for V1.

## Out of scope (deliberate, but worth naming)

- Server-rendering the cohort status into the page HTML. We're doing a client-side fetch on mount. Server-side rendering would require Astro SSR (not currently used), and the page already has React islands. Client fetch is the simpler fit.
- A persistent counter store (KV, database). Stripe is the source of truth; the edge cache absorbs the load.
