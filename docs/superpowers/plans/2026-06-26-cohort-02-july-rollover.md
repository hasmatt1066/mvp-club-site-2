# AI Summer Camp Cohort 02 (July 2026) Rollover — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reactivate the AI Summer Camp paid signup flow for Cohort 02 (Fridays 12–1 PM ET, July 10–31, 2026, 15 seats, $99) by rolling the cohort data forward and restoring the registration surfaces that were removed when Cohort 01 closed.

**Architecture:** `src/data/cohort.js` is the single source of truth that ~10 components and 3 API endpoints import. Most of the rollover is editing that file; the rest is restoring three promo mounts deleted in commit `a5ecf33`, un-holding-state the landing page, and sweeping hardcoded "June"/"Cohort 01" prose to July across the page, emails, welcome page, and structured data. Stripe is the source of truth for the seat count (paid sessions filtered by product ID via the `COHORT_01_PRODUCT_ID` Vercel env var).

**Tech Stack:** Astro 5, React 18 islands, Tailwind + CSS custom properties, Stripe Payment Links, Vercel serverless/edge functions, Resend.

## Global Constraints

- **Brand voice (CLAUDE.md):** No em dashes (use commas, periods, colons, parentheses). No prohibited terms (upskilling, reskilling, AI literacy, future-proof, training program, AI mastery, strategic transformation). No invented statistics. Name specific tools (Claude), not just "AI". No fear-based motivation.
- **Theme:** Use CSS custom properties / existing classes, never hardcode new colors.
- **Cohort 02 facts (verbatim):** id `cohort_02`; label `Cohort 02`; capacity `15`; price `$99`; Fridays Jul 10, 17, 24, 31; Friday time `12–1 PM ET`; office hours `Tue 1–2 PM ET` (Jul 14, 21, 28); format Live on Google Meet.
- **July 2026 calendar (verified):** Jul 1 = Wednesday. Fridays: 3, 10, 17, 24, 31 (cohort sessions are 10/17/24/31 only; the 3rd is pre-cohort). Tuesdays: 7, 14, 21, 28 (office hours 14/21/28 only).
- **Commit policy:** Local commits OK. Do NOT push without explicit per-session confirmation (Vercel auto-deploys on push).
- **No test framework** covers these marketing pages. The per-task gate is `npm run build` succeeding plus targeted grep assertions that old strings are gone and new strings are present.

---

### Task 1: Create the Stripe product + Payment Link (browser)

This task is performed by driving Matt's browser (Stripe dashboard, live mode). It produces the two IDs every later code task consumes.

**Interfaces:**
- Produces: `NEW_PRODUCT_ID` (`prod_…`) and `NEW_PAYMENT_LINK_URL` (`https://buy.stripe.com/…`), used by Tasks 2 and 8.

- [ ] **Step 1: Load browser tools and open Stripe**

Load the Chrome MCP tools (single ToolSearch call):
`select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__read_page,mcp__claude-in-chrome__tabs_create_mcp`
Call `tabs_context_mcp` first, then open a new tab to `https://dashboard.stripe.com/products`. Confirm the dashboard is in **live mode** (not test).

- [ ] **Step 2: Create the product**

Create a new product: name **"AI Summer Camp · Cohort 02"**, one-time price **$99.00 USD**. Save. Capture the product ID (`prod_…`) shown on the product page → this is `NEW_PRODUCT_ID`.

- [ ] **Step 3: Create the Payment Link**

Create a Payment Link for that product (Stripe → Payment Links → New). Confirm the success/redirect behaviour matches Cohort 01's link (Cohort 01 redirected to `/ai-summer-camp/welcome`; replicate so the welcome page still works). Capture the link URL → `NEW_PAYMENT_LINK_URL`.

- [ ] **Step 4: Record the IDs**

Write both values into this plan (or hand them to the implementer of Task 2). Do not proceed to Task 8's env-var change yet — that happens after the code is built.

- [ ] **Step 5: Verify the webhook**

In Stripe → Developers → Webhooks, confirm the live endpoint hitting `/api/stripe-webhook` still subscribes to `checkout.session.completed`. No change expected (the webhook is account-level, not product-filtered). Note the result.

*No commit (no code change in this task).*

---

### Task 2: Roll `src/data/cohort.js` forward to Cohort 02

**Files:**
- Modify: `src/data/cohort.js`

**Interfaces:**
- Consumes: `NEW_PRODUCT_ID`, `NEW_PAYMENT_LINK_URL` from Task 1.
- Produces: the updated `COHORT` object consumed by every component, email, and API endpoint.

- [ ] **Step 1: Replace the identity, Stripe, and schedule fields**

In `src/data/cohort.js`, replace the `COHORT` object body (lines 30–53) with:

```js
export const COHORT = {
  // Identity
  id: 'cohort_02',
  label: 'Cohort 02',
  shortLabel: 'AI Summer Camp · Cohort 02',

  // Capacity
  capacity: 15,

  // Stripe — LIVE mode values (Cohort 02 rollover, 2026-06-26).
  // Cohort 01 LIVE values (kept for reference):
  //   stripeProductId: 'prod_Ua0Av4M79xhngq'
  //   stripePaymentLinkUrl: 'https://buy.stripe.com/4gM5kx1gf3h7bKP2OvfIs00'
  stripeProductId: 'NEW_PRODUCT_ID',
  stripePaymentLinkUrl: 'NEW_PAYMENT_LINK_URL',
  priceUSD: 99,

  // Schedule
  startISO: '2026-07-10',
  endISO: '2026-07-31',
  fridaysFormatted: 'Fri Jul 10, 17, 24, 31',
  timeET: '12–1 PM ET',
  officeHoursET: 'Tue 1–2 PM ET',
};
```

Substitute the real `NEW_PRODUCT_ID` and `NEW_PAYMENT_LINK_URL` from Task 1. Leave the file's header comment / rollover checklist intact.

- [ ] **Step 2: Verify the build picks up the new data**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Verify no stale June data remains in the source of truth**

Run: `grep -nE "cohort_01|2026-06|Jun " src/data/cohort.js`
Expected: matches only inside the reference comment (the live `COHORT` values are all July / `cohort_02`).

- [ ] **Step 4: Commit**

```bash
git add src/data/cohort.js
git commit -m "feat: roll cohort data forward to Cohort 02 (July 2026)"
```

---

### Task 3: Restore the three promo surfaces (announcement bar, homepage callout, nav link)

These three mounts were deleted together in `a5ecf33`. Restoring them is one reviewable unit: each reads from `COHORT` for some fields but hardcodes the month/cohort label, so each needs a copy update too.

**Files:**
- Modify: `src/layouts/PageLayout.astro`
- Modify: `src/components/layout/CohortAnnouncementBar.astro`
- Modify: `src/pages/HomePage.jsx`
- Modify: `src/components/homepage/CohortCallout.jsx`
- Modify: `src/components/layout/NavigationAstro.astro`

**Interfaces:**
- Consumes: updated `COHORT` (Task 2) for the announcement-bar `/ai-summer-camp` link target (component already wired; no prop change).

- [ ] **Step 1: Re-mount the announcement bar in PageLayout**

In `src/layouts/PageLayout.astro`, restore the import (after the `Footer` import line):

```astro
import CohortAnnouncementBar from '../components/layout/CohortAnnouncementBar.astro';
```

And restore the mount immediately before `<Navigation currentPath={Astro.url.pathname} />`:

```astro
    <CohortAnnouncementBar currentPath={Astro.url.pathname} />
```

- [ ] **Step 2: Update the announcement bar copy + dismiss key**

In `src/components/layout/CohortAnnouncementBar.astro`:
- Line 20: `const DISMISS_KEY = 'cohort_bar_dismissed_2026_06';` → `'cohort_bar_dismissed_2026_07';`
- Replace the desktop detail span (currently "Cohort 01 starts **June 5** · 15 seats"):

```astro
        <span class="hidden md:inline" style="font-size: 15px; color: #475569;">
          Cohort 02 starts <strong style="color: var(--color-primary); font-weight: 600;">July 10</strong> &middot; 15 seats
        </span>
```

- Replace the mobile detail span (currently "Starts **Jun 5**"):

```astro
        <span class="md:hidden" style="font-size: 13px; color: #475569;">
          Starts <strong style="color: var(--color-primary); font-weight: 600;">Jul 10</strong>
        </span>
```

- [ ] **Step 3: Re-mount the homepage callout**

In `src/pages/HomePage.jsx`, restore the import (after the `NewHero` import):

```jsx
import CohortCallout from '../components/homepage/CohortCallout';
```

And restore the mount immediately after `<NewHero />`:

```jsx
    <CohortCallout />
```

- [ ] **Step 4: Update the callout copy**

In `src/components/homepage/CohortCallout.jsx`:
- The date-stack day (currently `Jun 5`) → `Jul 10`.
- The eyebrow `Now Enrolling &middot; Cohort 01` → `Now Enrolling &middot; Cohort 02`.
- Leave the "$99 · first month of community included" line unchanged.

- [ ] **Step 5: Restore the featured nav link**

In `src/components/layout/NavigationAstro.astro`, add back the entry as the last item of `navLinks`:

```astro
  { label: 'AI Summer Camp', to: '/ai-summer-camp', featured: true },
```

- [ ] **Step 6: Build and verify mounts + copy**

Run: `npm run build`
Expected: build succeeds.

Run: `grep -rn "CohortAnnouncementBar\|CohortCallout" src/layouts/PageLayout.astro src/pages/HomePage.jsx`
Expected: both imports and mounts present.

Run: `grep -rnE "Cohort 01|Jun 5|June 5|2026_06" src/components/layout/CohortAnnouncementBar.astro src/components/homepage/CohortCallout.jsx`
Expected: no matches.

- [ ] **Step 7: Commit**

```bash
git add src/layouts/PageLayout.astro src/components/layout/CohortAnnouncementBar.astro src/pages/HomePage.jsx src/components/homepage/CohortCallout.jsx src/components/layout/NavigationAstro.astro
git commit -m "feat: restore Cohort 02 promo surfaces (bar, homepage callout, nav link)"
```

---

### Task 4: Un-hold-state the AI Summer Camp landing page

**Files:**
- Modify: `src/pages/AISummerCampPage.jsx`

**Interfaces:**
- Consumes: `CohortCTA` (existing component, reads `COHORT`), updated `COHORT` (Task 2).

- [ ] **Step 1: Restore the CohortCTA import**

At the top of `src/pages/AISummerCampPage.jsx`, add after the `AnimatedSection` import:

```jsx
import CohortCTA from '../components/cohort/CohortCTA.jsx';
```

Keep the existing `const COMMUNITY_URL = 'https://mvp-club.mn.co/';` (still used by the "For Members & Newcomers" / community references).

- [ ] **Step 2: Update the nameplate tag**

Replace:

```jsx
          <div className="asc-wordmark-tag">COHORT 01 · JUNE 2026 · NOW IN SESSION</div>
```

with:

```jsx
          <div className="asc-wordmark-tag">COHORT 02 · JULY 2026 · NOW ENROLLING</div>
```

- [ ] **Step 3: Replace the hero deal aside with the registration version**

Replace the entire `<aside className="asc-deal"> … </aside>` block (the "Now In Session / Join the community" version) with:

```jsx
          <aside className="asc-deal">
            <div className="asc-deal-eyebrow">Now Enrolling</div>
            <div className="asc-deal-promise">Four Fridays. <em>One real thing</em> you'll&nbsp;use.</div>
            <div className="asc-deal-promise-sub">
              July 10–31, live with Claude. Fifteen seats, first&nbsp;come.
            </div>

            <div className="asc-deal-price-row">
              <div className="asc-deal-price">$99</div>
              <div className="asc-deal-price-note">
                <strong>One payment.</strong><br />Cohort 02 caps at 15.
              </div>
            </div>

            <CohortCTA variant="hero" location="hero_deal" />
          </aside>
```

- [ ] **Step 4: Update the "who it's for" item 04**

Replace:

```jsx
                <div>You can carve out one Friday hour per week. The July cohort might be your moment.</div>
```

with:

```jsx
                <div>You can carve out one Friday hour per week. This cohort is built for exactly&nbsp;that.</div>
```

- [ ] **Step 5: Restore the $99 framing in "For Members & Newcomers"**

Replace the `New here?` sentence:

```jsx
                <span className="teal">New here?</span> Camp graduates step right into the MVP Club community — a group that keeps practicing together every week, and where the July cohort gets announced&nbsp;first.
```

with:

```jsx
                <span className="teal">New here?</span> Your $99 covers Camp <em>and</em> your first month of the MVP Club community ($20/mo after), so you graduate into a group that keeps practicing with&nbsp;you.
```

(Note: this restores an en-dash-free version; the existing line used an em dash inside JSX text. Keep the comma form above to honor the no-em-dash rule.)

- [ ] **Step 6: Update the four Friday program cards**

In the `.asc-program` section, update each `.asc-friday-date` block's date:
- Card 01: `June 5` → `July 10`
- Card 02: `June 12` → `July 17`
- Card 03: `June 19` → `July 24`
- Card 04: `June 26` → `July 31`

The office-hours `.asc-dispatch` block stays "Mid-week, 1–2 PM ET" (Tue 1–2 PM ET unchanged).

- [ ] **Step 7: Update the trail section copy**

In `.asc-trail`:
- The signoff `Cohort 01 is on the trail right now. We'll keep a seat for you in&nbsp;July.` → `Four Fridays in July. Fifteen seats. We'll keep one for&nbsp;you.`
- Station 2 `asc-station-here` text `happening now` → `enrolling now`.
- Station 2 title `Four Fridays in June` → `Four Fridays in July`.

- [ ] **Step 8: Update the schedule intro copy**

In `.asc-schedule`, replace the paragraph:

```jsx
                All sessions are live on Google Meet. Cohort 01 is meeting right now, and the July cohort will follow the same rhythm. Tuesday office hours are optional but they're where the magic happens for most people.
```

with:

```jsx
                All sessions are live on Google Meet, Fridays from 12 to 1 PM ET. Tuesday office hours are optional but they're where the magic happens for most people.
```

- [ ] **Step 9: Rebuild the calendar as July 2026**

Replace the calendar title/sub and grid. Set:

```jsx
              <div className="asc-cal-title">July 2026</div>
              <div className="asc-cal-sub">Cohort 02</div>
```

Replace the entire `.asc-cal-grid` day cells (keep the seven `asc-cal-dow` header cells S M T W T F S) with this exact sequence (3 leading empties for Sun/Mon/Tue before Wed Jul 1; Friday sessions on 10/17/24/31; Tuesday office hours on 14/21/28; one trailing empty for Aug 1):

```jsx
                <div className="asc-cal-day empty">28</div>
                <div className="asc-cal-day empty">29</div>
                <div className="asc-cal-day empty">30</div>
                <div className="asc-cal-day">1</div>
                <div className="asc-cal-day">2</div>
                <div className="asc-cal-day">3</div>
                <div className="asc-cal-day">4</div>
                <div className="asc-cal-day">5</div>
                <div className="asc-cal-day">6</div>
                <div className="asc-cal-day tue">7</div>
                <div className="asc-cal-day">8</div>
                <div className="asc-cal-day">9</div>
                <div className="asc-cal-day fri">10</div>
                <div className="asc-cal-day">11</div>
                <div className="asc-cal-day">12</div>
                <div className="asc-cal-day">13</div>
                <div className="asc-cal-day tue">14</div>
                <div className="asc-cal-day">15</div>
                <div className="asc-cal-day">16</div>
                <div className="asc-cal-day fri">17</div>
                <div className="asc-cal-day">18</div>
                <div className="asc-cal-day">19</div>
                <div className="asc-cal-day">20</div>
                <div className="asc-cal-day tue">21</div>
                <div className="asc-cal-day">22</div>
                <div className="asc-cal-day">23</div>
                <div className="asc-cal-day fri">24</div>
                <div className="asc-cal-day">25</div>
                <div className="asc-cal-day">26</div>
                <div className="asc-cal-day">27</div>
                <div className="asc-cal-day tue">28</div>
                <div className="asc-cal-day">29</div>
                <div className="asc-cal-day">30</div>
                <div className="asc-cal-day fri">31</div>
                <div className="asc-cal-day empty">1</div>
```

Note: July 7 is marked `tue` for visual consistency of the office-hours legend even though sessions begin the week of the 10th; if you prefer office-hours dots only on active weeks, drop the `tue` class from the `7` cell. Default: keep as written (all four Tuesdays dotted, matching how Cohort 01's June grid dotted all Tuesdays).

- [ ] **Step 10: Restore the closing postcard CTA**

Replace the `.asc-postcard-left` block (the "Coming Soon: July Cohort / admissions closed / Join the community" version) with:

```jsx
            <div className="asc-postcard-left">
              <div className="asc-postcard-eyebrow">Reserve Your Spot</div>
              <h3>Four Fridays. $99. A new identity at&nbsp;work.</h3>
              <p>
                Starts Friday, July 10. Cohort 02 is capped at 15 people, and seats go first come. Reserve your spot, then we'll send the details.
              </p>
              <CohortCTA variant="postcard" location="closing_postcard" />
            </div>
```

- [ ] **Step 11: Update the postcard stamp/postmark**

In `.asc-postcard-right`, update the postmark:

```jsx
              <div className="asc-postmark">FIRST<br />SESSION<br />JUL 10</div>
```

(Leave the `asc-stamp` "AI / 99 / SUMMER" block unchanged.)

- [ ] **Step 12: Build and verify**

Run: `npm run build`
Expected: build succeeds.

Run: `grep -nE "COHORT 01|NOW IN SESSION|June 5|June 12|June 19|June 26|happening now|admissions are closed|Coming Soon: July|JUN 5|underway" src/pages/AISummerCampPage.jsx`
Expected: no matches.

Run: `grep -n "CohortCTA" src/pages/AISummerCampPage.jsx`
Expected: import + two usages (hero, postcard).

Run: `grep -cE "—" src/pages/AISummerCampPage.jsx`
Expected: `0` em dashes in any line you added (the en dash `–` in "July 10–31" and "12 to 1" is fine; ensure no `—`). If the count is non-zero, inspect and confirm the matches are pre-existing in untouched markup; remove any you introduced.

- [ ] **Step 13: Commit**

```bash
git add src/pages/AISummerCampPage.jsx
git commit -m "feat: reactivate Cohort 02 registration on AI Summer Camp landing page"
```

---

### Task 5: Update page meta + structured data

**Files:**
- Modify: `src/pages/ai-summer-camp.astro`

- [ ] **Step 1: Update the JSON-LD event**

In the `eventJsonLd` object:
- `name`: `'MVP Club AI Summer Camp — Cohort 01'` → `'MVP Club AI Summer Camp — Cohort 02'`
- `startDate`: `'2026-06-05T14:00:00-04:00'` → `'2026-07-10T12:00:00-04:00'`
- `endDate`: `'2026-06-26T15:00:00-04:00'` → `'2026-07-31T13:00:00-04:00'`
- `offers.availability`: `'https://schema.org/SoldOut'` → `'https://schema.org/InStock'`
- Leave `price: '99'` unchanged.

- [ ] **Step 2: Update the PageLayout title + description**

```astro
  title="AI Summer Camp · Cohort 02 — Become the AI person at work"
  description="A guided 4-week cohort for working professionals, live with Claude. Starts July 10, 2026. $99, includes your first month of the MVP Club community."
```

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: build succeeds.

Run: `grep -nE "Cohort 01|SoldOut|2026-06|June" src/pages/ai-summer-camp.astro`
Expected: no matches.

- [ ] **Step 4: Commit**

```bash
git add src/pages/ai-summer-camp.astro
git commit -m "feat: Cohort 02 page meta + InStock structured data"
```

---

### Task 6: Sweep email templates June → July

**Files:**
- Modify: `src/emails/cohortPaidEmail.js`
- Modify: `src/emails/cohortWaitlistEmail.js`

**Interfaces:**
- Consumes: `COHORT` (dates/label render automatically); only month-specific hardcoded prose changes here.

- [ ] **Step 1: Update the paid ("You're in") email prose**

In `src/emails/cohortPaidEmail.js`:
- Subhead `Four Fridays in June. You, Claude, and a handful of other working professionals.` → `Four Fridays in July. You, Claude, and a handful of other working professionals.`
- `Friday, June 5` (the "about a week before" sentence) → `Friday, July 10`
- `See you June 5.` → `See you July 10.`

- [ ] **Step 2: Update the waitlist email prose**

In `src/emails/cohortWaitlistEmail.js`:
- `Friday, June 5` → `Friday, July 10`
- `you're first in line for Cohort 02 later this summer` → `you're first in line for the next cohort` (avoid hardcoding a specific next-cohort number for a Cohort 02 waitlist).

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: build succeeds.

Run: `grep -nE "in June|June 5|first in line for Cohort 02" src/emails/cohortPaidEmail.js src/emails/cohortWaitlistEmail.js`
Expected: no matches.

- [ ] **Step 4: Commit**

```bash
git add src/emails/cohortPaidEmail.js src/emails/cohortWaitlistEmail.js
git commit -m "feat: update cohort emails for July Cohort 02"
```

---

### Task 7: Sweep the welcome page June → July

**Files:**
- Modify: `src/pages/ai-summer-camp/welcome.astro`

- [ ] **Step 1: Update title, description, and prose**

In `src/pages/ai-summer-camp/welcome.astro`:
- `title="You're in — AI Summer Camp Cohort 01"` → `title="You're in — AI Summer Camp Cohort 02"`
- `description="Welcome to AI Summer Camp Cohort 01. Here's everything you need for the four Fridays in June."` → `description="Welcome to AI Summer Camp Cohort 02. Here's everything you need for the four Fridays in July."`
- Subhead `Four Fridays in June.` → `Four Fridays in July.`
- `before <strong …>Friday, June 5</strong>` → `Friday, July 10`

(The `Dates`, `Time`, `Office Hrs` rows already render from `COHORT` — no change.)

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: build succeeds.

Run: `grep -nE "Cohort 01|in June|June 5" src/pages/ai-summer-camp/welcome.astro`
Expected: no matches.

- [ ] **Step 3: Commit**

```bash
git add src/pages/ai-summer-camp/welcome.astro
git commit -m "feat: update welcome page for July Cohort 02"
```

---

### Task 8: Full verification + Vercel env var + sign-off

**Files:** none (verification + browser ops).

- [ ] **Step 1: Full clean build**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 2: Repo-wide stale-copy sweep**

Run: `grep -rnE "Cohort 01|cohort_01|NOW IN SESSION|admissions are closed|2026-06-05|June 5" src/ api/`
Expected: matches only in reference comments (e.g. the `cohort.js` Cohort 01 reference comment) and historical docs — none in live copy or active config. Investigate any live-copy match.

- [ ] **Step 3: Local visual smoke test**

Run: `npm run dev`, open `http://localhost:4321/ai-summer-camp`. Confirm: nameplate reads "COHORT 02 · JULY 2026 · NOW ENROLLING"; hero shows `$99` + "Reserve Your Spot"; the four Friday cards show Jul 10/17/24/31; the calendar shows July with Friday dots on 10/17/24/31 and Tuesday dots on 14/21/28; the closing postcard shows "Reserve Your Spot" + a CTA. Open `http://localhost:4321/` and confirm the homepage callout renders and the announcement bar appears at the top.

- [ ] **Step 4: Confirm the Reserve CTA target**

In the running dev site, hover/inspect the "Reserve Your Spot" link in the hero. Expected: `href` equals `NEW_PAYMENT_LINK_URL` from Task 1.

- [ ] **Step 5: Update the Vercel env var (browser)**

Drive Matt's browser to `https://vercel.com` → the mvp-club-site project → Settings → Environment Variables. Edit `COHORT_01_PRODUCT_ID`, set its value to `NEW_PRODUCT_ID` (Production scope, matching how it was set for Cohort 01). Save. Trigger a redeploy (or note that the next push will redeploy and apply it).

- [ ] **Step 6: Verify cohort-status reads the new product**

After the redeploy (or against a preview), load `/api/cohort-status`. Expected: `{ "status": "open", "remaining": 15 }` (the new product has zero paid sessions). If it shows `full` or a low `remaining`, the env var still points at the June product — recheck Step 5.

- [ ] **Step 7: Hand off for push**

Report completion and the verification evidence. Do NOT push. Ask Matt to confirm before pushing (Vercel auto-deploys on push).

---

## Self-Review

**Spec coverage:**
- Stripe product/link → Task 1. ✓
- Vercel env var → Task 8 (Steps 5–6). ✓
- `cohort.js` rollover → Task 2. ✓
- Three promo surfaces restored → Task 3. ✓
- Landing page un-hold-state (CTA, copy, Fridays, July calendar) → Task 4. ✓
- Page meta + JSON-LD InStock → Task 5. ✓
- Emails June→July → Task 6. ✓
- Welcome page → Task 7. ✓
- Webhook no-change verification → Task 1 Step 5. ✓
- Out of scope (webinar) → not touched. ✓

**Placeholder scan:** `NEW_PRODUCT_ID` / `NEW_PAYMENT_LINK_URL` are intentional Task-1 outputs threaded through Tasks 2 and 8, not unfilled placeholders. All copy changes show exact old/new strings. No "TBD"/"handle edge cases".

**Type/string consistency:** `COHORT` field names match the existing schema (`stripeProductId`, `stripePaymentLinkUrl`, `fridaysFormatted`, `timeET`, `officeHoursET`). The env var name `COHORT_01_PRODUCT_ID` is kept verbatim (read in `api/cohort-status.js:29`), so no code references break. CTA `variant`/`location` props (`hero`/`hero_deal`, `postcard`/`closing_postcard`) match `CohortCTA.jsx`.

**Brand voice:** New/edited copy avoids em dashes and prohibited terms; Task 4 Step 12 includes an em-dash guard.
