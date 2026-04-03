---
title: "What Is Vibe Coding? A Plain-English Explanation"
description: "Vibe coding lets you build real software by describing what you want in plain English. Here's what it is, how it works, and why it matters."
author: "Matt Hastings"
date: "2026-04-03"
pillar: "Building with AI"
tags: ["vibe-coding", "building-with-ai", "non-technical", "beginners", "claude-code"]
difficulty: "beginner"
readingTime: 7
---

A year ago I built a browser-based game. I have a PhD in Educational Foundations. I cannot explain what a for-loop does. And I built a browser-based game. That's vibe coding.

The term was coined by Andrej Karpathy, a co-founder of OpenAI, in February 2025. His description: a new kind of coding where you "fully give in to the vibes, embrace exponentials, and forget that the code even exists." Collins English Dictionary named it their Word of the Year for 2025. Merriam-Webster added it to their slang and trending list.

Big moment for a term that describes something pretty simple: you tell the AI what you want to build. The AI builds it. You look at what it made, tell it what to change, and keep going until you have the thing you wanted.

## What vibe coding actually is

Vibe coding is a conversational approach to software development. Instead of writing code line by line in a programming language, you describe your goal in plain English, review what the AI produces, give feedback, and iterate.

You're not writing code. You're directing it. The mental model is closer to managing a project than writing a program. You bring the goal, the context, and the judgment. Claude, or whatever AI you're using, brings the technical execution.

The AI doesn't read your mind. Vague instructions produce vague results, and the professionals who get the most out of vibe coding are the ones who learn to describe what they want clearly and evaluate what they get honestly. That's a communication skill, not a technical one. Steering the conversation when things go sideways is part of the job.

Community members use vibe coding to build internal dashboards, automate reporting workflows, create client-facing tools, and replace spreadsheets they've been maintaining manually for years.

## Why this is different from "just using AI"

When you use Claude or ChatGPT to write an email or summarize a document, the output lives in the chat window. You copy it out, paste it somewhere, done.

Vibe coding is different because the output is software. It runs. Other people can use it. You can deploy it to the internet (meaning publish it so anyone can access it from a browser). The thing you made has a life outside the chat window.

That shift matters. It means non-technical professionals can now build tools they previously had to request from engineering teams, buy off the shelf (often imperfectly), or do without entirely.

One of our members, T Gaines, a non-technical professional who built his first client-facing app through MVP Club's building sessions, put it well: "Getting the app actually impacting the real world" is the turning point that makes vibe coding feel meaningful beyond hobby projects. That moment when someone else is using the thing you made changes how you think about what you're capable of.

## What tools do people use?

The most common setup in MVP Club is Claude Code, Anthropic's coding-focused AI. You can run it as a desktop app or through a terminal (a text-based command window, like a chat interface for your computer). The conversation works the same either way: you describe what you want, Claude asks clarifying questions, builds the files, and shows you the result.

Ryan Brodsky, one of our co-founders and a former software engineering instructor, describes the terminal version like this: "Once Claude Code is running, the terminal is just a chat window." He's right. Once the setup is done, the actual work is conversation.

A few other tools people use:

- Lovable: browser-based, good for beginners who want to see visual results quickly
- Windsurf: popular with people building more complex projects, with a clean interface for reviewing what Claude is doing
- Claude Code desktop app: a good middle ground if the terminal feels intimidating

The right tool depends on what you're building and how you like to work. Most people in our community start with Claude Code because it's what we use in our weekly building sessions and there's always someone around to help when you get stuck.

## The skill that actually matters

When I coach people through their first vibe coding project, the thing that trips them up almost never involves code. It involves description.

"Make it look nicer" is not actionable feedback for Claude. "The button colors feel too bold, and the section headings are harder to read than I'd like" gives Claude something to work with. The more specific you are about what you want and what you see, the faster you get there.

I noticed this most clearly while building Drawn of War, my browser game. I kept getting results that were technically correct but felt wrong. The moment I started describing what I wanted the player to experience instead of what I wanted the interface to look like, things clicked. The evaluation step is the human part. Claude builds fast. Your judgment about whether what it built is actually what you wanted is what steers the project.

A few things that help in practice:

- Start with a clear goal, not a list of features. "I want a tool that lets me log client check-ins without opening a spreadsheet" is better than "I want a database with a form."
- Review what it builds before asking for more. Vibe coding works in iterations. Approve what's working, fix what isn't, then move forward.
- Use Claude's clarifying questions. When Claude asks something back at you, it's usually because you left something ambiguous. Answer specifically.
- Keep a project notes file. Claude doesn't remember previous conversations. A short document summarizing what you've built and what's next keeps things coherent across sessions.

## Who should try this

The short answer: anyone who has ever thought "I wish there was a tool that did X" and assumed they couldn't build it.

You don't need a technical background. I built a browser game with no CS background. Lesley Richardson, a member of our community who initially wondered "I don't even know if I belong there" when she heard about GitHub (a platform where developers store and share code), started building her own web projects within weeks of her first vibe coding session. Carmella Thompson built a GitHub portfolio site entirely in Claude Code without ever looking at the folder structure or touching a terminal.

The barrier to starting is now lower than the barrier to learning Excel was fifteen years ago. What used to require years of training or a hefty engineering contract now requires a $20/month Claude subscription and an afternoon.

If you want a structured starting point, Ryan Brodsky's guide [Getting Started With Claude Code](/blog/getting-started-with-claude-code-non-developer-guide) walks you through setup in plain English, step by step. And the blog post [Vibe Coding: The New Skill of Work](/blog/you-only-use-10-of-your-computer-vibe-coding-and-the-new-skill-of-work) goes deeper into why this matters beyond just the productivity angle.

For more context on where to begin with AI tools generally, [AI in 10 Minutes: What You Actually Need to Know](/learn/ai-in-10-minutes) is a good companion read. And when you're ready to think about what to build first, [Your First Week with AI](/learn/first-week-with-ai) has a practical day-by-day structure you can adapt.

## The real reason this matters

Most professionals have been constrained by the software that exists. You work inside tools someone else built, with features someone else decided you needed, within workflows someone else designed. If you needed something different, you either adapted or requested it and waited.

Vibe coding changes that constraint. The question stops being "does a tool exist for this?" and starts being "what do I want to build?"

That's a genuinely new question for most people. It takes some getting used to. But once you've experienced the moment where something you described in a conversation becomes a working thing that other people can use, it's hard to go back to assuming you couldn't.

---

If you want to see what this looks like in practice alongside other professionals who are figuring it out in real time, that's exactly what happens in MVP Club's weekly building sessions. [Come join us.](/community)
