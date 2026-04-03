---
title: "How to Get Better Results from AI (Beyond Basic Prompting)"
description: "Stop blaming the tool. Better AI results come from context, iteration, and knowing what to give Claude or ChatGPT before you ask."
author: "MVP Club"
date: "2026-04-02"
pillar: "AI at Work"
tags: ["ai-at-work", "prompting", "context-engineering", "productivity", "how-to", "best-ai-prompts-for-work"]
difficulty: "intermediate"
readingTime: 10
---

When you ask Claude or ChatGPT to "write a summary of this project," you get something polished and completely generic. Because the model doesn't know your leadership team, your timeline, what matters to them, or what to avoid. More context, not a better prompt, is what actually changes the output.

## The real reason AI gives you generic output

Most professionals open a chat window and type something like: "Write a summary of this project for my leadership team." They get back something polished, professional, and completely generic. It reads like it was written for every leadership team at every company in every industry.

Because it was.

Claude and ChatGPT don't know your leadership team. They don't know whether your leaders want three bullets or three paragraphs, whether they're coming to this with context or starting cold, whether the project is controversial or celebrated internally. When you give a general request, you get a general response.

More context, not a better prompt, is what actually changes the output.

## What context actually means

Context is everything the model needs to know to do the job well. And it's what actually changes the output quality.

Anthropic's documentation on [prompt engineering for Claude](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/long-context-tips) makes this explicit: when you provide more background information up front, Claude performs measurably better. This is especially true for professional writing tasks, where generic instructions produce generic results.

Context has five components for professional work:

**Your role and situation.** Who are you, and what's the setting? "I'm a marketing manager preparing a client-facing report" gives Claude a completely different starting point than just "write a report."

**The audience.** Who will read this? What do they already know? What do they care about? Your CFO and your direct report need different things from the same project update.

**The goal.** What should this output accomplish? "Summarize the project" and "build confidence with the stakeholder before our renewal conversation" are very different briefs.

**The constraints.** Length, tone, format, things to avoid. "Keep it under 200 words, no jargon, don't mention the budget issue until the third paragraph" is clear direction. Leaving these out means Claude guesses.

**The raw material.** Paste in your notes, the email thread, the meeting transcript, the draft you already have. Give Claude your actual material. Claude pulls together information faster than it makes something new from nothing.

## Step-by-step: building a context-first prompt for real work

Here's what this looks like applied to one of the most common professional writing tasks: the status update.

**Without context:**
*"Write a project status update for my stakeholders."*

Output: a generic template.

**With context:**
*"I'm a project manager at a healthcare technology company. I'm writing a weekly status update for my VP of Operations and our executive sponsor, who are both coming to this with general awareness of the project but not the details. Our project (implementing a new scheduling system) is on track for timeline but slightly over budget on the integration phase. I want to communicate confidence without hiding the budget situation. We also just resolved a major vendor issue that had been worrying the team. Draft a three-paragraph status update: accomplishments, current status, and what we need from leadership next week. Conversational but professional. Avoid bullet lists in this particular email."*

Output: something you can actually send with light edits.

The prompt is longer. The output is better. The total time is still faster than writing from scratch.

## The iteration habit that changes everything

One prompt is rarely enough. This is where most people give up too soon.

When Claude gives you something that's 70% right, the instinct is to start over with a new prompt. Don't. Iterate on the same conversation thread instead. Claude has all your context in memory. You can build from what it gave you:

- "That's good, but the second paragraph sounds too formal. Rewrite just that paragraph in a more conversational tone."
- "Add a sentence acknowledging the vendor issue we resolved. Keep everything else the same."
- "The third paragraph is too long. Cut it to two sentences."

Each of these directives is faster than starting over, and Claude builds on what's already working. You gave it the requirements, it built something, and now you're managing the output through evaluation. That evaluation-and-direction loop is the skill.

[NEEDS VERIFIED QUOTE: A founder or community member on the importance of explicit direction when iterating with AI — specific enough to be attributed by name and session]

The lesson behind this: specificity is not optional. Even people who use these tools every day have to be direct and explicit about what they want. Claude's job is to respond to what you give it, not to intuit what you meant.

## What "context engineering" means for your workflow

You may have seen the term "context engineering" showing up in AI circles. It describes something practical: designing what goes into the model before you ask your question (everything Claude sees before you make your request), so the output is better from the start.

For most professionals, context engineering is less exotic than it sounds. It's really just three habits — and the rhythm matters as much as the rules:

**Habit 1: Keep a running notes document.** Before you open Claude or ChatGPT, spend two minutes jotting the key facts: the audience, the goal, the constraints, any relevant background. Paste that in before your request. This alone improves output quality significantly. It takes two minutes and saves twenty.

**Habit 2: Give Claude your actual material** — your meeting notes, email threads, existing drafts, the client's message. Claude pulls together information faster than it generates from nothing. Your actual inputs make the outputs specific instead of generic.

**Habit 3: Build on what's working.** Don't restart the conversation when you need changes. Claude remembers what came before in the same thread. Use that continuity.

The OpenAI prompt engineering guide makes a similar point: "Be clear about what you need. Specify role, audience, or format." This isn't advice about magic phrases. It's advice about giving the model enough to work with.

## Common mistakes (and what to do instead)

**Asking without context.** The most common issue. If you wouldn't send a new contractor to do a task with just a three-word instruction, don't do it with AI either.

**Giving up after one mediocre output.** The first response is a starting point. The good version usually comes on the second or third pass.

**Pasting raw material without a clear ask.** Dumping a 2,000-word document into the chat and typing "summarize this" works, but "summarize this into five bullets for a technical audience who already understand the product" works much better.

## What We See in MVP Club Sessions

In MVP Club coaching sessions, we consistently see the same pattern: the people getting the best AI results at work are not the ones who have found better prompts. They're the ones who've gotten into the habit of briefing the AI the way they'd brief a team member.

[NEEDS COMMUNITY QUOTE: A member sharing their specific before/after on context vs. prompt quality. Ideal: what they used to type, what they changed, and how the output quality shifted. Concrete task example preferred. — Do not publish this section until filled with a verified member story.]

Want to try this today? Pick one task you regularly ask AI to help with. Write out the context you'd give a new colleague doing that task for the first time. Paste that context in before your usual request. Compare the output to what you normally get. Then do it again tomorrow with a different task. That repetition is what builds the habit — and the habit is what actually changes your output quality.

## Where to go next

If you're building on what's here, [how to use AI at work](/learn/how-to-use-ai-at-work) covers the four types of work where AI fits best in a professional role, including drafting, synthesis, research, and iteration. For the specific techniques around getting good AI output on professional documents, [what to do when AI gives you bad output](/learn/ai-beginner-mistakes) covers the iteration and evaluation skills in more depth.

Want to try this alongside other professionals in your field? In MVP Club's weekly sessions, members share the specific context-building approaches that are working in their roles right now. That's where this practice becomes a habit. The [MVP Club community](/community) is where those conversations happen.
