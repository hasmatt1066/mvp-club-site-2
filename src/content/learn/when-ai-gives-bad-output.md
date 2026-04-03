---
title: "What to Do When AI Gives You Bad Output (The Iteration Skill)"
description: "AI rarely nails it on the first try. Here's how to diagnose bad output and iterate your way to results worth using."
author: "MVP Club"
date: "2026-04-02"
pillar: "AI at Work"
tags: ["ai-at-work", "prompting", "iteration", "how-to", "productivity"]
difficulty: "intermediate"
readingTime: 9
---

You paste in a task, Claude spits something back, and it's... not what you wanted. Too formal. Missing the point. Weirdly generic. You stare at it, wonder if you're using AI wrong, and close the tab.

That moment of frustration is where most people stop. And it's exactly where the skill begins.

Getting bad output from Claude or ChatGPT isn't a failure signal. It's the first data point in an iterative process. The professionals who get real results from AI aren't the ones who write perfect prompts on the first try. They're the ones who learned to diagnose what went wrong and course-correct fast.

## Why AI output goes sideways (and what you can actually fix)

Bad output almost always comes from one of four places. Knowing which one you're dealing with tells you exactly what to change.

**1. The goal was unclear.** You asked for "an email to my team," but the AI doesn't know if that's a weekly update, a difficult conversation, a celebration, or a request for information. Vague goal, vague output.

**2. The context was missing.** AI doesn't know who you are, what your company does, what your relationship with the recipient is, or what you've already tried. It's filling in blanks with reasonable guesses that might not match your situation.

**3. The format wasn't specified.** You wanted three bullet points. You got four paragraphs. You wanted a formal memo. You got a conversational draft. If you didn't say what you wanted the output to look like, the AI made a call on your behalf.

**4. The output was close but not right.** This is actually the most useful case. The AI understood what you wanted, got 70% of the way there, and needs targeted feedback to close the gap.

Each of these has a different fix. Let's go through them.

## The iteration loop: four steps that actually work

Think of this as a conversation, not a vending machine. You wouldn't hand a new colleague a task with zero context and expect perfection on the first try. You'd explain, they'd draft, you'd give feedback, they'd revise. AI works exactly the same way.

Anthropic's [prompt engineering documentation](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) describes this as an iterative cycle: generate a draft, identify where it falls short, then give specific feedback in a follow-up. Most people skip the second step (the diagnosis) and just hit regenerate, which rarely helps.

### Step 1: Name what's wrong before you try again

Before you send another message, spend 30 seconds being specific. "The output was bad" doesn't help. "The tone is too formal for a casual team update" helps. "The bullet points are too long and the third one is off-topic" helps.

The more precisely you can identify the gap, the more targeted your follow-up can be.

### Step 2: Add the context that was missing

If the output missed your situation entirely, the fix is context, not a new prompt. Tell Claude what the previous response got wrong, and add the background it needed. Something like:

> "This isn't quite right. My team is a small creative group that communicates informally, and this reads like a corporate announcement. Here's more context: [brief background]. Can you revise with that in mind?"

You don't need to start a new chat. In fact, keeping the conversation going is usually better because the model retains the full context of what you were trying to do.

### Step 3: Give specific, directive feedback

Vague feedback produces vague results. Compare:

- "This isn't what I wanted. Try again." (No information for the AI to use)
- "The intro paragraph is too long and it buries the main point. Shorten it to two sentences and lead with the ask, not the background." (Actionable)

The second version gives Claude something to work with. This is what Matt Hastings, one of MVP Club's founders, calls "managing the output through evaluation." After the AI generates a draft, your job shifts from requester to reviewer. You're reading like an editor now, not a user.

> "This is the really important step. You gave it the requirements, it built it, and now you're managing the output through evaluation." — Matthew Hastings, during an MVP Club Getting Started session

### Step 4: Confirm what worked before changing what didn't

If parts of the output are good, say so explicitly. "The first two sections are exactly right. The third section is too generic. Here's what I actually wanted there: [specifics]."

Anchoring what worked keeps the AI from changing what already landed. And noticing what's worth keeping trains you to read output more carefully, which makes you faster at iteration over time.

## When to start fresh vs. when to keep going

Staying in the same conversation is usually the right call for the first 2-3 rounds of iteration. But there are times when starting a new chat is worth it:

- The AI has gone so far off track that correcting it would take more work than starting over
- You've added so many caveats and constraints that the conversation is getting unwieldy
- You realized midway through that you actually want something different from what you originally described

When you start fresh, take 2 minutes to write a better initial prompt based on what you learned from the failed conversation. Every "bad" conversation is research into what the AI needs from you.

## Three common iteration mistakes

**Regenerating without changing anything.** Clicking "try again" on the same input produces the same distribution of outputs. If the first response missed, the second probably will too. You need to change the inputs, not just roll the dice again.

**Over-prompting.** Some people respond to bad output by writing a 500-word prompt full of every constraint they can think of. This can actually make things worse. AI performs better with clear, focused instructions than with a wall of text that includes contradictions. If you've over-specified, try a simpler version.

**Giving up at round one.** Brian, a consultant who went through an MVP Club Website Building session, put it well: he'd asked Claude to give him "two versions that were radically different," but got back "two versions that were pretty much the same. One was darker, just different colors." Rather than giving up, he realized he needed to be explicit about structure, not just aesthetics. He added a reference folder with screenshots and got the variety he was looking for on the next try.

[NEEDS COMMUNITY QUOTE: member experience iterating on a work deliverable, first got generic output then got it right after specific feedback]

## The deeper shift: from one-shot to iterative

The mental model change here is bigger than any single technique. Most tools we use at work are deterministic: type a formula in Excel and you get the same result every time. AI is probabilistic. As the [probabilistic vs. deterministic AI](/blog/probabilistic-vs-deterministic-ai) article explains, the output varies because AI is generating a range of possible responses and you're influencing which ones become most likely.

Once you accept that, the expectation of "perfect on the first try" goes away. Iteration becomes the process, not the failure. You're not doing AI wrong if you're on round three. You're doing it right.

This is also why the skill matters more than the prompt. You can find a great prompt template online and still get bad results if you don't know how to work with what comes back. The iteration skill is the one that compounds.

## A practical starting point for your next session

Next time you get output you don't like, try this sequence before giving up:

1. Write down (in plain language) exactly what's wrong with what you got. Be specific.
2. In your next message, quote the problem, explain why it doesn't work, and add any context the AI was missing.
3. If it improves but still isn't right, name what improved and what still needs work.
4. Repeat until it's good enough to use, or until you've learned enough to start a better conversation.

For tasks you repeat often (weekly updates, performance review feedback, client emails), keep notes on what context works best. Over time, you'll build a set of starting conditions that gets you to good output faster. That's what [building AI into your daily workflow](/learn/how-to-use-ai-at-work) looks like in practice.

Claude's own documentation on [prompt engineering best practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices) is worth bookmarking if you want to go deeper on the mechanics of how instructions get interpreted.

## Where people who iterate well end up

Professionals who get comfortable with iteration tend to describe a turning point: the moment they stopped expecting a magic prompt and started treating AI like a capable colleague who needs good direction. The tool didn't change. Their relationship with it did.

That shift doesn't happen from reading about it. It happens from doing it. Most people need 10 to 20 bad sessions before it clicks, and that's completely normal.

If you want to run through these techniques alongside other professionals who are figuring it out in real time, that's exactly what happens in MVP Club's weekly sessions. You get to watch iteration in action, share what's working, and skip some of the trial-and-error solo. [Come see what the community is working on.](/community)
