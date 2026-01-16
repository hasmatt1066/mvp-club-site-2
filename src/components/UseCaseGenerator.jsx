import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import logoImage from '../mvp-club-logo.jpeg';
import TransformationCard from './use-cases/TransformationCard';

// Generate session ID for rate limiting
const getSessionId = () => {
  if (typeof window === 'undefined') return 'ssr';
  let sessionId = sessionStorage.getItem('mvpclub_generator_session');
  if (!sessionId) {
    sessionId = 'gen_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    sessionStorage.setItem('mvpclub_generator_session', sessionId);
  }
  return sessionId;
};

// Input validation
const validateInput = (text) => {
  if (!text || text.trim().length < 20) {
    return { valid: false, error: 'Please provide more detail about your workflow (at least 20 characters)' };
  }
  if (text.length > 500) {
    return { valid: false, error: 'Please keep your description under 500 characters' };
  }

  const spamPatterns = [
    /https?:\/\//i,
    /<script/i,
    /ignore.*previous/i,
    /system.*prompt/i,
  ];

  for (const pattern of spamPatterns) {
    if (pattern.test(text)) {
      return { valid: false, error: 'Please describe a genuine work workflow' };
    }
  }

  return { valid: true };
};

// Format API response for TransformationCard
const formatOutputForCard = (apiOutput) => ({
  id: 'generated',
  title: apiOutput.title,
  currentState: {
    headline: 'The Old Way',
    description: apiOutput.currentState.description,
    icon: 'FileText',
    painPoints: apiOutput.currentState.painPoints,
  },
  transformation: {
    headline: 'MVP Club Coaching',
    description: apiOutput.transformation.description,
    icon: 'Sparkles',
  },
  futureState: {
    headline: 'The New Way',
    description: apiOutput.futureState.description,
    icon: 'Zap',
    wins: apiOutput.futureState.wins,
  },
  outcome: apiOutput.outcome,
});

// Animated section wrapper
const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const UseCaseGenerator = () => {
  const [workflow, setWorkflow] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [output, setOutput] = useState(null);

  const categories = [
    { value: '', label: 'Select a category (optional)' },
    { value: 'content', label: 'Content Creation' },
    { value: 'research', label: 'Research & Analysis' },
    { value: 'communication', label: 'Communication' },
    { value: 'data', label: 'Data Processing' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validation = validateInput(workflow);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setIsLoading(true);
    setOutput(null);

    try {
      const response = await fetch('/api/generate-usecase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflow: workflow.trim(),
          category: category || undefined,
          sessionId: getSessionId(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setError(data.message || "We're getting lots of interest! Try again later or book a discovery call.");
        } else {
          setError(data.message || 'Something went wrong. Please try again.');
        }
        return;
      }

      if (data.success && data.transformation) {
        setOutput(data.transformation);
      } else {
        setError('Could not generate transformation. Try describing your workflow differently.');
      }
    } catch (err) {
      console.error('Generator error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setWorkflow('');
    setCategory('');
    setOutput(null);
    setError('');
  };

  return (
    <section
      id="try-it"
      className="py-24"
      style={{ backgroundColor: 'var(--color-primary)' }}
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <p
              className="text-lg font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--color-accent-lifted)' }}
            >
              Try It Yourself
            </p>
            <h2 className="font-display text-3xl md:text-4xl mb-6 text-white">
              See How Your Workflow Could Transform
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
              Describe any repetitive task or workflow, and see what's possible with AI coaching.
            </p>
          </div>
        </AnimatedSection>

        {/* Input Form */}
        <AnimatedSection delay={100}>
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-2xl">
              {/* Textarea with Guided Prompts */}
              <div className="mb-4">
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Describe your workflow
                </label>
                <div className="mb-3 text-white/60 text-sm">
                  <p className="mb-2">Help us understand your workflow by including:</p>
                  <ul className="list-disc list-inside text-white/50 text-xs space-y-1 ml-1">
                    <li>What task are you trying to accomplish?</li>
                    <li>What tools do you currently use? (Google Docs, Slack, Excel, etc.)</li>
                    <li>How often do you do this? (daily, weekly, per project)</li>
                    <li>What's most frustrating about it?</li>
                    <li>Have you tried AI tools? Which ones, and what happened?</li>
                  </ul>
                </div>
                <textarea
                  value={workflow}
                  onChange={(e) => setWorkflow(e.target.value)}
                  placeholder="e.g., I spend 2 hours every Monday writing our team newsletter in Google Docs. I gather updates from Slack channels, format everything manually, and try to keep the tone consistent. I've tried ChatGPT but it doesn't match our team's voice and I end up rewriting most of it anyway..."
                  rows={5}
                  maxLength={500}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl resize-none outline-none transition-all duration-200 text-sm"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    color: 'var(--color-primary)',
                    border: '2px solid transparent',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-accent)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'transparent';
                  }}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-white/50 text-xs">
                    The more detail you provide, the more specific your transformation will be
                  </span>
                  <span className={`text-xs ${workflow.length > 450 ? 'text-amber-400' : 'text-white/50'}`}>
                    {workflow.length}/500
                  </span>
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="mb-6">
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Category (optional)
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={isLoading}
                  className="w-full md:w-64 px-4 py-3 rounded-xl outline-none transition-all duration-200 text-sm"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    color: 'var(--color-primary)',
                    border: '2px solid transparent',
                  }}
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 flex items-start gap-2">
                  <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || workflow.trim().length < 20}
                className="w-full md:w-auto px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'white',
                }}
              >
                {isLoading ? (
                  <>
                    <img
                      src={logoImage}
                      alt=""
                      className="w-5 h-5 rounded-full animate-pulse-avatar"
                    />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Transform this workflow
                  </>
                )}
              </button>
            </div>
          </form>
        </AnimatedSection>
      </div>

      {/* Output Display */}
      {output && (
        <AnimatedSection delay={0}>
          <div className="max-w-7xl mx-auto px-6 mb-8">
            <h3 className="text-white font-display text-xl mb-6 text-center">
              Your Custom Transformation
            </h3>
            <TransformationCard useCase={formatOutputForCard(output)} />

              {/* CTA */}
              <div
                className="mt-6 p-6 rounded-2xl text-center max-w-4xl mx-auto"
                style={{ backgroundColor: 'white', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}
              >
                <p className="text-gray-600 mb-4">
                  Want to make this transformation real?
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://calendly.com/d/cybv-947-s8m/discovery-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 inline-flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'white',
                    }}
                  >
                    Book a Discovery Call
                    <ArrowRight size={16} />
                  </a>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-gray-100"
                    style={{
                      border: '2px solid var(--color-primary-tint)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    Try Another Workflow
                  </button>
                </div>
              </div>
          </div>
        </AnimatedSection>
      )}

      {/* Bottom Text */}
      {!output && (
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection delay={200}>
            <p className="text-center text-white/50 text-sm">
              Your input helps us understand what transformations matter most to you.
            </p>
          </AnimatedSection>
        </div>
      )}
    </section>
  );
};

export default UseCaseGenerator;
