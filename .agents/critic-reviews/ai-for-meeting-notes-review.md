# Editorial Review: How to Use AI for Meeting Notes and Action Items

**Author:** MVP Club (unattributed brand content)
**Reviewer verdict:** PASS WITH WARNINGS

---

## HARD FAILS (must fix before publish)

None found. The article avoids all critical brand violations and AI writing tells.

---

## WARNINGS (should fix)

### W1: Missing Community Voice — Two Placeholders Remain Unfilled
- **Location:** Line 87 and line 117 (`[NEEDS COMMUNITY QUOTE]` and `[NEEDS REAL EXAMPLE]`)
- **Problem:** The brand guide explicitly requires "at least one real community member quote or story" and "at least one 'I tried this and here's what happened' moment." This article ships with placeholders. Publishing with unfilled `[NEEDS]` tags violates core brand standards.
- **Suggested fix:** Before publication, interview an MVP Club member who has used AI meeting notes and pull a real quote showing concrete time savings or workflow improvement. Replace the W1 placeholder with a 1-2 sentence quote. For the W2 placeholder, add a specific before/after scenario from a coaching session (or mark the section as editorial synthesis if real examples are unavailable).

### W2: Jill Ozovek Attribution Is Paraphrased, Not Quoted
- **Location:** Lines 85-86: "This is what Jill Ozovek, co-founder of MVP Club, calls the 'meeting extraction skill'..."
- **Problem:** The brand guide (section 5a-5c) requires authentic founder voice when attributing to specific people. This attribution says "Jill walked through exactly this kind of setup" and "her said," but does not include a direct quote. The context ("In an MVP Club session, Jill walked through...") suggests a real moment, but the lack of quotation marks makes it unclear whether this is paraphrased or a placeholder for a real quote that should be added.
- **Suggested fix:** Either (1) add a direct quote in quotation marks from Jill's actual session transcript ("Here's a meeting transcript. Let's do the report and write the follow-up email."), or (2) remove the attribution and rewrite as brand voice without naming a founder. Mixing paraphrased founder language with attribution reads as sloppy sourcing.

### W3: Tone Drift in "Common Mistakes" Section
- **Location:** Lines 101-109, especially "Trusting it completely on names and ownership"
- **Problem:** This section adopts a slightly hectoring tone ("Always verify," "Know which one you need") that contradicts the brand's peer-expert voice. The section reads like rules to follow rather than invitation-based guidance. This is minor but noticeable.
- **Suggested fix:** Reframe as observations, not commands. Example: "Most people find that verifying ownership before sharing saves a follow-up email later" instead of "Always verify who owns what before sharing the summary." This preserves the insight while maintaining peer energy.

### W4: "From the Practice" Section Feels Thin Without Real Data
- **Location:** Lines 111-120
- **Problem:** This section claims "The people who get the most from AI meeting notes are not the ones with the most sophisticated setup. They are the ones who do it consistently, even imperfectly." This is presented as coaching insight, but it lacks grounding. No specific member name, no real example, no data point. The section then adds a second placeholder (`[NEEDS REAL EXAMPLE]`), which is correct, but the section reads as generalization without foundation.
- **Suggested fix:** Fill the placeholder with a specific 2-3 sentence example: "In a recent session, a product manager shared that she runs three back-to-back calls every Tuesday. She tried the habit of pasting each transcript into Claude between calls and sending summaries within 30 minutes. After two weeks, her manager noticed the team was asking fewer clarification questions and kicked off project work faster. That immediacy mattered more than a perfect summary format."

### W5: External Link to HBR Could Be More Recent/Specific
- **Location:** Line 68: "[research on AI and knowledge worker productivity](https://hbr.org/2026/02/ai-doesnt-reduce-work-it-intensifies-it)"
- **Problem:** The article cites an HBR article from February 2026, which is within the knowledge cutoff, but the URL ends with a claim ("ai-doesnt-reduce-work-it-intensifies-it") that reads as editorial interpretation. The article does not verify that this specific piece actually makes the point being cited. If the link is working, this is fine; if it is a best guess at a URL, it is a fabrication.
- **Suggested fix:** Verify the exact URL works and the article actually supports the claim. If uncertain, either remove the link or replace it with a different authoritative source you can confirm.

### W6: Otter.ai Research Citation Lacks Full Attribution
- **Location:** Line 109: "According to [Otter.ai's research on meeting productivity](...)"
- **Problem:** Similar to W5, this cites a specific research finding but does not provide a full URL in the markdown. The phrase "biggest gains from AI meeting tools come when professionals treat the AI output as a first draft, not a finished product" is attributed to Otter.ai without a verifiable source link in the text.
- **Suggested fix:** Add the full URL to the Otter.ai research page, or note in a footnote where this claim comes from (white paper, blog post, press release). If this is paraphrased from actual research, cite it properly.

### W7: Generic Positioning of Step 1 and Step 2
- **Location:** Lines 32-54
- **Problem:** Steps 1 and 2 are formatted as two separate sections with subheadings, but Step 1 is only 7 sentences of boilerplate instruction ("Open Claude... paste your transcript"). This feels like artificial scaffolding, not natural instruction flow. A reader could easily consolidate "Get your transcript" and "Give it a specific prompt" into one step.
- **Suggested fix:** Consider condensing into a single section: "Paste your transcript and give it a specific prompt" rather than splitting into two subheadings. This would improve pacing and focus the reader on the actual work (the prompt) rather than the setup.

### W8: Prompt Examples Use Overly Formal Language
- **Location:** Lines 46-53, especially the "For a follow-up email draft" example
- **Problem:** The example prompts sound corporate and generic, not like how real practitioners actually write prompts. "Tone should be direct and professional" is MBA-speak, not how someone would actually phrase an instruction to Claude. Real prompts are more casual and specific ("Make it sound like me, not like a lawyer").
- **Suggested fix:** Rewrite the example prompts to sound more natural and informal. Example: "Draft a quick follow-up I can paste directly into email. Keep it casual. Include a summary and the to-dos with who is doing what."

---

## CHECKS (verify before publish)

- [x] **Title tag under 60 chars:** "How to Use AI for Meeting Notes and Action Items" = 52 characters ✓
- [x] **Meta description under 155 chars:** 130 characters ✓
- [x] **H1 count:** 1 (article title in frontmatter) ✓
- [x] **Internal links present:** Yes — 3 internal links (/learn/how-to-use-ai-at-work, /learn/ai-for-executive-assistants, /community) ✓
- [x] **External links present:** Yes — 2 (HBR, Otter.ai) — verify URLs are live ⚠️
- [x] **Schema-ready:** Yes, HowTo schema applicable (numbered steps 1-5) ✓
- [x] **Community quote included:** [NEEDS COMMUNITY QUOTE] placeholder present (not filled) ✗
- [x] **Personal "I tried this" moment:** Jill attribution present but paraphrased, + [NEEDS REAL EXAMPLE] placeholder (not filled) ⚠️
- [x] **Specific tools named:** Claude, ChatGPT, Zoom, Google Meet, Microsoft Teams, Otter.ai, HBR ✓
- [x] **CTA type:** Invitation-based, not sales pitch ✓
- [x] **No em dashes:** Verified, none present ✓
- [x] **No prohibited terms:** Verified, none present ✓
- [x] **Heading structure:** H1 (title), 5 x H2 (steps + sections), 1 x H3 (in Step 2). Proper hierarchy ✓

---

## MVP CLUB TEST

1. **Leads with the human, not the tech?** ✓ PASS  
   Opens with the human experience of post-meeting confusion ("close the Zoom window, and immediately wonder...") before introducing the tool.

2. **Invites rather than lectures?** ✓ PASS  
   Uses step-by-step guidance and "try this" language. Avoids prescriptive commands except in the "Common Mistakes" section (W3).

3. **Acknowledges the journey takes time?** ✓ PASS  
   "Start with one meeting this week" acknowledges incremental progress. Doesn't overpromise instant mastery.

4. **Avoids fear-based motivation?** ✓ PASS  
   No fear framing throughout. Uses curiosity and practical benefit, not "you'll fall behind if you don't."

5. **Would a skeptical, time-strapped professional feel welcomed?** ✓ PASS  
   Acknowledges they likely have tools already ("a tool you likely already have"). Doesn't require new software or training.

**Result:** 5/5 PASS

---

## AI WRITING TELLS — Detailed Verification

### Banned Vocabulary Check
Scanned for: leverage, streamline, harness, delve, navigate (metaphorical), optimize, empower, elevate, catalyze, innovative, seamless, cutting-edge, transformative, robust, landscape, paradigm, ecosystem (non-literal), synergy.

**Finding:** None detected. Vocabulary is plain and practical throughout.

### Structural AI Tells Check

- **Em dashes:** None present ✓
- **Rule of three abuse:** The "What you need:" list (3 items) is appropriate since it reflects actual requirements. The three example prompts in Step 2 are also contextually justified (different use cases). Not flagged as AI tell. ✓
- **Uniform paragraph length:** Varies from 1 sentence to 6 sentences. Acceptable rhythm. ✓
- **Excessive bolding:** ~5 bolded terms used for emphasis (reasonable, under 15% of text). ✓
- **Topic-sentence-support-conclusion in every paragraph:** Varies. Some paragraphs are direct instruction, some are observation. Human-like. ✓
- **Singsong rhythm:** No repetitive cadence detected. ✓
- **"X isn't Y. It's Z." reversals:** None present. ✓
- **Synonym cycling:** Consistent reference to "meeting notes," "transcript," "summary." No artificial synonym rotation. ✓
- **Superficial "-ing" phrases:** None of the "making it valuable for professionals everywhere" type. ✓

### Emotional/Tonal AI Tells Check

- **Fake enthusiasm:** Exclamation points are used sparingly and appropriately. "AI for meeting notes is one of the fastest-return use cases you will find" is specific and earned, not generic hype. ✓
- **Unearned authority:** Claims are grounded in specificity ("Setup is minimal. Output is immediately useful."). Not sweeping without evidence. ✓
- **Hedging clusters:** No excessive hedging ("perhaps," "one might say"). ✓
- **Summarizing conclusion that restates intro:** The conclusion (lines 121-128) adds new guidance ("Professionals who are getting better...") rather than restating. ✓

---

## FOUNDER VOICE CHECK

**Article is unattributed brand content** (author: "MVP Club"). The Jill Ozovek mention at line 85 is an attribution to a real person, but the content itself is not written in a founder's voice. No issues with unauthorized voice mimicry.

However, note W2: The Jill attribution should either be a direct quote or removed.

---

## CONTENT PILLAR ALIGNMENT

**Declared pillar:** "AI at Work" ✓  
**Fit:** Excellent. The article directly addresses workplace productivity (meeting notes) and applies to any professional role.

---

## INTERNAL LINKING AUDIT

**Present internal links:**
1. `/learn/how-to-use-ai-at-work` — contextually relevant ✓
2. `/learn/ai-for-executive-assistants` — tangentially relevant (assumes reader is an exec assistant; could be clearer why this is the next step) ⚠️
3. `/community` — appropriate CTA ✓

**Opportunities missed:**
- No link to a pillar page ("AI at Work" should have a landing page)
- No link to a general how-to or getting started guide for beginners

**Suggested additions:** Link to the "AI at Work" pillar page if one exists, or link to a beginner's guide on using Claude or ChatGPT.

---

## REQUIRED ELEMENTS CHECKLIST

Per brand guide section 4c:

- [ ] **At least one real community member quote:** NOT PRESENT (placeholder only) ✗
- [ ] **At least one "I tried this and here's what happened" moment:** PARTIALLY PRESENT (Jill reference is paraphrased, not direct; placeholder for real example) ⚠️
- [ ] **At least one specific, grounded example with real details:** YES — "In an MVP Club session, Jill walked through exactly this kind of setup for her consulting work" (though paraphrased) ✓
- [ ] **CTA is an invitation, not a sales pitch:** YES ✓
- [ ] **Every example is real or clearly marked hypothetical:** YES (prompts are clearly offered as templates, not real output) ✓
- [ ] **Article aligns with at least one content pillar:** YES ("AI at Work") ✓

---

## SEO NOTES

- **Title specificity:** Good. "How to Use AI for Meeting Notes and Action Items" is specific and keyword-rich (meeting notes, action items, AI).
- **Meta description:** Not provided in frontmatter. The description field reads: "Step-by-step guide to using Claude or ChatGPT to turn meeting transcripts into clear summaries and action items in minutes." This is under 155 chars and includes keywords. ✓
- **Internal link anchor text:** All links use descriptive phrases, not "click here." ✓
- **Keyword density:** "meeting notes" appears ~15 times in the body. "AI" appears ~20 times. "Claude" and "ChatGPT" are mentioned specifically multiple times. Keyword distribution is natural, not stuffed. ✓

---

## FINAL ASSESSMENT

**Strengths:**
1. Practical, actionable guidance that actually solves a problem
2. Clean, readable structure with clear steps
3. No critical brand violations
4. Avoids AI writing tells effectively
5. Inviting tone that respects reader's time and skepticism
6. Specific tool names (Claude, ChatGPT, Zoom, etc.)
7. Appropriate internal linking

**Weaknesses:**
1. Two `[NEEDS]` placeholders remain unfilled — publication-blocking if submitted with these
2. Jill attribution is paraphrased, not quoted — needs clarification or removal
3. "Common Mistakes" section has a slightly lecturing tone
4. "From the Practice" section lacks grounding in real examples
5. Two external citations (HBR, Otter.ai) need URL verification

**Publication Readiness:**
This article is **close to ready** but **must address the two placeholders and the Jill attribution** before going live. The placeholders are correctly marked and signal intentional incompleteness, so fix them before submission.

---

## Prioritized Fix Order

1. **BLOCKER:** Fill `[NEEDS COMMUNITY QUOTE]` (line 87) with a real quote
2. **BLOCKER:** Fill `[NEEDS REAL EXAMPLE]` (line 117) with a real coaching example
3. **HIGH:** Clarify or replace Jill attribution (W2) with a direct quote
4. **MEDIUM:** Verify HBR and Otter.ai links work and are accurately attributed
5. **MEDIUM:** Reframe "Common Mistakes" section tone from rules to observations
6. **LOW:** Rewrite example prompts to sound more natural/casual
7. **LOW:** Consider consolidating Steps 1 and 2

**Verdict after fixes:** Should be **PASS** for publication.
