---
title: "Your First Vibe Coding Project in 60 Minutes"
description: "Build a working tool with AI in under an hour. A step-by-step guide for non-developers who want to start vibe coding today."
author: "Ryan Brodsky"
date: "2026-04-03"
pillar: "Building with AI"
tags: ["vibe-coding", "build-with-ai", "beginners", "claude-code", "non-developers"]
difficulty: "beginner"
readingTime: 10
---

The first time I got a working web app running from scratch, it took me about 45 minutes. No prior knowledge of that stack. No tutorial. Just Claude, a clear idea of what I wanted, and a willingness to type "I don't understand what this error means, can you explain it?" without embarrassment.

That was only possible for the last couple of months, and I already consider it old school now. If you've been curious about vibe coding but haven't started yet, this is the walkthrough I wish I'd had.

## What You're Actually Going to Build

Pick something you'd actually use. That's the only rule.

The best first vibe coding project is something small, specific, and useful to you right now. Not an app to sell. Not a platform. A tool that solves one problem you have. Some examples from people in our community [NEEDS REAL COMMUNITY EXAMPLE: attribute with first name and role]:

- A simple tracker for daily habits (one page, a list, checkboxes)
- A form that formats client intake information the way you want it
- A calculator that applies your personal rate formula for client billing
- A static page that consolidates links you visit constantly

If you can describe your tool in one sentence, you're ready to build it.

## What You'll Need Before You Start

My recommendation: start with Claude Code desktop. Download the [Claude desktop app](https://claude.ai/download), which includes Claude Code built in. You'll need a Claude Pro subscription ($20/month). Lower friction, no terminal, and you're building within minutes. That's the right call for a first project.

The other path is Claude Code in the terminal with VS Code. Slightly more setup, better performance on longer sessions, and where I spend most of my time. The [Getting Started with Claude Code blog post](/blog/getting-started-with-claude-code-non-developer-guide) walks through that setup in detail. Worth doing eventually. Not worth blocking on today.

For your first project, the desktop app is fine. The goal is to ship something, not optimize your environment.

A note on cost: the Claude Pro subscription ($20/month) covers Claude Code desktop usage. If you go the terminal route with API keys instead, you'll pay per token. A typical first project session runs a few dollars. We were watching our API bills closely in the early days. The subscription is simpler to start.

You also need a folder on your computer where the files will live. Create a new empty folder somewhere easy to find, like your Desktop or Documents. That's your project folder. When you start Claude Code, point it at that folder.

## The 60-Minute Breakdown

This is how I'd actually structure your first session.

### Minutes 0-10: Write Your Brief

Before you open Claude, write down what you're building. Not in code. In plain English.

Write three things:

1. What this tool does (one sentence)
2. Who uses it and how (you, daily, on your laptop)
3. What it should look like at minimum (a page with a form, a checklist, a table)

This document becomes your context. You're going to paste it into Claude at the start of every session. Think of it as a briefing document. Claude doesn't remember previous conversations by default, so giving it this context every time prevents you from starting over from scratch.

### Minutes 10-20: The First Prompt

Open Claude Code and paste your brief. Then add this:

> "Create the simplest version of this that actually works. Use plain HTML, CSS, and JavaScript so I can open it in a browser without running a server. Don't add anything I didn't ask for."

That last sentence matters. Claude often adds features to be helpful. On your first project, extras create confusion. Keep it minimal.

Hit enter. Watch it build.

Your job right now is not to understand every line it writes. Your job is to watch what appears and notice whether it matches what you asked for.

### Minutes 20-35: Open It and React

When Claude finishes, it will have created files in your project folder. Find the file called `index.html` (or whatever Claude names the main file), double-click it, and it will open in your browser.

Look at it. Does it do what you asked? Are there things missing? Does something look wrong?

Take notes in plain English. Don't try to fix things yourself. Go back to Claude and describe exactly what you see:

> "The form shows up but there's no submit button. Also the title text is very small. Can you add the button and make the title larger?"

This back-and-forth is the job. You're managing the outputs, refining, steering. [NEEDS VERIFIED QUOTE: Matt on vibe coding evaluation — something from a Getting Started session about this being the managerial step]

That's the whole skill. Not writing code. Evaluating outputs and giving direction.

### Minutes 35-50: Iterate

Keep going. Each round should address one or two specific things. Keep your feedback concrete:

- "The button works but nothing happens after I click it. It should show a confirmation message."
- "Move the section that shows results to the top of the page, above the form."
- "The colors are fine but the font is hard to read. Make it bigger."

If Claude does something unexpected or you get an error message, paste the error directly into the chat:

> "I'm getting this error: [paste the error text]. What does this mean and how do I fix it?"

You don't need to understand the error. Claude does. Your job is to copy it accurately and let Claude diagnose.

One thing worth knowing: if Claude starts going in circles on the same problem, or if the conversation gets very long and responses slow down, start a fresh chat. Paste your brief again, describe what you have so far, and continue. Long conversations degrade Claude's performance. Fresh context helps.

### Minutes 50-60: Declare Done

Your first project doesn't need to be perfect. It needs to exist.

At the end of your session, close the loop:

> "Summarize what this tool does, what's been built so far, and what still needs work. Write this as a short document I can use as context in our next session."

Save that summary. Next time you open Claude Code, paste it in first. This is how you build continuity without losing progress.

## What "Plan Mode" Is and When to Use It

If you're using Claude Code and you want to talk through an approach before Claude starts changing files, type `plan mode` at the start of your message. Claude will respond in conversation only without touching your code. This is useful when you're unsure what to ask for next, or when you want to think out loud with Claude before committing to a direction.

Once you're ready to build, ask normally and Claude will start executing.

## Common Mistakes on a First Project

**Asking for too much at once.** "Build me an app that tracks expenses, sends email reminders, and syncs to my calendar" is not a first project. Pick one function. Ship that. Then add the second.

**Not looking at the output before asking for changes.** Always open the file, test it, and form your own opinion before going back to Claude. You are the quality filter.

**Expecting it to be right on the first try.** Three or four rounds of feedback is normal. Ten rounds is normal for something more complex. Expecting perfection from the first output is how people conclude vibe coding doesn't work.

**Treating errors as failures.** An error message is information. Paste it into Claude. It's not a sign you did something wrong.

## The Point of Starting Small

"Why would I build something tiny when I could use an existing app for that?"

I get this one a lot. The answer is that the first project isn't really about the tool. It's about learning how to work with Claude in a building context. Every project after this one will go faster because you went through the confusion, the iteration loops, and the small wins here.

I've shipped five products as a solo builder now. Geddit Together is live in the App Store. Rendition Video is running. None of those would have happened if I'd waited until I felt ready. The first thing I built was a prototype that three people used and nobody asked for again. It was worth building anyway.

The cost of niching down to a specific user, solving a specific problem, for yourself or for a small team, is approaching zero. That's new. That's the actual opportunity here.

## Your Project Ideas If You're Stuck

If you're drawing a blank on what to build, here are some starting points that work well at the beginner level:

- **A personal dashboard**: Paste in your weekly priorities, get a clean visual layout
- **A rate calculator**: Input hours and project type, output your billable amount
- **A simple checklist app**: Custom categories for a workflow you repeat every week
- **A meeting prep template**: Answer a few questions, get formatted talking points
- **A contact log**: Track follow-ups with clients or colleagues without using a CRM

All of these are one-page HTML projects you can build in a single session.

---

When you've finished your first project, the question worth sitting with is: what problem do I have that I've been tolerating? That's the second project.

The community at [MVP Club](/community) is full of people who have gone through this exact process, many of them with no technical background at all. They share what they're building, troubleshoot together, and help each other figure out the next step. If you want to build alongside people who are figuring it out in real time, that's where they are.

For more on the underlying ideas behind vibe coding, the blog post [Vibe Coding: The New Skill of Work](/blog/you-only-use-10-of-your-computer-vibe-coding-and-the-new-skill-of-work) is a good read. And if you want the full setup guide for Claude Code in the terminal, [Getting Started with Claude Code](/blog/getting-started-with-claude-code-non-developer-guide) covers everything step by step.
