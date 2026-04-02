import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft, BarChart3, CheckCircle2, FileText, Users, Brain, Target, Compass, Handshake } from 'lucide-react';
import AnimatedSection from '../components/shared/AnimatedSection';

const trackAssessEvent = (eventName, params = {}) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      event_category: 'assessment',
      ...params,
    });
  }
};

const QUESTIONS = [
  {
    id: 'documentation',
    icon: FileText,
    dimension: 'Documentation',
    question: "How much of your team's core work is documented in writing?",
    description: "Think SOPs, runbooks, playbooks, how-to guides. Not just \"we have a wiki\" but documents someone could actually follow.",
    options: [
      "None of it. It's all in people's heads.",
      "A few things are written down, but they're outdated or incomplete.",
      "Most processes are documented, though some details are missing.",
      "Our key processes are well-documented and current.",
    ],
    insight: "AI can only work with what's written down. Everything your team knows but hasn't documented is invisible to AI.",
  },
  {
    id: 'clarity',
    icon: Users,
    dimension: 'Process Clarity',
    question: "If a new hire started tomorrow, could they follow your team's processes from documentation alone?",
    options: [
      "No way. They'd need weeks of shadowing and asking around.",
      "For some tasks, but they'd still need a lot of hand-holding.",
      "For most tasks, with occasional questions.",
      "Yes. Our docs are detailed enough to onboard someone independently.",
    ],
    insight: "If a human can't follow your documentation, AI definitely can't. The new hire test is the simplest AI readiness check there is.",
  },
  {
    id: 'decisions',
    icon: Compass,
    dimension: 'Decision Criteria',
    question: "When your processes say \"review\" or \"use your judgment,\" is what that actually means written down anywhere?",
    description: "Think about the unwritten rules: what \"good\" looks like, when to escalate, what exceptions exist.",
    options: [
      "Never. We rely on experience and intuition.",
      "Rarely. A few things have explicit criteria.",
      "Sometimes. Our more important decisions have clear guidelines.",
      "Usually. We've documented our decision criteria and edge cases.",
    ],
    insight: "\"Use good judgment\" is the single most common place AI gets stuck. It can follow specific criteria perfectly, but it can't read between the lines.",
  },
  {
    id: 'experience',
    icon: Brain,
    dimension: 'AI Experience',
    question: "How is your team currently using AI tools?",
    options: [
      "We haven't tried AI for work yet.",
      "One or two people experiment on their own.",
      "Several people use AI, but everyone does it differently.",
      "We have some shared practices or workflows involving AI.",
    ],
    insight: "Individual experimentation is a great start, but it doesn't scale. Team-level adoption requires shared practices and aligned expectations.",
  },
  {
    id: 'expectations',
    icon: Target,
    dimension: 'AI Expectations',
    question: "When AI gives your team a result that isn't great, does your team know why?",
    options: [
      "We assume the AI just isn't good enough.",
      "Sometimes we can tell, but usually it's a mystery.",
      "We can usually identify what went wrong (bad prompt, missing context, wrong tool).",
      "Yes. We iterate on inputs and context to improve results.",
    ],
    insight: "Bad AI output is almost always a context problem, not a capability problem. Teams that know how to diagnose \"why\" are teams that improve fast.",
  },
  {
    id: 'workflows',
    icon: BarChart3,
    dimension: 'Workflow Fit',
    question: "Can you point to 2-3 specific, repetitive workflows that would benefit from AI?",
    description: "Not vague ideas like \"we could use AI for marketing.\" Specific tasks: \"we manually create weekly status reports from 4 different sources.\"",
    options: [
      "Not really. We know AI could help but aren't sure where.",
      "We have vague ideas but nothing specific.",
      "We can name 1-2 specific workflows.",
      "Yes. We've already identified clear candidates and why they'd work.",
    ],
  },
  {
    id: 'alignment',
    icon: Handshake,
    dimension: 'Team Alignment',
    question: "Is your team aligned on what AI should and shouldn't do for your work?",
    options: [
      "We haven't discussed it as a team.",
      "We've talked about it loosely, but everyone has different expectations.",
      "We mostly agree on where AI fits, but haven't formalized anything.",
      "We've had focused conversations and agree on AI's role, boundaries, and where humans stay in the loop.",
    ],
    insight: "The teams that succeed with AI aren't the most technical. They're the most aligned. Everyone needs to agree on what \"good\" looks like before AI can help deliver it.",
  },
];

function getScoreBucket(score) {
  if (score <= 7) return 'getting-started';
  if (score <= 14) return 'almost-ready';
  return 'ready-to-build';
}

const BUCKET_CONFIG = {
  'getting-started': {
    label: 'Getting Started',
    color: 'var(--color-accent)',
    summary: "Your team is early in the AI readiness journey, and that's completely fine. Most teams start here. The fact that you're thinking about readiness puts you ahead of organizations that just buy tools and hope for the best.",
    action: "The single most impactful thing you can do right now is pick ONE workflow and document it well enough that someone unfamiliar could follow it step by step. That exercise alone reveals what AI would need to be useful.",
    primaryCta: {
      label: 'Try the Free Day One Demo',
      href: 'https://dayone.mvpclub.ai/demo',
      description: "Day One is an AI-facilitated workshop built by MVP Club. Three AI agents guide your team through identifying a real workflow, documenting it properly, and building a working AI prompt. The whole thing takes 90 minutes. The free demo lets you experience the process solo with a sample scenario in about 10 minutes, so you can see how it works before involving your team.",
    },
    secondaryCta: {
      label: 'Book a Discovery Call',
      href: 'https://calendly.com/d/cybv-947-s8m/discovery-call',
      description: "Talk through your specific situation with one of our coaches. 45 minutes, no pitch.",
    },
  },
  'almost-ready': {
    label: 'Almost Ready',
    color: 'var(--color-accent)',
    summary: "Your team has a real foundation. You're not starting from zero. But the gap between \"partially documented\" and \"AI-ready documentation\" is where most teams stall. The details matter: specific decision criteria, edge cases, and the unwritten rules your team takes for granted.",
    action: "Focus on the gaps in your documentation. For your top workflow, write down every decision point, every exception, and every \"you'll know it when you see it\" moment. That's the bridge between where you are and AI-ready.",
    primaryCta: {
      label: 'Try Day One with Your Team',
      href: 'https://dayone.mvpclub.ai',
      description: "Day One is an AI-facilitated workshop where your team picks a real workflow, documents it together, and walks out with a working AI prompt in 90 minutes. Three specialized AI agents guide the conversation, surface undocumented knowledge, and help you close exactly the gaps this assessment identified. Try the free 10-minute demo first, or go straight to a team session.",
    },
    secondaryCta: {
      label: 'Book a Discovery Call',
      href: 'https://calendly.com/d/cybv-947-s8m/discovery-call',
      description: "Want help figuring out which workflow to start with? Talk to one of our coaches. 45 minutes, no pitch.",
    },
  },
  'ready-to-build': {
    label: 'Ready to Build',
    color: 'var(--color-secondary)',
    summary: "Your team is in a strong position. Your processes are documented, your team is aligned, and you have specific workflows in mind. You don't need more preparation. You need to start building.",
    action: "Take your best-documented workflow and turn it into a working AI prompt. Test it, iterate, and refine until the output matches what your team considers \"good.\" That's the bridge from readiness to results.",
    primaryCta: {
      label: 'Build Your First AI Prompt with Day One',
      href: 'https://dayone.mvpclub.ai',
      description: "Day One is an AI-facilitated workshop that turns your documentation into a working AI prompt in 90 minutes. Your team picks a workflow, three AI agents help you refine the documentation, and you leave with something you can actually use the next day. You've done the hard prep work. This is the part where it pays off.",
    },
    secondaryCta: {
      label: 'Join the Community',
      href: 'https://mvp-club.mn.co/',
      description: "Connect with other practitioners who are building with AI daily. Weekly events, real projects, people who get it.",
    },
  },
};

// --- Intro Screen ---
function IntroScreen({ onStart }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <AnimatedSection>
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
          style={{ backgroundColor: 'var(--color-accent-lifted)', color: 'var(--color-primary)' }}
        >
          <BarChart3 size={16} />
          Free Assessment
        </div>

        <h1 className="font-display text-3xl md:text-5xl mb-6" style={{ color: 'var(--color-primary)' }}>
          AI Readiness Assessment for Teams
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          7 questions. 2 minutes. Find out how ready your team is to adopt AI
          and get specific recommendations for what to do next.
        </p>

        <p className="text-gray-600 mb-10">
          No account required. Your results appear instantly.
        </p>

        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
        >
          Start the Assessment
          <ArrowRight size={20} />
        </button>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            { title: 'Documentation', desc: "Can AI access what your team knows?" },
            { title: 'Process Clarity', desc: "Are your workflows explicit enough for AI?" },
            { title: 'Team Alignment', desc: "Does your team agree on where AI fits?" },
          ].map((item) => (
            <div key={item.title} className="p-5 rounded-xl bg-white">
              <h3 className="font-semibold mb-1 text-base" style={{ color: 'var(--color-primary)' }}>{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}

// --- Question Screen ---
function QuestionScreen({ question, questionIndex, totalQuestions, selectedAnswer, onSelect, onNext, onBack, showInsight }) {
  const Icon = question.icon;
  const progress = ((questionIndex + 1) / totalQuestions) * 100;
  const topRef = useRef(null);

  // Scroll to top of question on every question change
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, [questionIndex]);

  return (
    <div ref={topRef} style={{ scrollMarginTop: '120px' }}>
      {/* Progress bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">Question {questionIndex + 1} of {totalQuestions}</span>
          <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>{question.dimension}</span>
        </div>
        <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)', opacity: 0.1 }}>
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: 'var(--color-accent)' }}
          />
        </div>
      </div>

      {/* Two-column layout: question+options on left, insight on right */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left column: question, options, nav */}
        <div className="flex-1 min-w-0 pb-12">
          {/* Question */}
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                style={{ backgroundColor: 'var(--color-accent-lifted)' }}
              >
                <Icon size={20} style={{ color: 'var(--color-primary)' }} />
              </div>
              <h2 className="font-display text-xl md:text-2xl" style={{ color: 'var(--color-primary)' }}>
                {question.question}
              </h2>
            </div>
            {question.description && (
              <p className="text-gray-500 text-sm ml-[52px]">{question.description}</p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => onSelect(i)}
                className="w-full text-left p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.01]"
                style={{
                  borderColor: selectedAnswer === i ? 'var(--color-accent)' : 'rgba(0,0,0,0.08)',
                  backgroundColor: selectedAnswer === i ? 'var(--color-accent-lifted)' : 'white',
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                    style={{
                      borderColor: selectedAnswer === i ? 'var(--color-accent)' : 'rgba(0,0,0,0.2)',
                      backgroundColor: selectedAnswer === i ? 'var(--color-accent)' : 'transparent',
                    }}
                  >
                    {selectedAnswer === i && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--color-primary)' }}>
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100"
              style={{ color: 'var(--color-primary)' }}
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <button
              onClick={onNext}
              disabled={selectedAnswer === null}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
              style={{
                backgroundColor: selectedAnswer !== null ? 'var(--color-accent)' : 'gray',
                color: 'white',
              }}
            >
              {questionIndex === totalQuestions - 1 ? 'See Results' : 'Next'}
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Insight on mobile: shows below nav */}
          {showInsight && question.insight && selectedAnswer !== null && (
            <div
              className="md:hidden mt-6 p-4 rounded-xl text-sm leading-relaxed"
              style={{ backgroundColor: 'var(--color-primary)', color: 'rgba(255,255,255,0.85)' }}
            >
              <span className="font-semibold text-white">Why this matters: </span>
              {question.insight}
            </div>
          )}
        </div>

        {/* Right column: insight sidebar (desktop only) */}
        <div className="hidden md:block w-72 flex-shrink-0">
          <div
            className="sticky top-32 p-5 rounded-xl text-sm leading-relaxed transition-all duration-300"
            style={{
              backgroundColor: selectedAnswer !== null && question.insight ? 'var(--color-primary)' : 'transparent',
              color: 'rgba(255,255,255,0.85)',
              opacity: selectedAnswer !== null && question.insight ? 1 : 0,
            }}
          >
            {question.insight && (
              <>
                <span className="font-semibold text-white">Why this matters</span>
                <p className="mt-2">{question.insight}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Results Screen ---
function ResultsScreen({ answers }) {
  const totalScore = answers.reduce((sum, a) => sum + a, 0);
  const maxScore = QUESTIONS.length * 3;
  const bucket = getScoreBucket(totalScore);
  const config = BUCKET_CONFIG[bucket];

  // Sort dimensions by score for strengths/gaps
  const dimensions = QUESTIONS.map((q, i) => ({
    dimension: q.dimension,
    score: answers[i],
    icon: q.icon,
  }));
  const sorted = [...dimensions].sort((a, b) => b.score - a.score);
  const strengths = sorted.filter(d => d.score >= 2).slice(0, 3);
  const gaps = sorted.filter(d => d.score <= 1).reverse().slice(0, 3);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <AnimatedSection>
        {/* Score Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-medium uppercase tracking-wider mb-3" style={{ color: 'var(--color-secondary)' }}>
            Your AI Readiness Score
          </p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="font-display text-6xl" style={{ color: 'var(--color-primary)' }}>
              {totalScore}
            </span>
            <span className="text-2xl text-gray-400">/ {maxScore}</span>
          </div>
          <div
            className="inline-block px-4 py-1.5 rounded-full font-semibold text-sm"
            style={{ backgroundColor: 'var(--color-accent-lifted)', color: 'var(--color-primary)' }}
          >
            {config.label}
          </div>
          <p className="text-gray-500 text-sm mt-3">Most teams score between 6 and 12.</p>
        </div>

        {/* Score Bar */}
        <div className="mb-10">
          <div className="w-full h-4 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.06)' }}>
            <div
              className="h-4 rounded-full transition-all duration-1000"
              style={{
                width: `${(totalScore / maxScore) * 100}%`,
                backgroundColor: 'var(--color-accent)',
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Getting Started</span>
            <span>Almost Ready</span>
            <span>Ready to Build</span>
          </div>
        </div>

        {/* Dimension Breakdown */}
        <div className="bg-white rounded-2xl p-6 mb-8">
          <h3 className="font-display text-lg mb-4" style={{ color: 'var(--color-primary)' }}>
            Your Breakdown
          </h3>
          <div className="space-y-3">
            {dimensions.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.dimension} className="flex items-center gap-3">
                  <Icon size={16} className="text-gray-400 flex-shrink-0" />
                  <span className="text-sm w-32 flex-shrink-0" style={{ color: 'var(--color-primary)' }}>
                    {d.dimension}
                  </span>
                  <div className="flex-grow h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.06)' }}>
                    <div
                      className="h-3 rounded-full transition-all duration-700"
                      style={{
                        width: `${(d.score / 3) * 100}%`,
                        backgroundColor: d.score >= 2 ? 'var(--color-secondary)' : d.score >= 1 ? 'var(--color-accent)' : 'var(--color-accent-soft)',
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium w-8 text-right" style={{ color: 'var(--color-primary)' }}>
                    {d.score}/3
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h3 className="font-display text-lg mb-3" style={{ color: 'var(--color-primary)' }}>
            What This Means
          </h3>
          <p className="text-gray-600 leading-relaxed">{config.summary}</p>
        </div>

        {/* Strengths */}
        {strengths.length > 0 && (
          <div className="bg-white rounded-2xl p-6 mb-6">
            <h3 className="font-display text-lg mb-3" style={{ color: 'var(--color-primary)' }}>
              Your Strengths
            </h3>
            <div className="space-y-2">
              {strengths.map((s) => (
                <div key={s.dimension} className="flex items-center gap-2">
                  <CheckCircle2 size={16} style={{ color: 'var(--color-secondary)' }} />
                  <span className="text-sm text-gray-700">
                    <strong>{s.dimension}</strong> ({s.score}/3)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gaps */}
        {gaps.length > 0 && (
          <div className="bg-white rounded-2xl p-6 mb-6">
            <h3 className="font-display text-lg mb-3" style={{ color: 'var(--color-primary)' }}>
              Where to Focus
            </h3>
            <div className="space-y-2">
              {gaps.map((g) => (
                <div key={g.dimension} className="flex items-center gap-2">
                  <ArrowRight size={16} style={{ color: 'var(--color-accent)' }} />
                  <span className="text-sm text-gray-700">
                    <strong>{g.dimension}</strong> ({g.score}/3)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What to Do Next */}
        <div className="bg-white rounded-2xl p-6 mb-8">
          <h3 className="font-display text-lg mb-3" style={{ color: 'var(--color-primary)' }}>
            What to Do Next
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">{config.action}</p>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{config.primaryCta.description}</p>
              <a
                href={config.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAssessEvent('assessment_cta_click', {
                  event_label: config.primaryCta.label,
                  link_url: config.primaryCta.href,
                  result_bucket: bucket,
                })}
                className="block w-full py-4 rounded-xl font-semibold text-center transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: 'var(--color-accent)', color: 'white', textDecoration: 'none' }}
              >
                {config.primaryCta.label}
              </a>
            </div>

            <div className="border-t pt-6" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{config.secondaryCta.description}</p>
              <a
                href={config.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAssessEvent('assessment_cta_click', {
                  event_label: config.secondaryCta.label,
                  link_url: config.secondaryCta.href,
                  result_bucket: bucket,
                })}
                className="block w-full py-4 rounded-xl font-semibold text-center transition-all duration-200 hover:scale-105 border-2"
                style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)', textDecoration: 'none' }}
              >
                {config.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>

        {/* Retake */}
        <div className="text-center">
          <button
            onClick={() => window.location.reload()}
            className="text-sm font-medium underline transition-colors"
            style={{ color: 'var(--color-primary)' }}
          >
            Retake the assessment
          </button>
        </div>
      </AnimatedSection>
    </div>
  );
}

// --- Main Page ---
const AssessPage = () => {
  const [stage, setStage] = useState('intro'); // 'intro' | 'questions' | 'results'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));

  const handleStart = () => {
    trackAssessEvent('assessment_started');
    setStage('questions');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    trackAssessEvent('assessment_answer', {
      event_label: QUESTIONS[currentQuestion].dimension,
      question_id: QUESTIONS[currentQuestion].id,
      question_number: currentQuestion + 1,
      answer_value: optionIndex,
    });
  };

  const handleNext = () => {
    if (answers[currentQuestion] === null) return;
    if (currentQuestion === QUESTIONS.length - 1) {
      const finalAnswers = [...answers];
      const totalScore = finalAnswers.reduce((sum, a) => sum + a, 0);
      const bucket = getScoreBucket(totalScore);
      trackAssessEvent('assessment_completed', {
        event_label: bucket,
        score: totalScore,
        max_score: QUESTIONS.length * 3,
        result_bucket: bucket,
      });
      setStage('results');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      setCurrentQuestion(currentQuestion + 1);
      // scrollIntoView handled by useEffect in QuestionScreen
    }
  };

  const handleBack = () => {
    if (currentQuestion === 0) {
      setStage('intro');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      setCurrentQuestion(currentQuestion - 1);
      // scrollIntoView handled by useEffect in QuestionScreen
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Page Header */}
      {stage !== 'results' && (
        <section className="pt-32 pb-0" style={{ backgroundColor: 'var(--color-background)' }}>
          <div className="max-w-7xl mx-auto px-6">
            {stage === 'intro' && <IntroScreen onStart={handleStart} />}
            {stage === 'questions' && (
              <QuestionScreen
                question={QUESTIONS[currentQuestion]}
                questionIndex={currentQuestion}
                totalQuestions={QUESTIONS.length}
                selectedAnswer={answers[currentQuestion]}
                onSelect={handleSelect}
                onNext={handleNext}
                onBack={handleBack}
                showInsight={true}
              />
            )}
          </div>
        </section>
      )}

      {stage === 'results' && (
        <section className="pt-32 pb-16" style={{ backgroundColor: 'var(--color-background)' }}>
          <div className="max-w-7xl mx-auto px-6">
            <ResultsScreen answers={answers} />
          </div>
        </section>
      )}
    </div>
  );
};

export default AssessPage;
