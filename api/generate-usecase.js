// MVP Club Use Case Generator API - Vercel Edge Function
// Generates personalized before/after transformation narratives

export const config = {
  runtime: 'edge',
};

// Rate limiting storage (shared with chat, resets on cold start)
const rateLimits = new Map();
const sessionCounts = new Map();

const RATE_LIMIT_PER_HOUR = 50;
const REQUESTS_PER_SESSION = 10; // Lower than chat since outputs are longer
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

// System prompt for generating transformation narratives
const SYSTEM_PROMPT = `You are an AI workflow transformation expert for MVP Club. Generate a detailed transformation story for the workflow described.

ABOUT MVP CLUB COACHING:
- We help individual contributors (ICs) scope their AI workflow ideas
- We show the art of the possible with AI tools
- We motivate practice and ground everything in valuable, motivating use cases
- You dream it, we help scope it and get you started
- YOU bring it across the finish line - we're coaches, not forward-deployed engineers
- We help ICs leverage AI tools to augment their work

OUTPUT FORMAT (JSON only, no other text):
{
  "title": "Short action-oriented title (2-4 words, e.g., 'Weekly Report Creation')",
  "currentState": {
    "description": "1-2 sentences describing the current painful workflow state",
    "painPoints": ["Specific pain point 1", "Specific pain point 2", "Specific pain point 3"]
  },
  "transformation": {
    "description": "How MVP Club helps: we scope [specific workflow], show what's possible with [their tools + AI], and get you started with [specific first step]. You bring it across the finish line."
  },
  "futureState": {
    "description": "1-2 sentences describing the AI-augmented workflow they'll build",
    "wins": ["Specific win that addresses pain point 1", "Specific win that addresses pain point 2", "Specific win that addresses pain point 3"]
  }
}

RULES:
- Title should be action-oriented and specific to their workflow
- Pain points should directly reflect what they described as frustrating
- Transformation description should follow the pattern: "We help you scope [X], show what's possible with [tools], and get you started with [specific first step]"
- Wins should directly address each pain point (mirror structure)
- If they mention specific tools (Google Docs, Slack, etc.), reference those in the transformation
- If they mention AI experience, acknowledge it in the transformation approach
- Focus on Human + AI collaboration, not replacement
- Never mention specific AI tools by name (no "ChatGPT", "Claude")
- Keep descriptions concise but specific
- Emphasize that THEY will build this with our coaching - we don't build it for them

EXAMPLE INPUT: "I spend 2 hours every Monday writing our team newsletter in Google Docs. I gather updates from Slack channels, format everything manually, and try to keep the tone consistent. I've tried ChatGPT but it doesn't match our team's voice."

EXAMPLE OUTPUT:
{
  "title": "Team Newsletter Creation",
  "currentState": {
    "description": "Every Monday you spend 2 hours manually gathering updates from Slack, formatting in Google Docs, and struggling to maintain consistent voice across sections.",
    "painPoints": ["2+ hours every Monday", "Manual gathering from Slack channels", "Inconsistent tone despite effort"]
  },
  "transformation": {
    "description": "We help you scope a Slack-to-newsletter workflow, show what's possible with AI and your Google Docs setup, and get you started with your team's voice guide template"
  },
  "futureState": {
    "description": "AI pulls Slack highlights, drafts in your team's voice, formats in Google Docs. You review, add personal touches, and send.",
    "wins": ["30 minutes instead of 2 hours", "Automatic Slack integration", "Consistent voice that matches your team"]
  }
}`;

// Input validation
function validateInput(workflow) {
  if (!workflow || typeof workflow !== 'string') {
    return { valid: false, error: 'Please describe a workflow' };
  }

  const trimmed = workflow.trim();

  if (trimmed.length < 20) {
    return { valid: false, error: 'Please provide more detail about your workflow (at least 20 characters)' };
  }

  if (trimmed.length > 500) {
    return { valid: false, error: 'Please keep your description under 500 characters' };
  }

  // Check for spam/injection patterns
  const spamPatterns = [
    /https?:\/\//i,
    /<script/i,
    /ignore.*previous/i,
    /system.*prompt/i,
    /you.*are.*now/i,
    /forget.*instructions/i,
    /disregard/i,
  ];

  for (const pattern of spamPatterns) {
    if (pattern.test(trimmed)) {
      return { valid: false, error: 'Please describe a genuine work workflow' };
    }
  }

  return { valid: true, workflow: trimmed };
}

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
  const ipKey = `gen_${ip}`;
  const ipData = rateLimits.get(ipKey) || { count: 0, timestamp: now };
  if (now - ipData.timestamp > RATE_LIMIT_WINDOW_MS) {
    ipData.count = 0;
    ipData.timestamp = now;
  }
  if (ipData.count >= RATE_LIMIT_PER_HOUR) {
    return { limited: true, reason: 'ip' };
  }

  // Check session rate limit
  const sessionKey = `gen_${sessionId}`;
  const sessionCount = sessionCounts.get(sessionKey) || 0;
  if (sessionCount >= REQUESTS_PER_SESSION) {
    return { limited: true, reason: 'session' };
  }

  // Update counts
  ipData.count++;
  rateLimits.set(ipKey, ipData);
  sessionCounts.set(sessionKey, sessionCount + 1);

  return { limited: false };
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
    const { workflow, category, sessionId } = body;

    // Validate session
    if (!sessionId) {
      return new Response(JSON.stringify({ error: 'Session ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate input
    const validation = validateInput(workflow);
    if (!validation.valid) {
      return new Response(JSON.stringify({
        error: 'validation_error',
        message: validation.error
      }), {
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
      return new Response(JSON.stringify({
        error: 'rate_limited',
        message: "We're getting lots of interest! Want to explore your specific workflow in more depth? Book a discovery call with us."
      }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not configured');
      return new Response(JSON.stringify({
        error: 'configuration_error',
        message: "Generation unavailable right now. Book a discovery call to explore your workflow transformation."
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Build the prompt
    const userPrompt = category
      ? `Workflow category: ${category}\n\nWorkflow description: ${validation.workflow}`
      : validation.workflow;

    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      return new Response(JSON.stringify({
        error: 'api_error',
        message: "Generation unavailable right now. Book a discovery call to explore your workflow transformation."
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const content = data.content?.[0]?.text;

    if (!content) {
      return new Response(JSON.stringify({
        error: 'empty_response',
        message: "Couldn't generate a transformation. Try describing your workflow differently."
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Parse the JSON response (strip markdown code blocks if present)
    try {
      let jsonContent = content.trim();
      // Remove markdown code blocks if present
      if (jsonContent.startsWith('```')) {
        jsonContent = jsonContent.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
      }
      const transformation = JSON.parse(jsonContent);

      // Validate structure - check for new format
      if (!transformation.title || !transformation.currentState || !transformation.futureState) {
        throw new Error('Invalid transformation structure');
      }

      // Ensure arrays exist with fallbacks
      const currentState = {
        description: transformation.currentState.description || '',
        painPoints: Array.isArray(transformation.currentState.painPoints)
          ? transformation.currentState.painPoints
          : [],
      };

      const futureState = {
        description: transformation.futureState.description || '',
        wins: Array.isArray(transformation.futureState.wins)
          ? transformation.futureState.wins
          : [],
      };

      return new Response(JSON.stringify({
        success: true,
        transformation: {
          title: transformation.title,
          currentState,
          transformation: {
            description: transformation.transformation?.description || 'We help you scope this workflow, show what\'s possible with AI, and get you started',
          },
          futureState,
          // No outcome - we don't show fake KPIs
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

    } catch (parseError) {
      console.error('Failed to parse transformation:', content);
      return new Response(JSON.stringify({
        error: 'parse_error',
        message: "Couldn't generate a transformation. Try describing your workflow differently."
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Generate API error:', error);
    return new Response(JSON.stringify({
      error: 'internal_error',
      message: "Something went wrong. Please try again."
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
