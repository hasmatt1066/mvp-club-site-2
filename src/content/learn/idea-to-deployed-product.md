---
title: "From Idea to Deployed Product: What the Build Looks Like"
description: "A practical walkthrough of building and shipping a real product with AI, from that first messy prompt to a working URL you can share."
author: "Ryan Brodsky"
date: "2026-04-03"
pillar: "Building with AI"
tags: ["building-with-ai", "vibe-coding", "build-app-without-coding-ai", "ai-for-non-developers", "claude-code", "how-to"]
difficulty: "intermediate"
readingTime: 12
---

I shipped five products in roughly two months. Not prototypes that live on my laptop. Real things: Geddit Together is in the App Store. Rendition Video takes files and returns narrated video. The MVP Club platform runs weekly sessions for real members. TasteMaker helps non-designers build style guides that AI agents can actually follow.

Before that, I had been trying to build things for twenty years.

The tools changed. But more than that, the build process changed. Here's the full sequence from "I have an idea" to "here's the URL," not the highlight reel version.

## Before You Write a Single Prompt

The biggest mistake I see people make is opening Claude Code and starting to describe their idea immediately. That works for maybe the first hour. Then you hit a wall because the thing you built doesn't match the thing you wanted, and you can't explain the gap because you never really defined what you wanted.

Spend 30 minutes writing a one-page product brief before you touch a code tool. This doesn't have to be formal. It's for you and for Claude. Cover four things:

1. **What does this do?** One sentence. Not two. If it takes two sentences, you don't know yet.
2. **Who uses it?** Name a specific person. "My manager, Sarah, who runs a team of 12 and hates logging into three tools to prep for her Monday meeting."
3. **What does success look like in the first version?** Name one thing someone can do with it that they couldn't do before.
4. **What is it NOT?** Write down the three features you're not building yet. This one saves you from scope creep in the first session.

When I built Rendition, the brief was basically: "You upload a slide deck or document. It outputs a narrated video. Version one does not support custom voices, animated transitions, or editing the narration." That last part was the whole game. Every time Claude started adding complexity, I had something written down to point to.

## Phase 1: Proof of Concept (Session 1)

Your goal in the first session is simple: get the core interaction working in the ugliest possible way. No styling. No user accounts. No error handling. Just the thing working once, on your machine, for you.

Open Claude Code. Paste your brief at the start. Then describe the minimum viable interaction.

For Rendition, that was: "Given a PDF file, output an MP4 with a text-to-speech narration of the slide content, one paragraph per slide, over a static image of that slide."

That's it. Nothing about design. Nothing about upload UX. Just: input, output, does it work.

Expect this to take 1-3 hours. Expect things to break. Expect Claude to make architectural decisions you don't fully understand yet. That's fine. Your job in session one is not to understand everything. Your job is to evaluate the output, give feedback, and steer.

> [NEEDS VERIFIED QUOTE: Matt on vibe coding evaluation]

The build is not where you stop. The evaluation is the work.

When session one ends, you should be able to run the thing locally and see it do the core thing. If you can't, session one isn't done.

## Phase 2: Context Management Between Sessions

The thing that trips up most builders early: Claude doesn't remember your last session. Every time you open a new chat, you're starting from zero.

The way to handle this is a Project Tracker file. I keep a markdown file in every project folder. It has three sections:

- **What this project does** (the one-sentence version)
- **What we built in the last session** (updated after every session)
- **What to do next** (the specific next step, not a wishlist)

At the start of every new Claude Code session, I drop the entire Project Tracker into the conversation. I say: "Here's where we are and what we're building. Please read this before we start." That's it. Two minutes of setup, and Claude has full context.

Without this, you will spend 20 minutes rebuilding context from scratch every session. I know because I did that for the first few weeks. Now I don't.

Use Claude Code's built-in memory feature (the `/memory` command) for anything that doesn't change. Use your Project Tracker for anything that evolves.

## Phase 3: Building Out the Real Thing

Once the core works, you can start building the actual product. This is where people get excited and also where scope creep destroys timelines. Keep going back to your brief. If a feature you're about to add wasn't on your success criteria, it goes in a "Future Features" section in your Project Tracker. Not in this session.

The build sequence I've settled on, in this order:

1. Core functionality (session 1, already done)
2. Error handling and edge cases (what happens when someone uploads the wrong file type)
3. A real user interface (styling, layout, basic UX)
4. User accounts, if you actually need them
5. Deployment

Notice deployment is last. A lot of people try to deploy early because it feels like the milestone. But deploying a half-built product means you're debugging environment issues while still building features, which is miserable. Get the thing working locally first. Deploy once.

For visual design, I give Claude explicit direction about aesthetic: "Minimal, similar to Linear, dark mode, system fonts only." Then I share a screenshot of a product I like for reference. Left to its own devices, Claude's default design aesthetic is... generous in its use of gradients. The more specific you are about what you want to look like, the less cleanup you'll do.

## Phase 4: Deployment

This is where a lot of builds stall. The local thing works. The deployment feels like a completely different beast, with environment variables (the private settings and API keys your app needs to run, stored securely on the server rather than in your code), build configurations, and infrastructure you've never touched.

Here's my actual deployment stack, as of early 2026:

- **Frontend/full-stack web apps:** Vercel. Free tier handles most things. Connected to GitHub (your code storage and version history), so every time you push an update, it deploys automatically.
- **Backend APIs or anything with a database:** Vercel functions for simple stuff, Supabase for anything needing a real database.
- **iOS apps:** Xcode (Apple's development tool, Mac only) + Apple Developer account ($99/year). This one actually requires more manual steps. Claude Code helps with most of it, but you need to go through Apple's review process, which takes days, not minutes.

For Vercel deployments, the sequence is almost always the same:

```
1. Set up a GitHub repo and connect it to Vercel
2. Add your environment variables in Vercel's dashboard
3. Push to main (send your code to GitHub, which triggers the deploy)
4. Watch it break, read the error log, fix with Claude
```

That last step is not a joke. I spent an embarrassing amount of time on one Rendition deployment where the error log said something about "module not found" and I kept telling Claude the wrong thing about which file was missing because I misread the path. Turns out I had the folder structure in my head wrong entirely. Twenty minutes of debugging a problem I had introduced by explaining it incorrectly.

First deployments almost always fail for some combination of: missing environment variable, dependency version mismatch (your app was built for Node 18, the server is running Node 20, and they handle certain things differently), or something that works fine locally but breaks in the cloud. Claude is very good at reading deployment error logs. Copy the error. Paste it. Ask for the fix. Usually takes 10 minutes, once you describe the problem accurately.

## The Moment It Gets Real

There's a specific moment in every build where it stops feeling like a project and starts feeling like a product. It happens the first time someone else uses it.

Not a friend you showed it to. Someone who found it on their own, tried it, and either got value from it or didn't.

For Geddit Together, that moment was seeing a user in a city I'd never been to schedule a dinner with their friends using the app. I hadn't told them to try it. They just found it.

That experience has nothing to do with code quality or deployment config. It's about whether the thing does something real for someone real.

The build process gets you to the door. What's on the other side is whether the thing matters.

I didn't think I'd get that far. I have several completed projects out there that I think can provide real-world value, and now it's actually the hard part: oh yeah, you have to find people and get them to use it.

That's where most builders are right now. The technical barrier to shipping has collapsed. The market discovery problem hasn't. Getting the product in front of real users is the new hard part.

[NEEDS COMMUNITY QUOTE: member on the gap between shipping and finding users]

## What the Build Process Actually Teaches You

Something shifts when you ship real products.

You become the decision-maker. Claude is the implementer. You define what you want. Claude figures out how. You evaluate what it built. You redirect. That's the relationship, and once you feel it working, you can't unfeel it.

It's the same skill as managing anyone. Be clear about goals, evaluate output honestly, know when to push back and when to accept something that's good enough.

The people who get stuck in the build process are usually stuck in one of two places: they can't articulate what they want clearly enough to get started, or they can't evaluate what Claude built well enough to know when to stop. Both of those are human skills, not technical ones. Both get better with practice.

## How Long Does This Actually Take?

Honest numbers from my own builds:

- Proof of concept (core interaction working locally): 2-6 hours
- Full first version with real UI: 1-3 weekends
- Deployed and shareable: add half a day for the first deployment
- iOS App Store submission: 1-2 weeks for review (you can't rush Apple)

These numbers assume you're building something reasonably contained, not a platform that integrates with 12 services. The more you scope down, the faster you ship. "Make the smallest testable thing, then test it" is real advice, not a platitude.

The other thing that makes a huge difference: using Claude Opus for planning conversations and Claude Sonnet for execution. If you're on the API (pay-per-use), Opus runs roughly $15 per million input tokens and $75 per million output tokens. Sonnet is about $3/$15. That sounds abstract until you realize a long planning session in Opus might cost $2-4, while the same conversation in Sonnet costs under a dollar. The math pushes you toward Sonnet for most sessions. But Opus catches architectural mistakes early, and catching a bad architectural choice in hour one costs you 20 minutes. Catching it in week three costs you a rebuild. Front-load the expensive thinking.

## Getting Started

If you have an idea and haven't started building yet, the single most useful thing you can do today is write the one-page brief described above. Not open Claude Code. Not read more about the tools. Write the brief.

Once you have that, read [Getting Started with Claude Code: The Non-Developer's Guide](/blog/getting-started-with-claude-code-non-developer-guide) if you haven't set up your environment yet. Then come back here and start Phase 1.

For a broader picture of how building fits into your overall AI practice, [The AI Learning Path](/learn/ai-learning-path) covers the sequence from first use to shipping real tools.

The build process rewards starting. Every hour you spend building is an hour you understand the process better, and that understanding compounds in ways that reading about it never does.

---

The professionals doing this at MVP Club come from backgrounds in operations, finance, marketing, and education. None of them started as developers. If you want to see what people like you are actually building, and get stuck with people who can help you get unstuck, that's what happens in our weekly sessions. [Come see what's being built.](/community)
