---
title: "A Guide to Claude Skills: When to Use Them, and How to Build Your First One"
description: "Claude Skills turn a chat window into a set of teammates. A plain-English guide to the three types, when to build vs. install, and how to codify what you already do."
author: "Ryan Brodsky"
date: "2026-04-22"
pillar: "Building with AI"
tags: ["claude-skills", "skills", "building-with-ai", "workflows", "claude", "how-to"]
difficulty: "intermediate"
readingTime: 10
---

Recently, one of my Claude Skills produced a customer history document I usually took an hour to do. Even better, because I share these Skills with my team, I told them to use the skill to do it instead of asking me next time. It took a few improvements to get it perfect, but by the time I shared it with the team, it was already doing the job better than I'd done it, thanks to the combination of my experienced guidance and the AI's diligent, constant application of the rules.

That's when the word "agent" really took off for me. The skill performed actions that I otherwise would have been tied down doing, and even better, it doesn't even have to be ME doing the prompting. Fully hands-off operation of a process I taught it. For most of us in the professional world, that's the dream: not just AI helping us do the work alongside us, but AI actually DOING the work entirely at our command.

Skills are how you get there. This is a practical guide to what they are, when to use them, when to build your own versus install somebody else's, and the one mistake that cost me three weeks before I figured it out.

## What a Claude Skill actually is

A skill is a small folder Claude can pick up and use for a specific kind of job. At minimum it's a `SKILL.md` file with some instructions in plain English. Claude starts every session with an idea of what skills it possesses, and it can decide when to load up one of these skills when the task at hand seems to require it. You don't have to remember to activate it. Skills are available on every Claude plan, free tier included.

<div class="graphic-card">
  <h3 class="graphic-title">What's inside a skill</h3>
  <p class="graphic-subtitle">A skill is a folder. SKILL.md is the only required file. Everything else is optional context Claude pulls in when the task calls for it.</p>
  <div class="skill-tree">
    <div class="skill-tree-header">
      <span class="tree-icon folder"></span>
      <span>your-skill</span>
    </div>
    <div class="skill-tree-body">
      <div class="tree-row">
        <span class="tree-icon file"></span>
        <span class="tree-name">SKILL.md</span>
        <span class="tree-note">the instructions Claude reads first</span>
      </div>
      <div class="tree-row">
        <span class="tree-icon folder"></span>
        <span class="tree-name">reference-documents/</span>
        <span class="tree-note">context docs the skill can pull from</span>
      </div>
      <div class="tree-row">
        <span class="tree-icon folder"></span>
        <span class="tree-name">examples/</span>
        <span class="tree-note">sample outputs for the skill to mimic</span>
      </div>
      <div class="tree-row">
        <span class="tree-icon folder"></span>
        <span class="tree-name">scripts/</span>
        <span class="tree-note">bash or python the skill can invoke</span>
      </div>
    </div>
  </div>
</div>

The way they're different from custom instructions or projects: skills travel with you across every chat. A meeting report skill works in a project for Client A, in a separate chat outside projects, and in a new chat six weeks from now. Projects are containers. Skills are the crew that shows up inside any container. 

Skills can also include scripts to execute, such as connections to outside tools or reusable processes like compiling a PDF or applying a PowerPoint presentation template as the ultimate goal of a session.

"Skills are just pre-written prompts, with pre-loaded context documents, where you can say Claude, prompt yourself with this please, and it'll do it." That's the whole trick. The magic is in when to build one and what to put inside.

## The three types

Every skill I've built or installed falls into one of three buckets. The bucket determines whether you should build it yourself or grab someone else's.

<div class="graphic-card">
  <h3 class="graphic-title">The three types of Claude Skills</h3>
  <p class="graphic-subtitle">Different jobs, different decisions about whether to build or install.</p>
  <div class="phase-grid">
    <div class="phase-card">
      <span class="phase-number">1</span>
      <h4 class="phase-title">Utility</h4>
      <p class="phase-desc">Hooks into a tool you already use: Jira, Slack, Google Drive. "Pull the doc." "Create the ticket." Table stakes for anything more ambitious.</p>
    </div>
    <div class="phase-card">
      <span class="phase-number">2</span>
      <h4 class="phase-title">Workflow</h4>
      <p class="phase-desc">Takes a process you already do and makes it repeatable. Jill's meeting report. My client history generator. You do it once, describe how, and the skill runs the play.</p>
    </div>
    <div class="phase-card">
      <span class="phase-number">3</span>
      <h4 class="phase-title">Expert Framework</h4>
      <p class="phase-desc">Borrows somebody else's brain. SEO audits, positioning workshops, customer journey maps. You're not the expert; someone who is has packaged their practice.</p>
    </div>
  </div>
  <p class="graphic-caption">Workflow and Expert Framework skills both ride on the Utility layer underneath.</p>
</div>

Utility skills are the plumbing. They let Claude reach into the tools where your real work lives, and use those tools in a consistent and controlled way. By themselves they're useful but unmagical. Stacked underneath a workflow or expert framework skill, they're how the whole thing produces real output.

Workflow skills are where the action is. You take something you're already good at, something you do every week, and you codify how you do it. Jill built one that turns a client meeting transcript into a formatted report plus follow-up emails in her voice. I built one at DualEnroll that generates the history of our relationship with a client college, pulling from Slack threads and Jira tickets the way a long-tenured teammate would. It used to require months of institutional knowledge. Now anyone on the team runs the skill and gets a solid draft in minutes to bring them up to speed.

Building your own workflow skill doesn't have to be a difficult process. What I recommend: open a blank session with Claude, tell it your goal is to create a skill package to define your process for doing X, and then point it at as many great examples of that work as you already have. Ideally, you have some before-and-after examples to show the results of your process, if applicable. 

Then, have a conversation with Claude about the principles it's picking up from your work. It can usually figure out your rules based on common features of your examples, and plan the procedure for applying them with your guidance. It will then write the skill documents for you, and you can start iterating from there! Your first few times using a custom skill you built are mostly about improving the guidance and finding the edge cases, not necessarily about getting great results.

Expert framework skills are essentially workflow skills built by somebody else who wants to share their expertise and process with the world. They require a bit more judgment about adopting. Addy, a veteran PM in MVP Club, looked at a 20-skill product management bundle somebody had open-sourced and said, "I already have my own process for all of this. Why would I use it?" Which is fair. She's been doing the job for a decade. Then she asked herself:

> "Where am I weakest? What are the adjacent things that touch my work where I'm not the expert?"

For Addy that turned out to be persona creation, pitch decks, and front-end design. Things clients ask her for where she "always feels like she's kind of making it up." Those are where an expert framework skill can step in for you. I've never studied SEO in my life. When I installed a popular marketing skill bundle, the SEO piece provided a crash course in how to do something that I'd never really appreciated before. I applied its process, and I also learned from asking Claude what it was doing and why. You get the magic of an expert's guidance tuned to your specific situation, and when it works, it's amazing.

## Reject, Adapt, or Adopt

Addy's question is the decision rule. When you're evaluating somebody else's skill, you're not judging the skill in isolation. You're asking whether its domain is one where you need a brain you don't have.

Three possible answers.

- **Reject.** You're already the expert. You have a process. Borrowing somebody else's framework would make your work worse. This is how Addy felt about the PM skills, and how I felt about the QA and code review parts of the startup-focused skill bundle I installed. The skill would fight my instincts instead of extending them, and since I already built my own skills I was happy with, I rejected those. There are a lot of skill bundles out there now, but you don't have to install them all! You can just pick the ones that make sense and reject the rest.
- **Adapt.** The skill is in your wheelhouse but the approach is different enough to be interesting. Install it, run it a few times, keep the parts that fit. Tell Claude mid-session to skip the parts that don't. Now it's yours. You can always change the rules for the skill once you've installed it, and I would encourage you to do so.
- **Adopt.** You are not the expert and the skill represents real accumulated practice. Install it and use it as-is until you know enough to want to customize.

The same three-way decision flips when you're deciding whether to *build* a skill. You build a workflow skill for stuff you already do well and want to repeat without thinking about it every time. You build an expert framework skill when you want to share your practice with teammates who don't have it yet. There's more handholding and explicit guidance in an expert framework skill when compared to a solitaire skill built just for yourself. You don't build skills for tasks you only do once, and you don't build skills to learn a new domain. Skills codify competence you already have. The learning still has to happen on your own, through iteration.

## How to build your first skill

The fastest path I know is also the most obvious one: do the task with Claude a few times in a regular session, then ask Claude to turn those conversations into a skill.

Jill describes it this way: "Go through it in real life, in a Claude chat, and then be like, cool, we did that, Claude now, let's turn that into a skill draft. Then I review it and tweak it, and then I add it in."

That works when you already do the task semi-manually. If you've never done it explicitly, if it's a thing you just *know how to do* without ever having written it down, there's a second path that works beautifully: codify from examples.

I was talking with a freelance web designer recently. She's produced plenty of projects for clients, and hasn't started using skills yet. I suggested: open a fresh Claude session. Upload the five best projects. Have a long conversation with Claude about what makes each one work. What choices did you make about typography, layout, color? What problem was each one solving? What would you have done differently? Claude interviews you about your own work.

By the end of the conversation, Claude has enough to draft a design skill that's specific to her guidelines. That skill can do two jobs:

- Generate a starting point for the next client project in her style
- Audit an existing project against the rubric Claude just derived from her best work

The skill becomes both a creation tool and a review tool. And the inputs for it were things she'd already built. She didn't have to remember why her work was good. She just had to talk about it while Claude listened and codified.

You can do this with anything where "you know it when you see it" is part of how you make decisions. Past proposals. Past emails that got replies. Past reports that landed with your VP. Paste them in, have the conversation, say "turn this into a skill."

Then, work with Claude a few times with the intent of improving the instructions. Put the skill to work, make the corrections with Claude, then ask, "how can we improve the skill instructions to avoid having to make similar corrections next time?"

## Breaking Up Skills

Often, a big task is actually composed of smaller parts. The more you can split up the big process into discrete sub-skills, the more you'll be able to provide the precise level of detail appropriate to each stage of the process. Rather than trying to jam all 5 steps into a mega skill file that Claude will forget halfway through the conversation, have an orchestrator skill that manages the flow of the entire process, combined with specialist skills for each step of the process. That way you can fine-tune each particular step until it's perfect, without creating a bloated mega skill that loses sight of the specifics.

## What not to skill

A few patterns that waste your time.

- **One-off tasks.** If you're going to do the thing exactly once, just do it in a chat. Skills pay for themselves in repetition.
- **Things you're trying to learn.** Skills codify competence you already have. If you don't yet know what "good" looks like in a domain, you're going to encode confusion, not expertise. Do the work long enough to have taste, then skill it.
- **Personality customization.** How Claude speaks to you personally goes in user preferences or custom instructions. Skills are for specific tasks, not for tone settings across your whole Claude experience.

If you skip those, the rest is open field.

## Where to practice this

Most of our community at [MVP Club](/community) is at some stage of this right now. Some people are still trying to decide whether to build a skill at all. Some are in the middle of their first one, unsure whether they're over-engineering it. (They probably are. First skills are always too granular. One skill with branching logic usually beats five separate ones.) Some have shipped real skills that are changing how their companies distribute work.

If you want to work on yours alongside other professionals figuring this out in real time, that's exactly what the weekly sessions are for. Show up, bring a task from your actual job, we'll figure out together what's worth skilling.

The first time one of your skills produces a draft that's good enough to ship with only light edits, you'll feel it land. You'll also realize the actual job from here on is deciding which of the things you do every week deserves a skill of its own.
