---
title: "How to Iterate with AI: Getting Better Results Every Round"
description: "Iteration is how you turn a mediocre AI output into something you can actually use. Here's the practice behind it."
author: "Ryan Brodsky"
date: "2026-04-03"
pillar: "Human + AI Collaboration"
tags: ["human-ai", "iteration", "prompting", "how-to", "productivity", "claude", "chatgpt"]
difficulty: "beginner"
readingTime: 9
---

The first draft Claude gives you is almost never the one you use. That's not a bug. That's the model.

When I was building Rendition Video, a tool that converts documents into narrated video, I spent the first two weeks convinced I was doing something wrong. Every output needed work. I'd get a script that was 80% there, then spend ten minutes trying to explain to Claude why the intro was off, and watch it overcorrect into something worse. I thought I needed better prompts. What I actually needed was a better relationship with the process.

Iteration with AI is a skill. It's learnable, it gets faster with practice, and it's the difference between people who get real results from these tools and people who paste a prompt, get disappointed, and close the tab.

## What iteration actually means

Most people think of AI like a vending machine: you press a button, something comes out, you accept it or you don't. That mental model makes iteration feel like failure. If you have to go back and try again, something went wrong.

It didn't. The back-and-forth is the process.

Working with Claude or ChatGPT looks more like working with a very capable junior colleague who's smart but doesn't know your situation, your audience, or your preferences yet. You give them a brief, they produce a draft, you respond to what they gave you. Each round gets closer. Three rounds usually gets you somewhere usable. Five rounds gets you somewhere good.

A [2025 MIT Sloan analysis of human-AI collaboration](https://mitsloan.mit.edu/ideas-made-to-matter/when-humans-and-ai-work-best-together-and-when-each-better-alone) [NEEDS VERIFIED LINK] found that human-AI teams tend to outperform either humans or AI working alone on creative and generative tasks precisely because of this loop: the AI produces something, the human responds to it, and the combination produces work neither could do independently. The iterative loop is the mechanism. Most people skip it.

## The three-round rule

If your first output is wrong, don't start over. Stay in the conversation and go another round.

Round one is a rough shape. You're finding out what Claude thinks you want. The output tells you what information was missing from your prompt and what assumptions the model made that don't match your situation.

Round two is correction. You tell Claude specifically what's off, what to keep, and what to change. This is where most people stop trying. Don't. The second response almost always has more of what you actually wanted, even when the first was miles off.

Round three is refinement. You're closing the gap on details. Tone, length, specific wording. By round three, you're usually editing rather than rebuilding.

I use this on every deliverable I produce with AI. Status updates, documentation, scripts for Rendition, even replies to long email threads. Three rounds gets me somewhere I'm proud to send. Sometimes two. Occasionally one, when I've given Claude a strong brief from the start.

> "Evaluation and iteration are more important than perfection on the first try. Expect multiple rounds of feedback to Claude." — Matt Hastings, MVP Club Getting Started session

## What to say in each round

The feedback you give between rounds matters more than the original prompt. Most people skip this part entirely.

Vague feedback produces vague corrections. "This isn't quite right" gives Claude nothing to work with. Compare that to:

"The first two paragraphs are exactly right. The third paragraph buries the key point I need to land. The ask should come at the end of that paragraph, not the beginning, and it should be more direct."

Claude has something specific to act on. The correction will be targeted. The rest of the piece stays intact.

The pattern I've landed on for round two feedback:

1. Name what worked. "The structure is good, the first section is right."
2. Name what's wrong, specifically. "The tone in the second section is too formal for this audience."
3. Say what you want instead. "Rewrite just that section in a more conversational tone. Don't change anything else."

That third piece is load-bearing. When you say "don't change anything else," Claude doesn't. When you don't say it, Claude treats the whole response as up for revision. You'll lose the parts that were working.

## The context problem (and the fast fix)

Most bad first drafts aren't the model's fault. They're a context problem. Claude gave you something generic because you asked for something generic. You said "write a status update" without telling it who reads your status updates, what they care about, what's actually happening on your project, or what you need them to do after reading it.

The fast fix is to paste in what you have before you ask for the thing you want. Meeting notes, email threads, a previous draft, a rough outline in your own words. Claude builds much better from real material than from a three-word task description. Your inputs make the outputs specific.

> "This is the really important step of vibe coding. You gave it the requirements, it built it, and now you're managing the output through evaluation." — Matt Hastings, MVP Club Getting Started session

That word, evaluation, is the right frame. After the first round, your job shifts. You're not the requester anymore. You're the reviewer. You're reading like an editor, deciding what stays and what needs work. That's a different posture than "did it do what I asked," and it's a more useful one.

## When to start a new conversation

Staying in the same conversation is usually the right call. Claude remembers everything in the thread. You can reference earlier parts, ask it to go back to a version it gave you two rounds ago, and build on what's already working.

But there are times when starting fresh is worth it:

You've corrected so many times that the thread is confused. Claude is holding contradictory instructions and the output keeps splitting the difference in ways that don't make sense.

You realized midway through that you want something different from what you originally described. You started asking for a weekly email and now you want a one-pager. The context around what you're building is no longer accurate.

The project scope changed. You're not writing a client update, you're writing a case study. Different format, different purpose, different brief.

When you do start fresh, spend two minutes writing a better first prompt based on what you learned. Every rough conversation is research into what Claude needs from you. Use it.

## How model choice affects your iteration loop

This is something I pay attention to because it affects how many rounds you need.

For complex tasks where you want fewer back-and-forth rounds, Claude's Opus model spends more compute on planning and tends to nail structure and intent on the first try. It costs more per message. For execution-heavy tasks where you're doing a lot of rounds anyway, Sonnet gets you there faster and cheaper. I run Sonnet on most of my daily work at $20 a month on Claude Pro. I reach for Opus when I'm building something new and want fewer early-round corrections.

ChatGPT-4o is in the same tier as Sonnet for most professional writing tasks. Which one you use matters less than whether you've developed the iteration habit with it.

[NEEDS COMMUNITY QUOTE: a member sharing which tool they prefer for iterative work and why, with a specific task example]

## The momentum killer: regenerating without changing anything

Here's the mistake I see most often. Someone gets bad output and clicks "try again" or just sends the same message a second time. The model generates a slightly different response from the same distribution of possibilities. It's still probably wrong in the same ways, because the inputs didn't change.

If the first response missed, the second will probably miss too. You need to change the inputs, not just roll the dice again.

When I was building out the DualEnroll automation, a workflow I built to compress a five-hour manual process to under an hour, I went through a phase where Claude kept producing solutions that worked technically but broke something upstream. I kept asking it to try again. It kept producing the same class of error. The breakthrough was when I stopped asking it to try again and started asking it to explain what it understood about the constraint I was working around. Once I gave it a clear picture of the dependency, it stopped producing solutions that violated it. I hadn't changed my ask. I'd changed the context.

That's what debugging your iteration loop looks like.

## Keeping your context alive across sessions

One of the friction points people hit: you have a great session, Claude knows your project inside and out, and then you close the tab. The next session starts from zero.

The fix is a running document. Before you wrap a session, ask Claude to write a summary of what you worked on, what decisions were made, and what the current state is. Drop that into a text file. At the start of the next session, paste it in before your first message.

This costs you 90 seconds at the end of each session. It saves you two or three rounds at the start of the next one. Over a month of regular use, that's a meaningful amount of recovered time.

For bigger projects, I keep a project tracker markdown file. Claude reads it at the start of each session, knows where things stand, and doesn't repeat suggestions I've already rejected. Matt mentioned a version of this in our Getting Started series: project tracking documents shared with Claude prevent "repeated iteration dead-ends." That's exactly the problem they solve.

## What it feels like when it clicks

The shift from frustrating to functional happens faster than most people expect, but it doesn't feel like an insight. It feels like a habit.

You stop expecting the first response to be right. You start reading the first response as a diagnostic, not a verdict. You notice quickly what's off and what's close. Your round two messages get shorter and more precise because you know exactly what you're asking Claude to fix.

After 20 or 30 sessions of this, you stop thinking about iteration at all. It's just how you work with these tools. The loop is automatic. The output gets better faster. The gap between what you asked for and what you got closes earlier in the conversation.

That compounding is the argument for building the habit now. It doesn't matter how good the models get. Iteration will always be the skill that determines how much value you extract from them. The models handle execution. You handle direction.

For more on how to give Claude the context it needs from the start, [how to describe what you want to AI](/learn/describing-what-you-want) covers the briefing approach in detail. And if you're dealing with output that's completely off-base rather than just needs refinement, [what to do when AI gives you bad output](/learn/when-ai-gives-bad-output) has a diagnostic framework for figuring out what went wrong.

## The part you can only get from practice

Everyone I've walked through this says some version of the same thing: they understood iteration conceptually pretty quickly. Feeling natural took longer. You develop a read for what good output looks like. You get faster at noticing what's off. You learn how to say what you want in a way Claude acts on.

That calibration doesn't happen from reading about it. It happens from doing it. Most people need somewhere between 15 and 30 sessions before it clicks, and that's normal.

If you want to speed that up, practicing alongside other people helps. You get to watch how they give feedback, hear what's working for them, and share what you've figured out. That's what happens in MVP Club's weekly sessions. The [community](/community) is where the iteration habit actually builds.
