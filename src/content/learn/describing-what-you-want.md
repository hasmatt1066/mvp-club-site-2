---
title: "How to Describe What You Want to AI"
description: "Learn how to describe what you want to AI so it actually delivers. Context, specificity, and iteration are the skills that change everything."
author: "Matt Hastings"
date: "2026-04-03"
pillar: "Building with AI"
tags: ["building-with-ai", "how-to", "vibe-coding", "context-engineering", "prompting", "beginner"]
difficulty: "beginner"
readingTime: 9
---

The first time someone asks Claude to build them a tool, they usually type something like: "Make me a spreadsheet that tracks my team's projects." What comes back is fine. It's also completely generic. Two minutes later, they're back in the chat window trying to explain why that's not quite right, and starting to wonder if this whole thing actually works.

It works. The missing piece is learning how to describe what you want. That's the collaboration skill at the center of everything we do in building with AI.

## You're becoming a manager of AI

Working with Claude or ChatGPT is a working relationship. It needs direction, context, and feedback to do its job well. One of the frames we use with people: you're becoming a manager of AI. You set the context, evaluate the output, and bring the judgment. Claude handles the execution.

Managers don't bark instructions at their team and hope for the best. They brief. They give background. They explain what success looks like. And when the first draft isn't right, they give clear, specific direction instead of throwing it away and starting over.

Working with Claude is exactly that.

## What AI actually needs from you

Think about the last time you gave a new colleague a task. You probably told them something about why it mattered, who it was for, what format you needed, and what to avoid. You gave them enough to work with.

AI needs the same things. After working through this with people in over a hundred coaching sessions, the gaps almost always fall into the same five areas.

Who you are and what you're doing matters more than people expect. Not your full biography, just enough context. "I'm a project manager at a healthcare company" gives Claude something to anchor to. "I'm using this for my team's weekly standup" is better than nothing.

The audience changes everything. A project tracking tool for a solo consultant looks completely different from one built for a team of eight. A status update for your VP needs a different tone than one for your peers. Spell out who this is for.

"Good" is not a brief. "Three columns, color-coded by status, with a notes field at the bottom" is a brief. The more concrete you are about what done looks like, the closer the first output will be.

Constraints are useful direction. Length, format, what to include, what to leave out. "Keep it simple enough for someone who's never used a spreadsheet like this" tells Claude a lot. "No jargon" does too. "Don't mention the budget situation until the third paragraph" is the kind of detail that separates a generic output from one that actually works.

The last one surprises people: paste in your actual material. Claude builds better from what you give it than from what it makes up. Your notes, the email thread, the draft you're already working from. The more specific your inputs, the more specific your outputs.

## Idea to words to reality

In our sessions, we use a simple frame: idea, words, reality.

You imagine what you need. You describe it in plain English. It exists.

That middle step, the description, is where most people get stuck. And the trick is that you don't have to be a writer to do it well. You just have to be honest about what you're actually trying to accomplish.

"I want a simple tool that lets me track five projects at once. Each project should have a name, a current status (on track, at risk, or stalled), a due date, and a space for notes. I want to be able to see all five at a glance without scrolling. I'll use this myself, not share it with anyone, so it doesn't need to be polished."

That's not fancy writing. It's just clarity. And it produces something dramatically closer to what you actually want on the first try.

> "Features can be here, but it's just good practice of like, how do I steer?" — Matt Hastings, Getting Started series at MVP Club

That word, steer, is the right one. You're not giving commands. You're steering.

## The specificity that people forget

One of the most common things we see in sessions: someone asks Claude to change something visual, and Claude swaps the colors instead of changing the layout. The request was "make this look different," and Claude did that, technically.

The problem is "different" meant something specific in the person's head that they didn't put into words.

> "I did ask it to give me two versions that were radically different... but it just gave me two versions that are pretty much the same. One was darker, just different colors." — Brian Lightfoot, Getting Unstuck Friday session [NEEDS VERIFICATION]

When you want structural change, say structural. When you want a different layout rather than different colors, say layout. When you want the second paragraph rewritten but everything else kept exactly the same, say so.

Specificity doesn't slow things down. It saves you from two or three rounds of correction that could have been avoided.

## Start broad, then narrow

Here's something that trips people up at the beginning: you don't have to describe everything perfectly before you start. You can start with the shape of what you want and refine from there.

Give Claude a broad description to generate a first version. Look at what comes back. Then use that output as the starting point for a much more specific conversation.

"This is close. The middle section is too long, cut it in half. Move the status field to the top. And can you add a 'last updated' row at the bottom?"

Each of those directions is specific and actionable. You didn't have to know any of that before you started. The first draft revealed what you actually wanted.

[NEEDS COMMUNITY QUOTE: A member describing their "aha moment" when they started iterating instead of restarting. Specific task preferred — something like "I was trying to build a contact tracker and kept starting over until I realized I could just tell Claude what was wrong with what it gave me." Do not publish until filled with a verified member story.]

This is the iteration habit. One prompt is almost never the end. The good version usually comes on the second or third pass, and sometimes it takes five. That's not failure. That's the process.

## What to do when it's going in the wrong direction

Sometimes you get a few rounds in and Claude is clearly building something that won't work. The instinct is to wipe the slate clean and start over.

Often, you don't have to. Claude Code is a tool for building software directly inside your code editor using Claude. It has a "plan mode" that switches things to chat-only so Claude stops making changes and you can talk through what went wrong before it touches anything else. Tell Claude where it went sideways. Explain what you were actually trying to accomplish. Let it recalibrate before it writes another line.

If you're working in Claude chat rather than Claude Code, just be explicit: "Stop and let's talk through what I'm actually trying to build before you change anything else." Claude will follow that direction.

And if you do need to start fresh, carry the context with you. Summarize what you learned from the last attempt. Tell Claude what the previous approach got wrong and why. That context is what prevents you from ending up in the same place again.

## English is the new programming language

We use this framing a lot at MVP Club because it resets people's expectations in a useful way. Plain English is now the interface. You describe intent, Claude handles the rest.

Tasks that felt like they required a developer now feel like they require a clear brief. And most professionals already know how to write a clear brief. They do it every day in emails, in project plans, in conversations with their teams.

You're applying a skill you already have to a context you haven't tried it in yet. That's it.

## A starting template

If you're not sure where to start, use this frame for your first message:

**Who you are:** One sentence about your role and situation.
**What you're building/writing/creating:** One sentence on the thing.
**Who it's for:** The audience or end user.
**What success looks like:** What the finished thing does or contains.
**Any constraints:** Format, length, tone, things to avoid.

You don't have to fill in every field for every task. A simple revision request doesn't need all five. But for anything where the first draft keeps coming back wrong, run through this list and see what you left out. Usually that's where the gap is.

For a deeper look at how context changes AI output across all kinds of professional tasks, [how to get better results from AI](/learn/better-ai-results) covers the full context-first approach. And if you're just getting oriented on how to work with AI day-to-day, [how to use AI at work](/learn/how-to-use-ai-at-work) is a good place to build the foundation.

## Practice alongside people who are doing the same thing

People get good at this faster when they're not doing it alone. Watching someone else describe what they want, seeing where Claude goes with it, asking questions when you get stuck, sharing what clicked. That's how the habit actually builds.

That's what happens in MVP Club's weekly sessions. If you want to practice this alongside other mid-career professionals who are building things with AI right now, the [MVP Club community](/community) is where that happens.
