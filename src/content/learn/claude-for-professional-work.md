---
title: "How to Use Claude for Professional Work"
description: "A practical guide to Claude Projects, Artifacts, system prompts, and file uploads for professionals. Go beyond basic chat and build real workflows."
author: "MVP Club"
date: "2026-04-02"
pillar: "AI Tools and Productivity"
tags: ["claude", "claude-for-professional-work", "ai-tools", "productivity", "how-to", "projects", "system-prompts"]
difficulty: "beginner"
readingTime: 12
---

Sarah, a marketing manager at a mid-size SaaS company, spent 45 minutes every Friday writing a status update that her director read in 90 seconds. Then she built a Claude Project around it. Now the draft takes her three minutes. The 45 minutes goes back to actual work. That shift is what this guide is about.

## What Claude actually is (and why it matters for work)

Claude is Anthropic's AI. For professional use, the $20/month Claude Pro subscription is where you want to start. The free version is capable, but Pro gives you longer conversations, priority access, and most importantly: full access to Projects.

If you are comparing options, the [ChatGPT vs. Claude comparison](/learn/chatgpt-at-work) covers where each tool tends to be stronger. The short version: for professional writing, reasoning, and extended work sessions, many MVP Club members land on Claude as their primary tool (though this varies by role and workflow).

Claude's interface has four parts that matter for professional work. The standard **Chat** window is where everything starts, back-and-forth conversation that resets each session. **Projects** are persistent workspaces where Claude holds context across multiple conversations, so you're not re-briefing it every time. **Artifacts** are Claude's live-preview output format for documents, tables, and interactive content. And **file uploads** let you drop in PDFs, Word docs, spreadsheets, and images directly into any conversation so Claude works from your actual material.

Each of these changes what Claude can do for you. A lot.

## Start with Projects: your persistent work context

The biggest workflow shift for professionals comes from Projects. A Project is a persistent workspace. You set it up once, add your context documents, and every conversation inside that Project starts with Claude already knowing your situation.

Think of it this way: instead of briefing a new assistant every morning, you brief them once and they carry that knowledge into every meeting.

### Setting up your first Project

Go to claude.ai, click on "New Project" in the left sidebar, and name it something specific. "Work" is too broad. "Client Communications," "Q2 Marketing Planning," or "Performance Review Prep" are specific enough to be useful.

Once you're inside a Project, you'll see two things you don't have in a regular chat: a Project Knowledge section and a custom instructions field. Both matter a lot.

**Project Knowledge** is where you upload the background documents Claude should know. Good candidates:
- Your team's style guide
- A summary of your role and responsibilities
- The context doc for a specific client or project
- A list of stakeholders and what they care about
- Previous outputs you want Claude to match in tone and format

**Custom Instructions** is your system prompt. More on that in a moment.

> "When you make a new Project, you could point it at an existing folder. So it's not just stuck within the Claude directory." (Matt Hastings, MVP Club session on Claude CoWork)

Once a Project is set up, every conversation inside it inherits that knowledge. You can run ten separate conversations on different aspects of the same client engagement, and Claude maintains consistent context across all of them.

### One Project per domain of work

The most useful pattern is one Project per distinct context. Some examples from how MVP Club members organize their work:

- One Project for a specific client (with their background, preferences, and past deliverables uploaded)
- One Project for a recurring quarterly process (performance reviews, budget planning, all-hands prep)
- One Project for job search materials (your resume, the types of roles you're targeting, your notes on what to emphasize)
- One Project for content creation (your brand voice guide, approved examples, the editorial calendar)

You are not limited to one Project. Use as many as you have distinct contexts.

## System prompts: giving Claude a standing brief

Inside any Project, you can write custom instructions. This is your system prompt: the standing brief that Claude reads before every single conversation in that Project.

A good system prompt is not long. It is clear. You are telling Claude:

1. Who you are and what context matters
2. How you want it to behave and respond
3. What to avoid
4. Any format or tone preferences

Here's a concrete example for a marketing manager running a client Project:

> "You are assisting a B2B marketing manager at a 50-person SaaS company. Our primary client for this project is a financial services firm. They prefer formal language, no contractions, and bullet-point summaries after any analysis. Always ask me to confirm the audience before drafting anything. Our tone internally is direct and casual. Our tone externally is professional and precise. Do not use the phrases 'industry-leading' or 'innovative' (our client finds these meaningless)."

That is 83 words. It will improve every output in that Project without you having to repeat any of it.

Files uploaded to a Project are cached in Claude's context, which means repeated references within the same Project are more efficient than re-uploading files across separate conversations. [NEEDS CITATION: Verify current behavior re: file caching and usage limit implications via Anthropic documentation.] The practical takeaway still holds: build the Project once, use it repeatedly.

[NEEDS COMMUNITY QUOTE: A member sharing what they included in their first system prompt and how it changed their workflow. Specific role and use case preferred.]

## File uploads: give Claude your actual material

Claude can read files. This is one of its most practically useful features for professional work, and one of the most underused.

You can upload:
- PDF documents (contracts, reports, research)
- Word and Google Docs (paste from Google Docs or export as docx)
- Excel spreadsheets (Claude reads the data, not formulas)
- PowerPoint decks (Claude reads the content of each slide)
- Images, including screenshots of dashboards, whiteboards, and diagrams
- Plain text files, CSVs, code files

The most direct professional use: drop in a document and ask Claude to work from it.

**Practical examples:**

Upload your last three meeting notes and ask: "Summarize the outstanding decisions from these meetings. Format as a numbered action item list with owner and due date where mentioned."

Upload a competitor's product announcement PDF and ask: "Identify the three claims they're making that we could counter with our positioning. Draft a talking points doc."

Upload a 50-page research report and ask: "I need to present the key findings to a non-technical leadership team. Give me five bullets and a one-paragraph summary."

Upload a job description and ask: "Compare this role to my resume above. What are the strongest alignment points? What gaps should I address in my cover letter?"

In each case, Claude is working with your actual material, not generating from nothing. The output is specific because the input is specific.

> "It's so luxurious just to know you're never gonna run out, just to keep going." (MVP Club member on paying for Claude Pro)

That quote was about the flow state of working without hitting limits. The same applies to file uploads: when you are not manually summarizing a 40-page document, you are spending your time on the decision that required the summary.

## Artifacts: Claude's live output format

When Claude produces longer, structured content, it sometimes offers it as an Artifact: a separate pane that shows you a preview of the output. Artifacts are especially useful for:

- Documents you want to edit and refine (Claude builds on the Artifact, not just the chat)
- Interactive content like tables, calculators, or simple data tools
- Code, HTML, or structured outputs

For professional work, the most immediately useful Artifact types are:

**Markdown documents.** Ask Claude to draft a proposal, a stakeholder brief, or a project plan. When it comes back as an Artifact, you can ask Claude to revise specific sections without rewriting everything.

**Tables.** Ask Claude to compare options, summarize research, or organize data into a table format. The Artifact is cleanly formatted and easy to paste into a presentation or email.

**Simple interactive tools.** Ask Claude to build a scoring rubric that lets you rate options, or a checklist formatted as a working HTML page. You do not need to know how to code. You need to describe what you want.

To request an Artifact explicitly, you can just say: "Give me this as a formatted document I can copy." Claude understands the request.

## Real professional use cases: what this looks like in practice

Here are five workflow patterns that use Projects, file uploads, and Artifacts together.

### 1. The weekly status update machine

Set up a Project called "Weekly Reporting" with a custom instruction that includes your audience's context (who they are, what they care about, the format they prefer). Every week, paste your notes into a new conversation inside that Project and ask for the status update. Claude knows the audience, knows the format, knows your context. For many people, the first draft drops from 20-30 minutes to a few minutes of review and edits. [NEEDS VERIFICATION: Time savings will vary; collect real member examples before citing specific numbers.]

### 2. The client communication filter

Upload a client's last five emails to a Project and add a system prompt: "Match this client's preferred communication style: [describe]. They respond well to direct summaries followed by a clear ask." Now every draft Claude produces for that client matches their register.

### 3. The document synthesis tool

Upload two or three competing documents (two proposals, three research reports, four policy drafts) and ask Claude to identify the areas of agreement, the areas of disagreement, and the gaps none of them address. This is a task that can take hours manually and, for many people, a fraction of that time with Claude. [NEEDS VERIFICATION: Collect real member examples before citing specific time frames.]

### 4. The performance review accelerator

Upload the job description for your direct reports and your notes from the past quarter. Ask Claude to draft evaluation narratives for each competency area. You review, edit, and add the specific examples. You spend your time on judgment and nuance, not on writing from scratch.

### 5. The presentation prep partner

Upload the slide deck for an upcoming presentation. Ask Claude to anticipate the three questions most likely to come from each audience type in the room. Prepare answers to each. Walk into the room ready.

[NEEDS REAL EXAMPLE: A specific project where an MVP Club member applied one of these patterns, with the actual task and the time savings observed.]

## Common mistakes when starting with Claude for work

**Using the general chat for everything.** Regular chat conversations reset each time. Projects persist. If you are doing any kind of repeated work, you should be using Projects.

**Writing vague system prompts.** "Help me with work" is not a system prompt. It is a conversation starter. Your system prompt should tell Claude what it would take a new hire a week to learn about your context.

**Uploading files and not directing Claude.** "Here's a document" by itself gives Claude nothing to do. Upload the document and follow immediately with a specific instruction: "Given this, draft X for Y audience."

**Expecting a perfect first output.** The first response is a starting point. Ask for revisions on the same conversation thread. Claude holds the context and builds on what it produced, which is faster than starting over.

**Treating Claude like a search engine.** "What is the best approach to X?" gets you a general answer. "Here is my situation, my constraints, and my audience. What is the best approach for me specifically?" gets you something useful. See the [guide on getting better AI results](/learn/better-ai-results) for more on building context into your requests.

## The Claude workflow that actually sticks

The pattern that works for most professionals: start one Project, add the context that matters for your most common repeated task, write a two-paragraph system prompt, and run one real work task through it. See what comes back.

The goal for the first week is not to figure out everything Claude can do. The goal is to find one task where Claude saves you meaningful time and do it again tomorrow. That repetition is what builds the habit. The habit is what changes your output.

Matt Hastings describes this in coaching sessions: "Anything you do more than once, write down how to do it, and then tell Claude, hey, here's how I want you to do it. Just go." That is what a skill or a Project instruction actually is: the written-down version of how you want a capable colleague to handle something, so you don't have to explain it every time.

For more on building AI into your daily work, [the AI daily workflow guide](/learn/ai-daily-workflow) covers the 30-minute habit that makes this sustainable. For the underlying skill of giving Claude better direction on any task, [better AI results](/learn/better-ai-results) goes deeper on context engineering.

## Practicing this alongside peers

The professionals who get the most out of Claude are not working alone. They are sharing what works, watching how others set up their Projects, and stealing each other's system prompts. That exchange is what happens in MVP Club's weekly sessions. If you want to see how people in your field are setting up their Claude workflows right now, the [MVP Club community](/community) is where that conversation is happening.
