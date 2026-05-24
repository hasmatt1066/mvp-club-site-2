# AI Summer Camp — Cohort Signup Flow

**Date:** 2026-05-21
**Status:** Approved (Matt) — ready for implementation
**Page affected:** `/ai-summer-camp`
**Cohort:** Cohort 01 (starts June 5, 2026, 15 seats, $99)

## Revision history

| Date | Change | Author |
|---|---|---|
| 2026-05-21 | Initial design approved. Emails sent via Google Apps Script + Gmail. | Matt |
| 2026-05-24 | **Email pipeline migrated to Resend.** Apps Script still records sheet rows but no longer sends emails for cohort sources. New `/api/waitlist-signup` endpoint introduced. Branded HTML email templates added. Stripe-side architecture unchanged. | Matt |

## Problem

The AI Summer Camp landing page (`src/pages/AISummerCampPage.jsx`) has two CTAs pointing at a placeholder `REGISTRATION_URL = '#'`, with a TODO comment for Matt to wire in a real signup URL. We need to:

1. Let visitors actually sign up.
2. Cap the cohort at 15 paid seats.
3. Once full, route new visitors to a waitlist instead of a dead-end.
4. Email each signup with confirmation of where they landed — "You're in" or "You're on the waitlist."

A stale `REGISTRATION_OPENS_AT` countdown gate added after initial design (now in the past) should be removed as part of this work.

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
   ┌──────────────────┐   ┌────────────────────────┐
   │ Reserve Your     │   │ Join the Waitlist      │
   │  Spot → Stripe   │   │  → CohortWaitlistOverlay│
   │  Payment Link    │   │   POSTs to             │
   └────────┬─────────┘   │   /api/waitlist-signup │
            │             └──────────┬─────────────┘
            ▼                        │
     Stripe checkout                 ├─→ Apps Script (write sheet row,
            │                        │      source=cohort_waitlist)
            ▼                        │
   Redirect to                       └─→ Resend API (send waitlist email
   /ai-summer-camp/welcome                with CohortWaitlistEmail template)
   (Astro page, static "you're in"
    landing — no email trigger here)

   ─── In parallel, server-to-server ───

   Stripe → checkout.session.completed webhook
            │
            ▼
   /api/stripe-webhook (Vercel node)
            │  verify signature
            │  retrieve session → email + name
            │
            ├─→ POST Apps Script (write sheet row, source=cohort_paid)
            │
            └─→ Resend API (send "You're in" email with CohortPaidEmail
                  template, idempotency-key = stripe_event_id)
```

**Two key shifts from initial design:**
- Emails for the cohort flows are sent via **Resend**, not Gmail/Apps Script. Apps Script still receives the POSTs to record sheet rows, but no longer triggers any cohort emails.
- The waitlist overlay now POSTs to a new server endpoint (`/api/waitlist-signup`) instead of directly to Apps Script. The endpoint orchestrates the sheet write + Resend send. This is necessary because the Resend API key must stay server-side.

## Key behaviors

- **One CTA destination, two states.** Every "Reserve Your Spot" / "Save My Seat" button on the page is the same `<CohortCTA />` component. It internally decides whether to link to Stripe or open the waitlist overlay based on the fetched status. No two separate visible CTAs.
- **Fail open.** If `/api/cohort-status` errors or times out, the page defaults to `status: open`. Stripe's own 15-unit inventory cap is the backstop. We always prefer a false-positive "open" (rare: someone hits Stripe's sold-out page) over a false-positive "full" (we tell a real paying customer the cohort is closed when it isn't).
- **"You made it in" is two signals.** Stripe's automatic receipt (with our customized message), plus the `/ai-summer-camp/welcome` page they land on after payment. The custom "You're in" email from Resend is fired by the Stripe webhook, server-side, so it works even if the user closes the tab before the welcome page loads.
- **"You're on the waitlist" is one signal.** A custom email sent via Resend, fired by the new `/api/waitlist-signup` endpoint.
- **Idempotency at the Resend layer.** Each Resend send carries an idempotency key: the Stripe event ID for `cohort_paid` sends, and `cohort_waitlist:${email}` for waitlist sends. Stripe webhook retries and form-resubmits don't double-send.
- **Idempotency at the Apps Script layer.** Apps Script still checks the sheet for `(email, source)` before writing a row. Double-writes are prevented even if both Resend and Apps Script are called twice.
- **Email observability.** All cohort emails appear in Resend's dashboard with delivery, open, and bounce tracking. Replies still land in the `info@mvpclub.ai` Gmail inbox (because we send from that address and reply-to defaults to it).

## File changes

### New files

| File | Purpose |
|---|---|
| `src/data/cohort.ts` | Single source of truth: capacity (15), Stripe Payment Link URL, product ID, dates, copy strings. Imported by the page, the callout, the announcement bar, the welcome page, and the API endpoints. Editing this file is the way to roll over to Cohort 02. |
| `src/emails/CohortPaidEmail.jsx` | React Email component for the "You're in" email. Branded HTML with MVP Club typography, gold accent, details box for cohort logistics. Source: `mockups/email-cohort-paid.html` (approved design). |
| `src/emails/CohortWaitlistEmail.jsx` | React Email component for the "You're on the waitlist" email. Branded HTML with teal accent eyebrow and outline community CTA. Source: `mockups/email-cohort-waitlist.html` (approved design). |
| `api/cohort-status.js` | Vercel edge function. `GET` → asks Stripe how many seats are sold via `stripe.checkout.sessions.list` filtered by product ID and `payment_status='paid'`. Returns `{ status, remaining }`. Caches 60s at the edge via `Cache-Control: public, s-maxage=60, stale-while-revalidate=300`. Fails open. |
| `api/stripe-webhook.js` | Vercel node function (not edge — needs raw request body for signature verification). Subscribes to `checkout.session.completed`. Verifies Stripe signature using `STRIPE_WEBHOOK_SECRET`. Extracts customer email and name from the session. **POSTs to Apps Script** (`source: 'cohort_paid'`) to record sheet row. **Then sends** "You're in" email via Resend using `CohortPaidEmail` template, with idempotency key set to the Stripe event ID. Returns 200 fast so Stripe doesn't retry. |
| `api/waitlist-signup.js` | Vercel node function. Receives `{firstName, email}` from `CohortWaitlistOverlay`. **POSTs to Apps Script** (`source: 'cohort_waitlist'`) to record sheet row. **Then sends** "You're on the waitlist" email via Resend using `CohortWaitlistEmail` template, with idempotency key `cohort_waitlist:${email}`. Returns 200. |
| `src/components/cohort/CohortCTA.jsx` | Dual-state CTA. Takes a `variant` prop (`"hero"` or `"postcard"`) for styling. Fetches status on mount. Renders either a Stripe link or a "Join the Waitlist" button that opens the overlay. Shares click-tracking with the existing `cohort_registration_click` GA event. |
| `src/components/cohort/CohortWaitlistOverlay.jsx` | Modeled on `src/WaitlistOverlay.jsx`. Email + first-name capture. **POSTs to `/api/waitlist-signup`** (NOT directly to Apps Script — Resend key must stay server-side). Closes with a confirmation state. Not a generalization of the existing overlay — separate component, shared visual language. |
| `src/pages/ai-summer-camp/welcome.astro` | "You're in" landing page. Fully static — no client-side fetches, no email firing logic, no use of `session_id`. Reuses `asc-` styling. Includes cohort dates, "add to calendar" links (`.ics` download + Google Calendar deep links), what-to-expect copy, and a "you'll get a welcome email shortly" reassurance line. Safe to bookmark or share. |

### Modified files

| File | Change |
|---|---|
| `src/pages/AISummerCampPage.jsx` | Remove `REGISTRATION_URL = '#'` constant, the `REGISTRATION_OPENS_AT` countdown gate, and the `useCountdown` helper. Remove inline anchor tags and replace with `<CohortCTA variant="hero" location="hero_deal" />` and `<CohortCTA variant="postcard" location="closing_postcard" />`. The countdown was added post-initial-design and is now stale (date in the past). |
| `package.json` | Add `stripe`, `resend`, `@react-email/components` as dependencies. |
| `docs/email-workflow.md` | Document the two new sources (`cohort_paid`, `cohort_waitlist`), the updated Apps Script `doPost` branching (sheet-only for these sources), and the new Resend-based email pipeline for cohort flows. |
| Google Apps Script (lives in Google Drive, not the repo) | Branch `doPost` on `source`. For `cohort_paid` and `cohort_waitlist`, **only append the row** — do NOT call any email send function. Existing `sendWelcomeEmail` for other sources (community signup, etc.) is preserved. Add idempotency check: skip write if a row with same email + same source already exists. |

### Environment variables (Vercel)

| Var | Purpose | Notes |
|---|---|---|
| `STRIPE_SECRET_KEY` | Server-side Stripe API access. | `sk_live_...` in prod, `sk_test_...` in preview/dev. |
| `STRIPE_WEBHOOK_SECRET` | Verifies webhook calls are from Stripe. | `whsec_...`. Different per environment. |
| `COHORT_01_PRODUCT_ID` | Stripe product ID for filtering. | Created in Stripe dashboard during Task 10. |
| `APPS_SCRIPT_URL` | The Google Apps Script web app URL. | Already used in frontend; now used server-side too. |
| `RESEND_API_KEY` | Resend API access for sending cohort emails. | Sending-access-only key, scoped to mvpclub.ai. Already created in Resend dashboard (key name: "MVP Club Site - Cohort Signup"). Same value for preview and production environments. |

### Stripe dashboard configuration (outside the repo)

| Where | What |
|---|---|
| Test mode product | $99, 15-unit inventory cap, after-payment redirect to `http://localhost:3000/ai-summer-camp/welcome` (Stripe allows HTTP localhost in test mode), custom receipt message with cohort logistics, metadata `cohort: 'cohort_01'`. No `session_id` interpolation needed — the welcome page is static. |
| Live mode product | Same as above with `https://www.mvpclub.ai/ai-summer-camp/welcome`. Stripe requires HTTPS for live redirects. |
| Test mode webhook | Endpoint `https://<vercel-preview-url>/api/stripe-webhook` subscribing to `checkout.session.completed`. Use `stripe listen --forward-to localhost:3000/api/stripe-webhook` for local dev. |
| Live mode webhook | `https://www.mvpclub.ai/api/stripe-webhook`, same event. |

Verified 2026-05-24: no existing cohort product, no existing Payment Link, no existing webhooks. All Stripe state needs to be created during implementation.

### Resend configuration (outside the repo)

| Where | State as of 2026-05-24 | Action needed |
|---|---|---|
| Domain `mvpclub.ai` | Verified, region `us-east-1`, active sending from other keys | None — ready to send from `info@mvpclub.ai` |
| API key "MVP Club Site - Cohort Signup" | Created, sending access, all domains scope | Already in Vercel env var `RESEND_API_KEY` |
| From address | `info@mvpclub.ai` — replies route to existing inbox already monitored by Matt, Jill, Ryan | None |
| Webhooks for delivery events | Not configured (intentional for V1 — Resend dashboard suffices for monitoring) | None |

## Edge cases (handled by design)

| Case | Behavior |
|---|---|
| Stripe API slow or errors during status fetch | Endpoint returns `{status: 'open', remaining: null, fallback: true}` with 200 OK. Page shows Reserve CTA. Stripe's own cap catches stragglers. |
| Stripe webhook arrives twice (retries) | Resend's idempotency key (Stripe event ID) prevents duplicate email send. Apps Script's idempotency check prevents duplicate sheet row. |
| Welcome page loaded without a Stripe redirect (bookmark, direct visit, refresh) | Page is fully static — renders cohort-logistics content identically. No personalization to miss. |
| User on the page while seat 15 sells | Their page already showed Reserve. They click → Stripe sold-out page. Rare; acceptable. |
| Resend API down when webhook fires | Webhook still returns 200 to Stripe (so Stripe doesn't retry forever), but logs the failure to Vercel function logs. Matt can manually re-send the welcome email from the Resend dashboard using "Re-send" once the API recovers. |
| Apps Script down when webhook fires | Webhook still calls Resend so the user gets their email. Logs the Apps Script failure for manual sheet backfill. Sheet is for record-keeping; email is the user-facing commitment. |
| Refund — paid count should drop by 1 | Out of scope for V1 automation. If a refund happens, Matt messages me and we bump capacity in `cohort.ts` to 16 for the affected cohort. Don't over-engineer. |

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Test-mode Stripe sessions counting toward live cap | Strict test/live key separation in Vercel env vars. Separate products in test/live. Preview deploys use test keys. |
| Webhook secret committed to repo | All secrets via Vercel env vars. Never in repo. Webhook secret is environment-specific. |
| Resend API key committed to repo | Same: env var only. Sending-access-only scope limits blast radius if leaked (no domain config or log access). |
| Apps Script transient errors | Both `/api/stripe-webhook` and `/api/waitlist-signup` log Apps Script failures to Vercel function logs but still send the user email via Resend and still return 200. Sheet rows can be backfilled manually if a write was lost. |
| Cold-domain deliverability flagged by Gmail | Domain `mvpclub.ai` already has active sending (Bizops keys, 14 hours ago). Reputation is warming. First few cohort emails should be monitored in Resend dashboard for `Delivered` status at Gmail. |
| Cohort 02 rollover misses stale state | `src/data/cohort.ts` will document the full rollover checklist as a comment: product ID, dates, dismiss key for `CohortAnnouncementBar.astro` (currently `cohort_bar_dismissed_2026_06`). |

## Local e2e test plan

End-to-end testable on a laptop using Stripe's test mode + Stripe CLI for webhook forwarding + real Resend API (test sends go to your own inbox).

**One-time setup:**
1. Install Stripe CLI (`scoop install stripe` on Windows).
2. `stripe login` → authorize against Matt's Stripe account.
3. Create a test-mode product in Stripe dashboard with the test-mode settings above.
4. Generate a test-mode Payment Link from that product.
5. Put test Payment Link URL in `cohort.ts` (or a local `.env` override).
6. Add `STRIPE_SECRET_KEY` (sk_test_...), `COHORT_01_PRODUCT_ID`, `APPS_SCRIPT_URL`, `RESEND_API_KEY` to a local `.env` so `vercel dev` picks them up.

**Test run:**
1. Terminal 1: `vercel dev` (runs the site + API endpoints).
2. Terminal 2: `stripe listen --forward-to localhost:3000/api/stripe-webhook` — copy the printed webhook secret into `.env` as `STRIPE_WEBHOOK_SECRET`. Restart terminal 1.
3. Visit `localhost:3000/ai-summer-camp`. CTA fetches status → `remaining: 15` → shows "Reserve Your Spot."
4. Click → test Payment Link.
5. Pay with `4242 4242 4242 4242`, any future expiry, any CVC, **using an email address you can check** (your own).
6. Redirected to `/ai-summer-camp/welcome` (static page).
7. Webhook fires → Apps Script writes a row + Resend sends "You're in" email. Verify:
   - Row in the test Sheet (`source = cohort_paid`)
   - Email in your inbox (visually matches the approved `mockups/email-cohort-paid.html` design)
   - Send entry in Resend dashboard at `resend.com/emails` with `Delivered` status
8. Refresh `/ai-summer-camp` → `remaining: 14`. CTA still shows Reserve.
9. To test the rollover quickly: temporarily set `capacity = 2` in `cohort.ts`. Buy two test seats. Refresh page. CTA now shows "Join the Waitlist."
10. Click waitlist → overlay opens → submit with your email → confirms:
    - Sheet write (`source = cohort_waitlist`)
    - Waitlist email arrives (visually matches `mockups/email-cohort-waitlist.html`)
    - Resend dashboard shows the second send

**Going live:** swap test keys for live keys in Vercel, swap Payment Link URL in `cohort.ts` to the live one, swap webhook endpoint subscription in Stripe. Resend key stays the same (test/live aren't separated in Resend).

## Out of scope (V1)

- Automated refund handling (manual capacity bump if it happens).
- Stripe Tax / VAT handling — using Stripe's defaults.
- Cohort 02 specifics — design only covers Cohort 01; `cohort.ts` makes rollover a config edit.
- Generalizing `WaitlistOverlay.jsx` to share with the community waitlist — two separate components is the right trade.
- Migrating non-cohort emails (existing community signup welcome, etc.) from Apps Script to Resend — separate project.
- Resend webhooks for delivery/bounce tracking — dashboard monitoring is sufficient for 15-seat cohorts.
- Promo codes, multi-seat purchases, team discounts.
- Reseating a waitlisted person if a refund creates an opening — manual for V1.

## Out of scope (deliberate, but worth naming)

- Server-rendering the cohort status into the page HTML. We're doing a client-side fetch on mount. Server-side rendering would require Astro SSR (not currently used), and the page already has React islands. Client fetch is the simpler fit.
- A persistent counter store (KV, database). Stripe is the source of truth; the edge cache absorbs the load.
- Email templates as inline strings in webhook handlers. We're using React Email components for type-safety and easier preview/iteration. Trade: small dep, slight authoring complexity. Worth it for branded HTML.
