// MVP Club Chat API - Vercel Edge Function
// Proxies requests to Claude API with rate limiting and streaming

export const config = {
  runtime: 'edge',
};

// Rate limiting storage (resets on cold start - acceptable for MVP)
const rateLimits = new Map();
const sessionCounts = new Map();

const RATE_LIMIT_PER_HOUR = 50;
const MESSAGES_PER_SESSION = 20;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

// System prompt with MVP Club knowledge base
const SYSTEM_PROMPT = `You are the MVP Club AI assistant, a warm and knowledgeable peer expert who helps visitors understand how MVP Club can help them build genuine AI capabilities.

ABOUT MVP CLUB:
- We coach teams to bring an AI-first mindset to real work
- We believe the new unit of labor is Human + AI teams working together
- Our core insight: AI is a practiced skill, not a knowledge gap. You get good at difficult things through coaching, not training.
- Tagline: "Turn AI Access Into Genuine Capability"

METHODOLOGY - THE WORK LOOP:
1. Activate: Set intention, gather resources, set boundaries
2. Iterate: Rapid creation, evaluate, refine, repeat
3. Integrate: Review, organize, apply to real work

FOR ORGANIZATIONS (4-Week Productivity Sprint):
- Start with one team, prove value, then scale
- Embedded coaching, not point-in-time training
- Deliverables: 2-3 working AI workflows, role-specific playbooks, video walkthroughs
- Outcome: Measurable productivity gains in 4 weeks

FOR PRACTITIONERS (AI-First Community):
- Launching soon on Mighty Networks
- Structured courses, live events, peer support
- Learn alongside others navigating the same transformation
- Better to go through this moment together than alone

THE TEAM:
- Ryan Brodsky: Technical Implementation Manager - ensures AI workflows actually work in your environment
- Matt Hastings: AI Adoption Lead - strategic guidance on bringing AI-first mindset to organizations
- Jill Ozovek: AI Coach & Learning Designer - designs the learning experiences and coaching programs

CONVERSATION STYLE:
- Be warm, approachable, like a knowledgeable peer who has been through AI adoption
- Never be pushy or salesy
- Acknowledge challenges honestly - AI adoption is genuinely hard
- Lead with excitement, not fear
- Avoid corporate jargon and buzzwords

NATURAL QUALIFICATION:
Weave these questions naturally into conversation (one at a time, when relevant):
- "What brought you to MVP Club today?"
- "What are you hoping to accomplish with AI?"
- "Is this for yourself or are you exploring for a team?"
- "What's been your experience with AI tools so far?"

DO NOT:
- Make up specific case studies, testimonials, or ROI numbers
- Use fear-mongering language about AI replacing jobs
- Say words like: upskilling, reskilling, AI literacy, future-proof, unlock potential, master AI
- Be overly formal or use corporate-speak
- Pretend to know things you don't

WHEN TO SUGGEST NEXT STEPS:
- For enterprise/team inquiries: Suggest booking a discovery call at calendly.com/d/cybv-947-s8m/discovery-call
- For individuals: Mention the community launching soon, invite them to join the waitlist
- Don't push these until the conversation naturally leads there`;

// Clean up old rate limit entries
function cleanupRateLimits() {
  const now = Date.now();
  for (const [key, data] of rateLimits.entries()) {
    if (now - data.timestamp > RATE_LIMIT_WINDOW_MS) {
      rateLimits.delete(key);
    }
  }
}

// Check and update rate limits
function checkRateLimit(ip, sessionId) {
  cleanupRateLimits();
  const now = Date.now();

  // Check IP rate limit
  const ipData = rateLimits.get(ip) || { count: 0, timestamp: now };
  if (now - ipData.timestamp > RATE_LIMIT_WINDOW_MS) {
    ipData.count = 0;
    ipData.timestamp = now;
  }
  if (ipData.count >= RATE_LIMIT_PER_HOUR) {
    return { limited: true, reason: 'ip' };
  }

  // Check session rate limit
  const sessionCount = sessionCounts.get(sessionId) || 0;
  if (sessionCount >= MESSAGES_PER_SESSION) {
    return { limited: true, reason: 'session' };
  }

  // Update counts
  ipData.count++;
  rateLimits.set(ip, ipData);
  sessionCounts.set(sessionId, sessionCount + 1);

  return {
    limited: false,
    remaining: {
      ip: RATE_LIMIT_PER_HOUR - ipData.count,
      session: MESSAGES_PER_SESSION - sessionCount - 1
    }
  };
}

export default async function handler(request) {
  // Only allow POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { sessionId, messages } = body;

    if (!sessionId || !messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get client IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';

    // Check rate limits
    const rateCheck = checkRateLimit(ip, sessionId);
    if (rateCheck.limited) {
      const message = rateCheck.reason === 'session'
        ? "You've been asking great questions! To continue our conversation in more depth, you can book a free discovery call where we can dive deeper into your specific situation."
        : "We're getting a lot of interest right now! Feel free to book a discovery call directly, or try again in a bit.";

      return new Response(JSON.stringify({
        error: 'rate_limited',
        message,
        retryAfter: rateCheck.reason === 'ip' ? 3600 : null
      }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Reason': rateCheck.reason
        },
      });
    }

    // Get API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not configured');
      return new Response(JSON.stringify({
        error: 'configuration_error',
        message: "I'm having trouble connecting right now. Feel free to book a discovery call directly at calendly.com/d/cybv-947-s8m/discovery-call"
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Call Anthropic API with streaming
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages.map(m => ({
          role: m.role,
          content: m.content,
        })),
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      return new Response(JSON.stringify({
        error: 'api_error',
        message: "I'm having trouble connecting right now. Feel free to book a discovery call directly at calendly.com/d/cybv-947-s8m/discovery-call"
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Stream the response back to the client
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') continue;

                try {
                  const parsed = JSON.parse(data);
                  if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                    controller.enqueue(new TextEncoder().encode(parsed.delta.text));
                  }
                } catch (e) {
                  // Skip malformed JSON
                }
              }
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-RateLimit-Remaining-IP': String(rateCheck.remaining?.ip || 0),
        'X-RateLimit-Remaining-Session': String(rateCheck.remaining?.session || 0),
      },
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({
      error: 'internal_error',
      message: "I'm having trouble connecting right now. Feel free to book a discovery call directly at calendly.com/d/cybv-947-s8m/discovery-call"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
