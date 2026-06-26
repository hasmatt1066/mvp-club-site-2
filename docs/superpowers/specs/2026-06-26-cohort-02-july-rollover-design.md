# AI Summer Camp — Cohort 02 (July 2026) Rollover

**Date:** 2026-06-26
**Status:** Approved design, pending spec review
**Author:** Matt + Claude

## Goal

Reactivate the AI Summer Camp signup flow for a second cohort running **Fridays, 12–1 PM ET, July 10–31, 2026** (four Fridays: Jul 10, 17, 24, 31). 15 seats, first 15 paid signups are in, $99 via Stripe — same model as Cohort 01. The site is currently in a "Cohort 01 in session / July coming soon" holding state with all registration surfaces removed; this rollover brings them back pointed at the July cohort.

## Cohort 02 parameters

| Field | Value |
|---|---|
| id / label | `cohort_02` / `Cohort 02` |
| Capacity | 15 |
| Price | $99 (paid Stripe Payment Link; paid-session count enforces the cap) |
| Fridays | Jul 10, 17, 24, 31 — 12–1 PM ET |
| Office hours | Tue 1–2 PM ET (Jul 14, 21, 28), optional — unchanged from Cohort 01 |
| Format | Live on Google Meet |

## Why this is more than a one-file edit

The cohort system was built so a rollover is *mostly* a single edit to `src/data/cohort.js`. But commit `a5ecf33` ("close AI Summer Camp registration") deleted the three public registration surfaces and swapped the page's Stripe CTAs for "join the community" notices. Later commits (`2f7e722`, `ec3368e`, `5195dc3`) rewrote the page into a "now in session / July teaser" state. So reactivation requires **restoring the removed mounts** in addition to rolling the data forward. A handful of files also hardcode "June"-specific prose and a hand-built June calendar grid that the single source of truth does not cover.

## Work breakdown

### 1. Stripe (driven via Matt's browser, live mode)

- Create Product **"AI Summer Camp · Cohort 02"** at **$99**.
- Create a **Payment Link** for that product.
- Capture the new **product ID** (`prod_…`) and **Payment Link URL**.
- Verify the live webhook still subscribes to `checkout.session.completed` (account-level, not product-filtered — no change expected).

### 2. Vercel env var (driven via Matt's browser)

- Update `COHORT_01_PRODUCT_ID` value → new July product ID in the Vercel project settings. **Keep the variable name** to avoid a code change (it is now a slight misnomer but functional). This is required: `api/cohort-status.js` counts paid sessions for this product ID to enforce the seat cap; leaving it on the June product would read the wrong cohort's seats.
- Redeploy happens automatically on push (or trigger a redeploy from Vercel so the new env value takes effect immediately).

### 3. `src/data/cohort.js` (single source of truth)

```js
id: 'cohort_02',
label: 'Cohort 02',
shortLabel: 'AI Summer Camp · Cohort 02',
capacity: 15,
stripeProductId: '<new prod_…>',
stripePaymentLinkUrl: '<new payment link url>',
priceUSD: 99,
startISO: '2026-07-10',
endISO: '2026-07-31',
fridaysFormatted: 'Fri Jul 10, 17, 24, 31',
timeET: '12–1 PM ET',
officeHoursET: 'Tue 1–2 PM ET',
```

Keep the previous live values in a reference comment (as the file already does for test-mode values).

### 4. Restore the three promo surfaces (reverting the `a5ecf33` removals, with July copy)

- **`src/layouts/PageLayout.astro`** — re-add the `CohortAnnouncementBar` import and `<CohortAnnouncementBar currentPath={Astro.url.pathname} />` mount.
- **`src/components/layout/CohortAnnouncementBar.astro`** — bump `DISMISS_KEY` to `cohort_bar_dismissed_2026_07`; update hardcoded copy: "Cohort 01 starts June 5 · 15 seats" → "Cohort 02 starts July 10 · 15 seats" (and the mobile "Starts Jun 5" → "Starts Jul 10").
- **`src/pages/HomePage.jsx`** — re-add the `CohortCallout` import and `<CohortCallout />` mount (between `<NewHero />` and `<SocialProof />`).
- **`src/components/homepage/CohortCallout.jsx`** — update hardcoded "Jun 5 / 4 Fridays / Now Enrolling · Cohort 01" → "Jul 10 / 4 Fridays / Now Enrolling · Cohort 02". The "$99 · first month of community included" line stays.
- **`src/components/layout/NavigationAstro.astro`** — re-add `{ label: 'AI Summer Camp', to: '/ai-summer-camp', featured: true }` to `navLinks`.

### 5. `src/pages/AISummerCampPage.jsx` — un-holding-state

- Restore `import CohortCTA from '../components/cohort/CohortCTA.jsx'`.
- **Hero deal card:** replace the "Now In Session / join the community" aside with the restored `$99` price row + `<CohortCTA variant="hero" location="hero_deal" />`.
- **Nameplate:** "COHORT 01 · JUNE 2026 · NOW IN SESSION" → "COHORT 02 · JULY 2026" (active-enrollment voice).
- **Who-it's-for item 04:** "The July cohort might be your moment" → active enrollment phrasing.
- **For Members & Newcomers:** restore the "$99 covers Camp + your first month of the MVP Club community ($20/mo after)" framing.
- **Program section:** four Friday cards → Jul 10, 17, 24, 31; office-hours block stays Tue 1–2 PM ET.
- **Trail section:** "Cohort 01 is on the trail right now / we'll keep a seat for you in July" and "happening now" → active enrollment voice for Cohort 02.
- **Schedule section:** rebuild the calendar as **July 2026** with Friday dots on 10/17/24/31 and Tuesday office-hours dots on 14/21/28; update "Cohort 01 is meeting right now" prose and the `June 2026 / Cohort 01` calendar labels → `July 2026 / Cohort 02`.
- **Closing postcard:** "Coming Soon: July Cohort / admissions closed" → "Reserve Your Spot"; restore `<CohortCTA variant="postcard" location="closing_postcard" />`; postmark "FIRST SESSION JUN 5" → "FIRST SESSION JUL 10".

### 6. `src/pages/ai-summer-camp.astro` — meta + structured data

- Title: "AI Summer Camp · Cohort 02 — Become the AI person at work".
- Meta description: active 4-week cohort, "Starts July 10, 2026. $99 — includes first month of MVP Club community."
- JSON-LD offer: `availability: 'https://schema.org/InStock'`, `price: '99'`; update event dates to the July range.

### 7. Emails

- **`src/emails/cohortPaidEmail.js`** — month-specific prose (the `COHORT` fields auto-update, but these strings are hardcoded): "Four Fridays in June" → "Four Fridays in July"; "Friday, June 5" → "Friday, July 10"; "See you June 5." → "See you July 10."; title month reference.
- **`src/emails/cohortWaitlistEmail.js`** — scan for and update any hardcoded June/Cohort 01 references.

### 8. Welcome page

- **`src/pages/ai-summer-camp/welcome.astro`** — same June→July / Cohort 01→02 sweep for any hardcoded references.

## No change needed

- `api/stripe-webhook.js` — fires on any `checkout.session.completed`; writes `cohort_02` rows automatically via `COHORT.id`. (Verify it is not product-filtered during implementation; the $0 promo path added in `f7fbad9` is unrelated.)
- `api/waitlist-signup.js`, `src/lib/sheets-client.js` — read from `COHORT`; no edits.
- `src/components/cohort/CohortCTA.jsx`, `CohortWaitlistOverlay.jsx` — read from `COHORT`; no edits.

## Sequencing

1. Create Stripe product + Payment Link (browser) → capture IDs.
2. Edit `cohort.js` with the new IDs + July data.
3. Restore the three promo surfaces; update their hardcoded copy.
4. Un-holding-state `AISummerCampPage.jsx`; rebuild the July calendar.
5. Update `ai-summer-camp.astro` meta + JSON-LD.
6. Sweep emails + welcome page for hardcoded June copy.
7. `npm run build` to verify the static build is clean.
8. Update the Vercel env var `COHORT_01_PRODUCT_ID` → new product ID (browser).
9. Commit. Push only on explicit confirmation (Vercel auto-deploys on push).

## Verification

- `npm run build` succeeds with no errors.
- Local dev: `/ai-summer-camp` shows the restored $99 + Reserve CTAs, July dates, and a July calendar.
- Homepage shows the restored callout; the announcement bar appears site-wide (and is dismissible).
- The Reserve CTA links to the new Payment Link URL.
- `/api/cohort-status` returns `open` once the env var points at the new (empty) product.

## Open risk

- The seat cap only reads correctly **after** the Vercel env var is updated to the new product. Until then, `cohort-status` counts June's product (likely shows the old seat state). Order step 8 before announcing publicly.
