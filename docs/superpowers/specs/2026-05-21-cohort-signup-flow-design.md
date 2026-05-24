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
| 2026-05-24 (later) | **Storage pivot: Apps Script dropped from cohort path.** Cohort signups now written directly to a new `Cohort` tab in the `mvp-club-master-list` Google Sheet via Google Sheets API + service account. Reuses bizopstool's existing service account credentials and write-scope OAuth. Centralizes all subscriber/member data in one sheet for cross-system access (newsletter targeting, drip campaigns). Apps Script is completely uninvolved for cohort sources; existing community signup flow on Apps Script is preserved unchanged. | Matt |

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
     Stripe checkout                 ├─→ Google Sheets API
            │                        │      append row to Cohort tab
            ▼                        │      (source=cohort_waitlist)
   Redirect to                       │
   /ai-summer-camp/welcome           └─→ Resend API (send waitlist email
   (Astro page, static "you're in")        with CohortWaitlistEmail template)

   ─── In parallel, server-to-server ───

   Stripe → checkout.session.completed webhook
            │
            ▼
   /api/stripe-webhook (Vercel node)
            │  verify signature
            │  retrieve session → email + name
            │
            ├─→ Google Sheets API
            │      append row to Cohort tab
            │      (source=cohort_paid, includes stripe_session_id)
            │
            └─→ Resend API (send "You're in" email with CohortPaidEmail
                  template, idempotency-key = stripe_event_id)
```

**Three architectural shifts from initial design:**
- Emails for the cohort flows are sent via **Resend**, not Gmail/Apps Script.
- The waitlist overlay POSTs to a new server endpoint (`/api/waitlist-signup`) instead of directly to Apps Script — Resend API key must stay server-side.
- **Sheet writes go to Google Sheets API directly**, not Apps Script. The cohort rows land in a new `Cohort` tab of `mvp-club-master-list` (the bizopstool platform's source-of-truth sheet), using the existing bizopstool service account with write scope. Apps Script is uninvolved for cohort sources. Other (non-cohort) sources on Apps Script continue unchanged.

## Sheet structure

**Sheet:** `mvp-club-master-list` (ID `1aEkiTNpdUm5vv31Ln-zWPvHTZgP-CX_zhBOB08jCpkk`) — shared with bizopstool.

**New tab:** `Cohort` (created manually before launch).

| Column | Field | Notes |
|---|---|---|
| A | `timestamp` | ISO 8601 (`2026-05-24T14:30:00Z`) |
| B | `first_name` | From Stripe `customer_details.name` (split on whitespace) or overlay form |
| C | `email` | Lowercased, validated |
| D | `source` | `cohort_paid` or `cohort_waitlist` |
| E | `cohort_id` | `cohort_01` (from `COHORT.id` in `src/data/cohort.ts`) |
| F | `stripe_session_id` | `cs_test_...` or `cs_live_...` for paid; blank for waitlist |
| G | `status` | Defaults blank; manual annotation (`active`, `refunded`, `promoted`) |
| H | `notes` | Manual freetext field |

The header row is the first row of the tab. Created manually during setup. The Vercel endpoints append starting at row 2.

## Key behaviors

- **One CTA destination, two states.** Every "Reserve Your Spot" / "Save My Seat" button on the page is the same `<CohortCTA />` component. It internally decides whether to link to Stripe or open the waitlist overlay based on the fetched status. No two separate visible CTAs.
- **Fail open.** If `/api/cohort-status` errors or times out, the page defaults to `status: open`. Stripe's own 15-unit inventory cap is the backstop. We always prefer a false-positive "open" (rare: someone hits Stripe's sold-out page) over a false-positive "full" (we tell a real paying customer the cohort is closed when it isn't).
- **"You made it in" is two signals.** Stripe's automatic receipt (with our customized message), plus the `/ai-summer-camp/welcome` page they land on after payment. The custom "You're in" email from Resend is fired by the Stripe webhook, server-side, so it works even if the user closes the tab before the welcome page loads.
- **"You're on the waitlist" is one signal.** A custom email sent via Resend, fired by the new `/api/waitlist-signup` endpoint.
- **Idempotency at the Resend layer.** Each Resend send carries an idempotency key: the Stripe event ID for `cohort_paid` sends, and `cohort_waitlist:${email}` for waitlist sends. Stripe webhook retries and form-resubmits don't double-send.
- **Sheet writes accept occasional duplicates.** Without Apps Script in the loop, we don't do a pre-write existence check. Webhook retries from Stripe (rare, exponential backoff) may produce duplicate rows. The Resend idempotency key still prevents double-emails. Duplicates in the sheet are easy to spot (same email + same source + near-identical timestamp) and we accept them as an operational rarity vs. the cost of a Sheets API read-then-write on every signup.
- **Email observability.** All cohort emails appear in Resend's dashboard with delivery, open, and bounce tracking. Replies still land in the `info@mvpclub.ai` Gmail inbox (because we send from that address and reply-to defaults to it).
- **Sheet observability.** All cohort signups (paid + waitlist) appear in the `Cohort` tab of `mvp-club-master-list`, alongside the master subscriber list and drip campaign tabs. This lets bizopstool's existing tooling read/segment cohort members without a separate integration.

## File changes

### New files

| File | Purpose |
|---|---|
| `src/data/cohort.ts` | Single source of truth: capacity (15), Stripe Payment Link URL, product ID, dates, copy strings. Imported by the page, the callout, the announcement bar, the welcome page, and the API endpoints. Editing this file is the way to roll over to Cohort 02. |
| `src/emails/CohortPaidEmail.jsx` | React Email component for the "You're in" email. Branded HTML with MVP Club typography, gold accent, details box for cohort logistics. Source: `mockups/email-cohort-paid.html` (approved design). |
| `src/emails/CohortWaitlistEmail.jsx` | React Email component for the "You're on the waitlist" email. Branded HTML with teal accent eyebrow and outline community CTA. Source: `mockups/email-cohort-waitlist.html` (approved design). |
| `api/cohort-status.js` | Vercel edge function. `GET` → asks Stripe how many seats are sold via `stripe.checkout.sessions.list` filtered by product ID and `payment_status='paid'`. Returns `{ status, remaining }`. Caches 60s at the edge via `Cache-Control: public, s-maxage=60, stale-while-revalidate=300`. Fails open. |
| `api/stripe-webhook.js` | Vercel node function (not edge — needs raw request body for signature verification). Subscribes to `checkout.session.completed`. Verifies Stripe signature using `STRIPE_WEBHOOK_SECRET`. Extracts customer email and name from the session. **Appends row to Cohort tab via Sheets API** (source `cohort_paid`, includes Stripe session ID). **Then sends** "You're in" email via Resend using `CohortPaidEmail` template, with idempotency key set to the Stripe event ID. Returns 200 fast so Stripe doesn't retry. |
| `api/waitlist-signup.js` | Vercel node function. Receives `{firstName, email}` from `CohortWaitlistOverlay`. **Appends row to Cohort tab via Sheets API** (source `cohort_waitlist`). **Then sends** "You're on the waitlist" email via Resend using `CohortWaitlistEmail` template, with idempotency key `cohort_waitlist:${email}`. Returns 200. |
| `src/lib/sheets-client.js` | Server-side helper. Wraps `googleapis` Sheets API setup (loads service account from `GOOGLE_SERVICE_ACCOUNT_KEY` env var, returns an authed client). Exports `appendCohortRow({firstName, email, source, stripeSessionId})` which formats and appends a row to the `Cohort` tab of `mvp-club-master-list`. |
| `src/components/cohort/CohortCTA.jsx` | Dual-state CTA. Takes a `variant` prop (`"hero"` or `"postcard"`) for styling. Fetches status on mount. Renders either a Stripe link or a "Join the Waitlist" button that opens the overlay. Shares click-tracking with the existing `cohort_registration_click` GA event. |
| `src/components/cohort/CohortWaitlistOverlay.jsx` | Modeled on `src/WaitlistOverlay.jsx`. Email + first-name capture. **POSTs to `/api/waitlist-signup`** (NOT directly to Apps Script — Resend key must stay server-side). Closes with a confirmation state. Not a generalization of the existing overlay — separate component, shared visual language. |
| `src/pages/ai-summer-camp/welcome.astro` | "You're in" landing page. Fully static — no client-side fetches, no email firing logic, no use of `session_id`. Reuses `asc-` styling. Includes cohort dates, "add to calendar" links (`.ics` download + Google Calendar deep links), what-to-expect copy, and a "you'll get a welcome email shortly" reassurance line. Safe to bookmark or share. |

### Modified files

| File | Change |
|---|---|
| `src/pages/AISummerCampPage.jsx` | Remove `REGISTRATION_URL = '#'` constant, the `REGISTRATION_OPENS_AT` countdown gate, and the `useCountdown` helper. Remove inline anchor tags and replace with `<CohortCTA variant="hero" location="hero_deal" />` and `<CohortCTA variant="postcard" location="closing_postcard" />`. The countdown was added post-initial-design and is now stale (date in the past). |
| `package.json` | Add `stripe`, `resend`, `@react-email/components`, `googleapis` as dependencies. |
| `docs/email-workflow.md` | Document the two new sources (`cohort_paid`, `cohort_waitlist`), the new Cohort tab in `mvp-club-master-list`, and the Resend-based email pipeline. Note that Apps Script is no longer touched for these sources. |
| Google Apps Script (lives in Google Drive, not the repo) | **No changes.** Apps Script is no longer involved in the cohort flow. The existing `doPost` continues to handle community signup, lead magnet, and the existing waitlist overlay sources unchanged. |
| `mvp-club-master-list` Google Sheet | **Add a new `Cohort` tab** (manual, one-time). Headers in row 1: `timestamp \| first_name \| email \| source \| cohort_id \| stripe_session_id \| status \| notes`. Grant the existing bizopstool service account Editor access to this sheet if not already granted (it has read access from the master list and read/write on new-member-drip; we need it to write to Cohort too). |

### Environment variables (Vercel)

| Var | Purpose | Notes |
|---|---|---|
| `STRIPE_SECRET_KEY` | Server-side Stripe API access. | `sk_live_...` in prod, `sk_test_...` in preview/dev. |
| `STRIPE_WEBHOOK_SECRET` | Verifies webhook calls are from Stripe. | `whsec_...`. Different per environment. |
| `COHORT_01_PRODUCT_ID` | Stripe product ID for filtering. | Created in Stripe dashboard during Task 10. |
| `RESEND_API_KEY` | Resend API access for sending cohort emails. | Sending-access-only key, scoped to mvpclub.ai. Already created in Resend dashboard (key name: "MVP Club Site - Cohort Signup"). Same value for preview and production environments. |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Service account JSON for Sheets API. | Full JSON string (the contents of the .json key file). **Reuse the existing bizopstool service account** — same key already authenticates writes to `mvp-club-master-list`. Get the value from bizopstool's Cloud Run env (`gcloud run services describe ... --format=...` or the GCP Console). Same value for preview and production environments. |

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

### Google Sheets configuration (outside the repo)

| Where | State as of 2026-05-24 | Action needed |
|---|---|---|
| Sheet `mvp-club-master-list` (ID `1aEkiTNpdUm5vv31Ln-zWPvHTZgP-CX_zhBOB08jCpkk`) | Exists, owned by `info@mvpclub.ai`, used by bizopstool for newsletter + drip | None on the sheet itself |
| `Cohort` tab | Does not exist yet | **Create manually** with header row: `timestamp \| first_name \| email \| source \| cohort_id \| stripe_session_id \| status \| notes` |
| bizopstool service account | Has write scope (`spreadsheets`), authenticates as `<service-account>@mvp-club-sonar.iam.gserviceaccount.com` (or similar), already has access to other tabs of this sheet | **Verify access to the new Cohort tab.** Service accounts get access at the sheet level, so existing access should carry over — but worth confirming the first write succeeds. If it doesn't, share the sheet with the service account email as Editor. |
| Service account JSON | Lives in bizopstool's Cloud Run env as `GOOGLE_SERVICE_ACCOUNT_KEY` (full JSON string) | **Copy the same value into mvp-club-site Vercel** as `GOOGLE_SERVICE_ACCOUNT_KEY` (Production + Preview environments). Same value for local `.env` so `vercel dev` works. |

## Edge cases (handled by design)

| Case | Behavior |
|---|---|
| Stripe API slow or errors during status fetch | Endpoint returns `{status: 'open', remaining: null, fallback: true}` with 200 OK. Page shows Reserve CTA. Stripe's own cap catches stragglers. |
| Stripe webhook arrives twice (retries) | Resend's idempotency key (Stripe event ID) prevents duplicate email send. Sheet may have a duplicate row in this rare case; manually deleted if it matters. |
| Welcome page loaded without a Stripe redirect (bookmark, direct visit, refresh) | Page is fully static — renders cohort-logistics content identically. No personalization to miss. |
| User on the page while seat 15 sells | Their page already showed Reserve. They click → Stripe sold-out page. Rare; acceptable. |
| Resend API down when webhook fires | Webhook still returns 200 to Stripe (so Stripe doesn't retry forever), but logs the failure to Vercel function logs. Matt can manually re-send the welcome email from the Resend dashboard using "Re-send" once the API recovers. |
| Google Sheets API down when webhook fires | Webhook still calls Resend so the user gets their email. Logs the Sheets failure for manual row backfill. Sheet is for record-keeping; email is the user-facing commitment. Resend dashboard is the secondary audit trail. |
| Service account key revoked or rotated | All sheet writes fail. Stripe webhook and waitlist endpoints log the error and still return 200. Manual recovery: rotate the key, paste the new value into Vercel env vars, redeploy. While broken: rows can be manually added to the Cohort tab using the Resend dashboard's send log as the source of truth. |
| Refund — paid count should drop by 1 | Out of scope for V1 automation. If a refund happens, Matt messages me and we bump capacity in `cohort.ts` to 16 for the affected cohort. Don't over-engineer. |

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Test-mode Stripe sessions counting toward live cap | Strict test/live key separation in Vercel env vars. Separate products in test/live. Preview deploys use test keys. |
| Webhook secret committed to repo | All secrets via Vercel env vars. Never in repo. Webhook secret is environment-specific. |
| Resend API key committed to repo | Same: env var only. Sending-access-only scope limits blast radius if leaked (no domain config or log access). |
| Sheets API transient errors | Both `/api/stripe-webhook` and `/api/waitlist-signup` log Sheets API failures to Vercel function logs but still send the user email via Resend and still return 200. Sheet rows can be backfilled manually if a write was lost (use Resend dashboard to find the affected sends). |
| Service account credential leak | Sending-scope-only key in Vercel env vars. Smaller blast radius than full account access. If leaked: revoke + rotate in GCP Console (under 5 min). Apps Script pipeline for other sources unaffected (different auth surface). |
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
6. Add `STRIPE_SECRET_KEY` (sk_test_...), `COHORT_01_PRODUCT_ID`, `RESEND_API_KEY`, `GOOGLE_SERVICE_ACCOUNT_KEY` to a local `.env` so `vercel dev` picks them up.
7. Confirm the `Cohort` tab exists in `mvp-club-master-list` with the expected header row.

**Test run:**
1. Terminal 1: `vercel dev` (runs the site + API endpoints).
2. Terminal 2: `stripe listen --forward-to localhost:3000/api/stripe-webhook` — copy the printed webhook secret into `.env` as `STRIPE_WEBHOOK_SECRET`. Restart terminal 1.
3. Visit `localhost:3000/ai-summer-camp`. CTA fetches status → `remaining: 15` → shows "Reserve Your Spot."
4. Click → test Payment Link.
5. Pay with `4242 4242 4242 4242`, any future expiry, any CVC, **using an email address you can check** (your own).
6. Redirected to `/ai-summer-camp/welcome` (static page).
7. Webhook fires → Sheets API appends a row to `Cohort` tab + Resend sends "You're in" email. Verify:
   - New row in `mvp-club-master-list` → `Cohort` tab (`source = cohort_paid`, includes `stripe_session_id` in column F)
   - Email in your inbox (visually matches the approved `mockups/email-cohort-paid.html` design)
   - Send entry in Resend dashboard at `resend.com/emails` with `Delivered` status
8. Refresh `/ai-summer-camp` → `remaining: 14`. CTA still shows Reserve.
9. To test the rollover quickly: temporarily set `capacity = 2` in `cohort.ts`. Buy two test seats. Refresh page. CTA now shows "Join the Waitlist."
10. Click waitlist → overlay opens → submit with your email → confirms:
    - Sheet write to `Cohort` tab (`source = cohort_waitlist`, `stripe_session_id` column blank)
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
