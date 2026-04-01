# PRD: AI Readiness Assessment Tool

*Created: 2026-03-31*
*Location: mvpclub.ai/assess*
*Codebase: mvp-club-site-2*

---

## 1. What & Why

### What
A free, ungated 7-question interactive assessment at mvpclub.ai/assess that scores a team's readiness to adopt AI. Results page shows a score, personalized recommendations, and clear CTAs into the MVP Club ecosystem.

### Why Build This
- **"AI readiness assessment"** has 1,000 monthly searches at **difficulty 9** (Ahrefs data). This is an easy SEO win.
- Top-ranking competitors (Microsoft, Cisco, Avanade) are enterprise-focused. Nobody targets SMB teams, our exact audience.
- The tool demonstrates our core belief: **AI adoption starts with understanding where you are, not picking a tool.**
- Natural top-of-funnel: assessment → Day One workshop or embedded coaching.
- Validates the documentation-first insight before anyone pays.

### Success Metrics
- 50+ completions/month within 3 months
- Top 10 ranking for "ai readiness assessment" (KD 9)
- 10%+ of completers click through to a CTA (demo, community, discovery call)

---

## 2. Brand Alignment

This tool must feel like MVP Club, not a generic SaaS quiz.

### Voice
- **Peer, not professor.** "Let's figure out where you are" not "Take our assessment."
- **Honest and specific.** Each question teaches something about what AI actually needs.
- **Practice-oriented.** Results emphasize doing, not learning.
- **Invite, don't sell.** CTAs are invitations, not pressure.

### Prohibited
- No fear-based framing ("You're falling behind!")
- No "AI mastery" or "future-proof" language
- No corporate jargon (upskilling, reskilling, strategic transformation)
- No em dashes
- No overpromising ("Master AI in 30 days!")

### Tone of Results
- Low scores: encouraging, not alarming. "Most teams start here. The fact that you're thinking about this puts you ahead."
- Medium scores: specific about gaps. "Your processes are partially documented. The gap is in the details AI needs."
- High scores: actionable next step. "You're ready to build. Here's where to start."

---

## 3. User Flow

```
mvpclub.ai/assess
       ↓
  Intro screen (what this is, who it's for, ~2 minutes)
       ↓
  7 questions (one at a time, progress indicator)
       ↓
  Results screen (score, breakdown, recommendations, CTAs)
       ↓
  Optional: email capture for detailed report
```

### Entry Points
- Direct search ("ai readiness assessment")
- LinkedIn posts linking to /assess
- Blog posts with embedded CTA ("Take the assessment")
- Day One landing page cross-link
- Jill's in-person networking ("Try this before we talk")

### Exit Points (CTAs on results page)
- **Low score:** "Try the free Day One demo" → dayone.mvpclub.ai/demo
- **Medium score:** "Book a discovery call" → Calendly link
- **High score:** "Start a Day One workshop" → dayone.mvpclub.ai
- **All scores:** "Join the community" → mvpclub.ai/community

---

## 4. Questions

Each question is designed to surface a specific readiness dimension. The answer options map to a 0-3 point scale.

### Q1: Process Documentation
**"How much of your team's core work is documented in writing?"**

Think SOPs, runbooks, playbooks, how-to guides. Not just "we have a wiki" but documents someone could actually follow.

- None of it. It's all in people's heads. (0)
- A few things are written down, but they're outdated or incomplete. (1)
- Most processes are documented, though some details are missing. (2)
- Our key processes are well-documented and current. (3)

*Why this matters (shown after answering):* "AI can only work with what's written down. Everything your team knows but hasn't documented is invisible to AI."

### Q2: Process Clarity
**"If a new hire started tomorrow, could they follow your team's processes from documentation alone?"**

- No way. They'd need weeks of shadowing and asking around. (0)
- For some tasks, but they'd still need a lot of hand-holding. (1)
- For most tasks, with occasional questions. (2)
- Yes. Our docs are detailed enough to onboard someone independently. (3)

*Why this matters:* "If a human can't follow your documentation, AI definitely can't. The new hire test is the simplest AI readiness check there is."

### Q3: Decision Criteria
**"When your processes say 'review' or 'use your judgment,' is what that actually means written down anywhere?"**

Think about the unwritten rules: what "good" looks like, when to escalate, what exceptions exist.

- Never. We rely on experience and intuition. (0)
- Rarely. A few things have explicit criteria. (1)
- Sometimes. Our more important decisions have clear guidelines. (2)
- Usually. We've documented our decision criteria and edge cases. (3)

*Why this matters:* "'Use good judgment' is the single most common place AI gets stuck. It can follow specific criteria perfectly, but it can't read between the lines."

### Q4: AI Experience
**"How is your team currently using AI tools?"**

- We haven't tried AI for work yet. (0)
- One or two people experiment on their own. (1)
- Several people use AI, but everyone does it differently. (2)
- We have some shared practices or workflows involving AI. (3)

*Why this matters:* "Individual experimentation is a great start, but it doesn't scale. Team-level adoption requires shared practices and aligned expectations."

### Q5: AI Expectations
**"When AI gives your team a result that isn't great, does your team know why?"**

- We assume the AI just isn't good enough. (0)
- Sometimes we can tell, but usually it's a mystery. (1)
- We can usually identify what went wrong (bad prompt, missing context, wrong tool). (2)
- Yes. We iterate on inputs and context to improve results. (3)

*Why this matters:* "Bad AI output is almost always a context problem, not a capability problem. Teams that know how to diagnose 'why' are teams that improve fast."

### Q6: Workflow Fit
**"Can you point to 2-3 specific, repetitive workflows that would benefit from AI?"**

Not vague ideas like "we could use AI for marketing." Specific tasks: "we manually create weekly status reports from 4 different sources."

- Not really. We know AI could help but aren't sure where. (0)
- We have vague ideas but nothing specific. (1)
- We can name 1-2 specific workflows. (2)
- Yes. We've already identified clear candidates and why they'd work. (3)

### Q7: Team Alignment
**"Is your team aligned on what AI should and shouldn't do for your work?"**

- We haven't discussed it as a team. (0)
- We've talked about it loosely, but everyone has different expectations. (1)
- We mostly agree on where AI fits, but haven't formalized anything. (2)
- We've had focused conversations and agree on AI's role, boundaries, and where humans stay in the loop. (3)

*Why this matters:* "The teams that succeed with AI aren't the most technical. They're the most aligned. Everyone needs to agree on what 'good' looks like before AI can help deliver it."

---

## 5. Scoring

**Total: 0-21 points**

### Score Buckets

**0-7: "Getting Started" (Red/Warm tone)**

Your team is early in the AI readiness journey, and that's completely fine. Most teams are here. The fact that you're thinking about readiness puts you ahead of organizations that just buy tools and hope for the best.

**Your biggest gaps:**
- [Dynamic: list the 2-3 lowest-scoring dimensions]

**What to do next:**
The single most impactful thing you can do right now is pick ONE workflow and document it well enough that someone unfamiliar could follow it step by step. That exercise alone reveals what AI would need to be useful.

**CTA:** "Try the free Day One demo. It walks you through exactly this process in 10 minutes." → dayone.mvpclub.ai/demo

---

**8-14: "Almost Ready" (Amber tone)**

Your team has a real foundation. You're not starting from zero. But the gap between "partially documented" and "AI-ready documentation" is where most teams stall. The details matter: specific decision criteria, edge cases, and the unwritten rules your team takes for granted.

**Your strengths:**
- [Dynamic: list the 2-3 highest-scoring dimensions]

**Where to focus:**
- [Dynamic: list the 2-3 lowest-scoring dimensions with specific guidance]

**CTA:** "A Day One workshop closes exactly these gaps. Your team documents a real workflow and builds a working AI prompt in 90 minutes." → dayone.mvpclub.ai

**Secondary CTA:** "Want to talk through your specific situation? Book a 15-minute call." → Calendly

---

**15-21: "Ready to Build" (Green tone)**

Your team is in a strong position. Your processes are documented, your team is aligned, and you have specific workflows in mind. You don't need more preparation. You need to start building.

**Your strengths:**
- [Dynamic: list top dimensions]

**What to do next:**
Take your best-documented workflow and turn it into a working AI prompt. Test it, iterate, and refine until the output matches what your team considers "good." That's the bridge from readiness to results.

**CTA:** "Start a Day One workshop and build your first AI prompt with your team." → dayone.mvpclub.ai

**Secondary CTA:** "Join the community. You're the kind of practitioner who makes it great." → mvpclub.ai/community

---

## 6. Results Page Structure

```
┌─────────────────────────────────────────────┐
│  Your AI Readiness Score                    │
│                                             │
│  ████████████░░░░░░░░░  12/21              │
│  "Almost Ready"                             │
│                                             │
│  Most teams score between 6 and 12.        │
│  You're [above average / right on track].  │
├─────────────────────────────────────────────┤
│                                             │
│  YOUR BREAKDOWN                             │
│                                             │
│  Documentation    ██████░░  2/3             │
│  Process Clarity  ████░░░░  1/3             │
│  Decision Criteria████░░░░  1/3             │
│  AI Experience    ██████░░  2/3             │
│  AI Expectations  ████████  3/3             │
│  Workflow Fit     ██████░░  2/3             │
│  Team Alignment   ████░░░░  1/3             │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  WHAT THIS MEANS                            │
│  [Personalized paragraph based on bucket]   │
│                                             │
│  YOUR STRENGTHS                             │
│  [2-3 highest dimensions with explanation]  │
│                                             │
│  WHERE TO FOCUS                             │
│  [2-3 lowest dimensions with specific       │
│   actionable guidance]                      │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  WHAT TO DO NEXT                            │
│  [Primary CTA - contextual to score]        │
│  [Secondary CTA]                            │
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │  Want the full breakdown?            │   │
│  │  Enter your email for a detailed     │   │
│  │  report with specific recommendations│   │
│  │  for your team.                      │   │
│  │                                      │   │
│  │  [email input] [Send Report]         │   │
│  └──────────────────────────────────────┘   │
│                                             │
├─────────────────────────────────────────────┤
│  Share your score                           │
│  [LinkedIn] [Twitter] [Copy Link]           │
└─────────────────────────────────────────────┘
```

---

## 7. Technical Implementation

### Stack (matches mvp-club-site-2)
- React page component at `/src/pages/AssessPage.jsx`
- Route added to `/src/routes.jsx`
- Tailwind + CSS custom properties (Dusk palette)
- Fully client-side (no backend needed for scoring)
- SSG-compatible (vite-react-ssg)

### Components to Build
1. `AssessPage.jsx` — page wrapper with SEO
2. `AssessmentIntro.jsx` — intro screen
3. `AssessmentQuestion.jsx` — single question view with progress
4. `AssessmentResults.jsx` — results page with score breakdown
5. Optional: email capture component (can use existing SignupOverlay pattern or a simple form POST to a webhook)

### SEO
- Title: "AI Readiness Assessment | Free Tool for Teams | MVP Club"
- Meta description: "Find out if your team is ready for AI in 2 minutes. Score your documentation, processes, and alignment. Free assessment with personalized recommendations."
- Target keywords: "ai readiness assessment," "ai readiness assessment tool," "is my team ready for AI"
- Schema.org: Quiz or Assessment structured data
- Canonical: https://mvpclub.ai/assess

### Email Capture (Optional)
- Email input on results page: "Get your full report"
- POST to a simple endpoint (Resend, ConvertKit, or a webhook)
- Not gated. Full results visible without email. Email gets a formatted PDF or detailed version.

### Shareability
- Each score bucket has a unique URL fragment (e.g., /assess#results?score=12)
- Open Graph meta tags update for shared links: "I scored 12/21 on AI Readiness. How ready is your team?"
- LinkedIn share button pre-populates with score

---

## 8. Content Around the Tool

### Supporting Blog Post
"How Ready Is Your Team for AI? (Take the Assessment)"
- Explains the 7 dimensions
- Links to /assess
- Targets "is my team ready for AI" (KD ~low)

### LinkedIn Posts (Matt)
- "We built a free AI readiness assessment. Most teams score between 6 and 12. The #1 gap? Documentation. Not tools, not training. Documentation."
- "Your AI readiness score isn't about how smart your team is. It's about how well your work is written down."

### Cross-Links
- Day One landing page: "Not sure if your team is ready? Take the free assessment first."
- MVP Club homepage: Feature in HowWeHelp or as a standalone section
- Blog posts: Embed CTA in relevant articles

---

## 9. What We're NOT Building

- No account creation or login
- No backend scoring or storage (all client-side)
- No PDF generation (v1; just show results on screen)
- No comparison to other teams ("You scored better than X%")
- No retake tracking or history
- No integration with CRM or analytics (beyond GA4 page events)

---

## 10. Open Questions

1. **Email capture method:** Use existing Resend setup? ConvertKit? Simple webhook?
2. **Should results be shareable with unique URLs?** (adds complexity but increases virality)
3. **Do we want a "share with your team" feature?** (forward results link to colleagues)
4. **Should the "why this matters" micro-copy show after each answer or on hover?** Showing it teaches as you go (on-brand), but lengthens the experience.

---

## 11. Phasing

### V1 (Ship this week)
- 7 questions, one at a time, progress bar
- Client-side scoring
- Results page with score, breakdown, personalized copy, CTAs
- SEO-optimized page
- No email capture (just results + CTAs)

### V2 (After validating traffic)
- Email capture on results page
- Share buttons (LinkedIn, Twitter, copy link)
- "Why this matters" micro-copy after each answer
- Supporting blog post published

### V3 (After 100+ completions)
- Aggregate data: "Most teams score X on documentation"
- A/B test CTA copy
- Retargeting pixel for assessment completers
