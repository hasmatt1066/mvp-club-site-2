---
title: "Getting Started With Claude Code: The Non-Developer's Guide (It's Just a Chat Window)"
description: "The last tech lesson you'll ever need. Once you're set up with Claude Code, you can just ask Claude how to do everything else."
author: "Ryan Brodsky"
date: "2026-01-29"
pillar: "Practice > Training"
---

I spent years teaching programming. Loops, functions, debugging, version control, full stack development, the whole deal. And now I'm here to tell you, this could be my first and last lesson for any new software builder.

Not because I'm retiring. Because once you're set up with Claude Code in your terminal, you can just ask Claude how to do everything else. Every question you have, every error you hit, every "what do I do next" moment, Claude's right there. Claude is never on lunch break or distracted, either! Just get comfortable giving it the situation and information it needs, and it will teach you the rest. It's the only tool you need to know about to start building today.

So let's get you set up. This is the final tech hurdle. After this, you're in.

## The terminal barrier

I've taught a lot of demos. And I've noticed something: the moment I open a terminal window, some people quietly check out. They don't say anything. They just stop following along. The black box with the blinking cursor feels like it's not for them.

Here's what I want you to know: once you have Claude Code running, the terminal is just a chat window.

Seriously. You type something, it responds. That's it. Once Claude Code is running, you're literally just having a conversation. You type "hey Claude, can you help me build a simple website?" and Claude types back and starts building it.

The only difference between the terminal and any other chat interface is the font.

## Why the terminal instead of Claude Desktop?

You might know that Claude Desktop now has Claude Code built in. That's true, and it works. But in longer conversations, the performance suffers. It gets sluggish. If you're going to use Claude Desktop's version, you'll want to start fresh conversations more frequently, and if you're on Windows there's not much of a choice.

The terminal version is more stable for extended sessions. And since vibe coding often means long, iterative conversations with Claude, stability matters.

So let's set you up with the real thing.

## What you'll need

1.  **A Mac** (macOS 13.0 or newer)
2.  **A Claude subscription**

If you don't have a Claude subscription yet, head to [Anthropic's console](https://console.anthropic.com/) to set that up.

Windows users: the terminal setup requires some extra steps (Windows Subsystem for Linux) that get complicated fast. I'd recommend using the Claude Desktop version of Claude Code instead, but our co-founder Matt has been running on Windows just fine, and would be happy to help you through the process.

## Step 1: Install Claude Code

Open your terminal. (Don't know how? Hit `Cmd + Space`, type "Terminal", press Enter.)

Now copy and paste this command:

```
curl -fsSL https://claude.ai/install.sh | bash
```

Press Enter. That's it. Claude Code is now installed.

If you want to verify it worked, type:

```
claude doctor
```

This runs a quick check and tells you everything's good. If anything didn't work, paste the error into a claude desktop or claude web window and tell it, "Hey Claude, I'm installing Claude Code and this happened. What next?"

## Step 2: Set up "Open Terminal at Folder" (game changer)

Here's a trick that's going to save you so much frustration. Instead of learning terminal navigation commands, let's set up a shortcut so you can right-click any folder in Finder and open a terminal right there.

1.  Open **System Settings**
2.  Go to **Keyboard** → **Keyboard Shortcuts** → **Services**
3.  Under **Files and Folders**, find **"New Terminal at Folder"**
4.  Check the box to enable it

Now you can right-click any folder in Finder, go to **Services**, and click **"New Terminal at Folder."** The terminal opens, already in that folder. No `cd` commands, no path confusion, no headaches.

This one shortcut eliminates 90% of the "I'm lost in my computer" problems. I've seen too many new devs doing things in the wrong folder, and this will eliminate that guesswork.

## Step 3: Create your project folder

Go to your Documents folder (or wherever you want to keep projects). Create a new folder. Call it whatever you want. "my-first-project" is fine, ideally don't use spaces in the name, but Claude will get over it if you do.

Right-click that folder. Go to **"New Terminal at Folder."**

A terminal window opens. You're in your project folder. See how the text shows the folder name? That's how you know you're in the right place.

## Step 4: Start Claude Code

In that terminal window, type:

```
claude
```

Press Enter.

That's it. You're now talking to Claude.

## Step 5: Let Claude set you up

One thing Claude Code loves is a file called `CLAUDE.md` at the root of your project. This file tells Claude what your project is about, what you're trying to build, and any preferences you have.

Don't write it yourself. Ask Claude to do it:

> "Hey Claude, can you create a CLAUDE.md file for this project? I'm going to be building a simple React app to learn how this all works."

Claude will create the file. It might ask you a few questions about your goals. Answer them. Now your project has context that persists across conversations. If you build a bigger project, you can follow our PRD-creating system to thoroughly map out your project into a comprehensive features document before starting this, and just point Claude Code at that file to start building.

## Step 6: Build something real

Here's where the magic happens. You're sitting in an empty folder. There's nothing here. And you're about to create a working web application by having a conversation.

Type something like:

> "Claude, I want to build a simple React app. Can you set everything up, install what's needed, and get a development server running so I can see it in my browser?"

Claude will:

-   Create the project files
-   Install React and all the dependencies
-   Start a development server
-   Open your browser to show you the running app

It'll ask for permission along the way. "Can I run this command?" and you'll say yes. That's the collaboration. You're steering, Claude's building.

Within a few minutes, you'll have a working React app running on your computer. You didn't need to know npm. You didn't need to know what a package.json is. You just asked Claude and Claude figured it out.

## The golden rule: Just ask Claude

This is the most important thing I can tell you.

When something goes wrong—and things will go wrong—your first instinct might be to Google the error, read Stack Overflow, watch a YouTube tutorial. That's the old way.

The new way: screenshot the error (CMD+Shift+4 and drag over the area, then grab it into the claude window is what I do). Paste it into Claude. Ask "what happened and how do I fix it?"

Claude can see the screenshot. Claude knows your project. Claude will tell you exactly what went wrong and exactly how to fix it. Often it'll just fix it for you.

This is why I call this my first and last tech lesson. I'm not teaching you a skill you'll need to practice and remember. I'm teaching you how to have a conversation with someone who knows everything about computers. From here on out, just ask Claude.

Screenshot. Ask Claude. Repeat.

## A note on Claude Desktop's Claude Code

I mentioned earlier that Claude Desktop has Claude Code built in now. If the terminal still feels intimidating, you can use that. It's the same Claude, same capabilities.

Just know that in longer sessions, it can slow down. If you notice things getting sluggish, start a new conversation. The terminal version handles long sessions better, which is why I recommend it.

But either way, you're in. You're building with Claude.

## You're ready

That's it. You're set up. The terminal isn't some mystical land for developers only. It's just where you talk to Claude.

From here, everything else is just asking Claude. Want to add a feature? Ask Claude. Want to deploy your app to the internet? Ask Claude. Want to understand what some code does? Ask Claude. All the complex terminal commands developers memorized over a career of using them are just in Claude's knowledge, and Claude will ask you before executing them. No need for you to type them, ever.

This is vibe coding. You describe what you want, Claude builds it, you iterate together. The barriers are gone.

* * *

**Come join us in [MVP Club](https://mvp-club.mn.co/).** We've got Tool Mondays where we dig into tools like Claude Code and show you what's possible. We've got Demo Wednesdays where members show off what they've built. And we've got a community of people who were exactly where you are right now—staring at a terminal for the first time—who are now building things they never imagined.

You don't have to figure this out alone. Come through.
