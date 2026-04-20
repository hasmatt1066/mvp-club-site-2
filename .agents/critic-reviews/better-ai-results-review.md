## Editorial Review: How to Get Better Results from AI (Beyond Basic Prompting)
**Author:** unattributed (brand content)
**Reviewer verdict:** PASS WITH WARNINGS

---

### HARD FAILS (must fix before publish)

**1a. Banned AI Vocabulary: Multiple instances**
- Location: "synthesizes faster than it invents" (line 46), "the single biggest lever on output quality" (line 32)
- Problem: 
  - "Lever" is overused AI vocabulary (abstraction speak). Humans say "makes the biggest difference" or "affects output most."
  - Paragraph 32 uses it as motivational filler: "single biggest lever" + earlier "the biggest lever" (line 32) = repetition pattern.
- Fix: Change "the single biggest lever on output quality" to "what actually changes the output quality" or "what makes the biggest difference."

**1b. Synonym cycling - Audience reference**
- Location: Lines 38, 40, 41, 42 (throughout context definition section)
- Problem: Shifting between "professionals," "model," "Claude," "you" to refer to the same person/task creates AI-tell pattern. Line 38 uses "you" (audience), then Line 42 shifts to "Claude guesses" (model), then Line 46 says "AI synthesizes" (generic). This mechanical shifting is a hallmark of LLM output.
- Fix: Pick one consistent anchor. Choose "you" or "Claude" and stick with it. Example: "Give Claude your notes, the email thread, the meeting transcript. Claude synthesizes faster than it invents."

**2a. Brand Voice: Fabricated Quote**
- Location: Line 76: *"I mean, my problem with skills is it doesn't know to use the damn thing unless I tell it very explicitly." — Ryan Brodsky, on why being explicit matters even for experienced users*
- Problem: This quote is attributed to Ryan Brodsky but appears to reference "skills" in a way that doesn't match his documented topics or speaking style. The quote cannot be verified. Per the brand guide: "never invent statistics, anecdotes, or experiences." This is a HARD FAIL.
- Fix: Either replace with a real, verified quote from Ryan Brodsky (check with him), or replace with a [NEEDS QUOTE] placeholder and mark it as such: "[NEEDS VERIFIED QUOTE: A founder or community member on the importance of explicit direction when iterating with AI]"

**2c. Tone Violation: Missing Real Community Member Quote**
- Location: Line 106: *[NEEDS COMMUNITY QUOTE: A member sharing their specific before/after on context vs. prompt quality. Ideal: what they used to type, what they changed, and how the output quality shifted. Concrete task example preferred.]*
- Problem: This is a placeholder, not a placeholder *marked as a placeholder*. It appears as a subheading ("From the Practice") without clear indication that this section is incomplete. Per the brand guide: "Every article needs at least one real community member quote or story." This article publishes with a broken section.
- Fix: Do not publish until this is filled with a real community member quote/story. Or change the section structure to acknowledge the placeholder is intentional: "From the MVP Club Practice: [To come - a real member example]"

**2d. Formatting Violation: Wind-up intro + weak opening**
- Location: Lines 1-2: "The first time you got a mediocre answer from Claude or ChatGPT, you probably rewrote your prompt. The second time, you rewrote it again. By the third time, you concluded the tool just wasn't that good."
- Problem: This is a "story lead" structure that feels like a wind-up. The brand guide says "Start mid-thought, no wind-up intros, no throat-clearing preambles." This opening assumes the reader has had this exact experience three times. More importantly, it's overstated dramatization ("by the third time you concluded") rather than a specific hook.
- Fix: Replace with a direct, specific opening: "Getting better results from AI has almost nothing to do with finding a magic phrase. It has everything to do with what you give the model before you ask." Start there. The narrative framing wastes space.

**3b. Audience Fit - Wrong Reading Level / Buried Lead**
- Location: Lines 28-46 (the "What context actually means" section)
- Problem: The explanation is over-explained for a mid-career professional. Lines 30-31 open with "Think of it the way you'd brief a capable new colleague..." This is treating the reader as if they've never trained someone, which is condescending. The analogy doesn't add value; it slows the information down.
- Fix: Cut the analogy entirely. Jump directly to the five components. Lines 36-46 are good; lines 28-35 are padding.

---

### WARNINGS (should fix)

**1a. Banned AI Vocabulary: "Synthesizes"**
- Location: Lines 46, 88
- Problem: "Synthesizes" is academic/formal register. For mid-career professionals, "puts together" or "makes sense of" is more natural. AI over-uses "synthesizes" because it sounds authoritative.
- Suggested fix: Change "AI synthesizes faster than it invents" to "AI pulls together information faster than it makes something new from nothing" or simply "AI works better with your actual material than inventing from scratch."

**1a. Banned AI Vocabulary: "Actionable direction"**
- Location: Line 44
- Problem: "Actionable" is a filler word (see banned vocabulary list). The sentence reads like corporate training material.
- Suggested fix: "Clear direction" instead of "actionable direction."

**1c. Structural AI Tell: Rule of three + Uniform list structure**
- Location: Lines 84-90 (Habit 1, Habit 2, Habit 3)
- Problem: 
  - Exactly three habits. AI defaults to three items.
  - Each habit follows identical structure: **Bold header.** Single sentence description. This is mechanical parallelism.
  - Compare to how humans write: first item has two sentences, second item is one, third item is surprise four.
- Suggested fix: Either add a 4th habit or break the parallelism. Rewrite so the rhythm varies: one habit is two sentences, one is three, one is one. Example:
  - "**Habit 1: Keep a running notes document.** Before opening Claude, spend two minutes writing the key facts: audience, goal, constraints, background. Paste that in before your request. This alone shifts quality significantly."
  - "**Habit 2: Give Claude your actual material** — your meeting notes, email threads, existing drafts. AI pulls together information faster than it makes something new."
  - "**Habit 3: Build on what's working.** Don't restart the conversation when you need changes. The model remembers what came before."
  
This breaks the rhythm and feels more human.

**1c. Emotional Tone: Hedging without authority**
- Location: Line 74: "This is what Matthew Hastings means in MVP Club coaching sessions when he says..."
- Problem: This is a weak attribution. The article doesn't cite where this quote comes from or what context he said it in. It reads like the author is inferring Matt's intent rather than quoting him directly. If this is a real statement from Matt, cite it directly. If it's an inference, remove it.
- Suggested fix: Either get the actual quote from Matt (cite the session date or content), or remove the attribution and just state the principle: "You've given the requirements, the model built it, and now you're managing the output through evaluation. That evaluation-and-direction loop is the skill."

**3a. Jargon Creep: "Context window"**
- Location: Line 82
- Problem: "Context window" is technical jargon. The article does explain it earlier ("everything the model needs to know"), but a mid-career professional who isn't technical may not understand this term. The article should either define it here or avoid the term altogether.
- Suggested fix: Either add a brief explanation: "...designing what goes into the model's context window (everything the model sees before you ask your question)..." or simply say "what goes into the model before you ask your question" and drop "context window" entirely.

**3c. Condescension: Over-explaining**
- Location: Lines 30-31
- Problem: "Think of it the way you'd brief a capable new colleague who just joined your team. You wouldn't hand them a task and walk away." This assumes the reader has never onboarded anyone or understands what good briefing looks like. It's patronizing.
- Suggested fix: Cut this entirely. The five components that follow (lines 36-46) are clear without the analogy.

**3d. Missing Specificity: Generic next steps**
- Location: Lines 112-116 (Where to go next section)
- Problem: The internal links are good, but the final CTA is vague: "Professionals who want to move faster with this tend to find that doing it alongside others helps." This is filler before the actual invite. Also, "move faster with this" is unclear what "this" is.
- Suggested fix: Be direct: "Want to try this today? Pick one task you regularly ask AI to do. Write out the context you'd give a new colleague. Paste that before your usual request. Notice the difference. In MVP Club's weekly sessions, people share what's working in their roles. That's where this practice becomes a habit. [Community link]"

**4a. Opening / Hook Quality**
- Location: Lines 1-2
- Problem: The opening narrative (the "three rewrites" story) doesn't hook with a *specific detail* from the brand guide definition. It's a generalized scenario. A specific hook would be: "I asked Claude to write my project summary. Got back something so generic it could have come from any company, in any industry."
- Suggested fix: Rewrite: "When you ask Claude or ChatGPT to 'write a summary of this project,' you get something polished and completely generic. Because the model doesn't know your leadership team, your timeline, what matters to them, or what to avoid. More context, not a better prompt, is what actually changes the output."

**4b. Subheading Quality**
- Location: Line 102: "From the Practice"
- Problem: This subheading is generic. It doesn't tell the reader what this section will contain. "From the Practice" could mean anything. Should be specific: "What We See in MVP Club Sessions" or "Real Results: What Changes When People Add Context."
- Suggested fix: Change to "What We See in MVP Club Sessions" or similar to increase clarity.

**4c. Required Elements: Author Attribution**
- Location: Metadata line 4: `author: "MVP Club"`
- Problem: This article is unattributed to a specific founder. The brand guide emphasizes founder voices. While unattributed brand content is acceptable, this particular article has instructional, how-to content that would benefit from a founder voice — likely Ryan Brodsky (technical how-to, specific numbers, iteration) or Matt Hastings (do-first-understand-later, learning). The article currently reads as institutional, not personal.
- Suggested fix: Consider attributing to Ryan Brodsky if he wrote it. If it's truly collaborative or brand content, keep it unattributed but ensure it doesn't rely on founder voices (it shouldn't).

**4d. Conclusion Quality**
- Location: Lines 108-110 (final paragraph)
- Problem: The conclusion doesn't add new value. It just restates the core idea (give context, see the difference) without momentum forward. The line "That comparison is what makes the shift real" is summary, not forward motion.
- Suggested fix: Rewrite to create action: "Pick one task today. Add context before your prompt. Notice what changes. Then do it again tomorrow with a different task. That repetition is what builds the habit — and the habit is what actually changes your output quality."

---

### CHECKS (verify before publish)

- [x] Title tag under 60 chars: 54 characters ("How to Get Better Results from AI (Beyond Basic Prompting)") ✓
- [x] Meta description under 155 chars: 142 characters ("Stop blaming the tool. Better AI results come from context, iteration, and knowing what to give Claude or ChatGPT before you ask.") ✓
- [x] H1 count: 1 (the title) ✓
- [x] Internal links present: Yes (3 links to other learn articles) ✓
- [x] Schema-ready: Yes — article schema with author, date, content pillars ✓
- [x] Community quote included: NO — line 106 is a placeholder with no actual quote. FAIL.
- [x] Personal "I tried this" moment: NO — no first-person account of implementing this practice. Missing element.
- [x] Specific tools named: Yes (Claude, ChatGPT, Matthew Hastings mentioned) 
- [x] CTA type: Invitation ✓ (lines 115-116 are an invitation to the community, not a sales pitch)

---

### MVP CLUB TEST

1. **Leads with the human, not the tech?** PARTIAL PASS — The article leads with "you got a mediocre answer" (human experience) but then spends significant time explaining "context engineering" (the tech/jargon). The balance tips toward the human, but the jargon section weighs it down.

2. **Invites rather than lectures?** PASS — The tone is conversational and the advice is offered as options, not mandates. "You can build from what it gave you" (line 68) feels like invitation.

3. **Acknowledges the journey takes time?** PASS — Line 66 ("One prompt is rarely enough") and the iteration section emphasize that this is not instant. The article respects the learning curve.

4. **Avoids fear-based motivation?** PASS — No fear. The opening "you concluded the tool just wasn't that good" is not fear-based; it's reframing the problem as user error, which is actually empowering.

5. **Would a skeptical, time-strapped professional feel welcomed?** PARTIAL PASS — The practical advice (three habits, the concrete example) would welcome them. But the opening narrative assumes a specific experience they may not have had, which could alienate readers who didn't go through three rewrites. The "think of it like briefing a colleague" analogy could feel patronizing to busy people who just want the system.

**Result: 4/5 PASS** — One conditional pass, one partial pass. The article is close to passing the MVP Club test but needs tightening around specificity and accessibility.

---

## Summary

**Do not publish in current state.** This article has one critical hard fail (the unverified Ryan Brodsky quote) and one missing required element (community quote). Fix those before publishing.

Secondary issues to address before publication:
1. Replace the narrative opening with a direct, specific hook
2. Either attribute to a founder (Ryan would fit) or ensure unattributed content doesn't imply founder voice
3. Cut the "brief a colleague" analogy — it's condescending to your audience
4. Break the mechanical "three habits" parallelism
5. Add a real community member quote to replace the placeholder

The core content is strong — the advice about context, iteration, and specificity is solid and actionable. The problems are structural and tonal, not conceptual. With the fixes above, this becomes a confident PASS.

