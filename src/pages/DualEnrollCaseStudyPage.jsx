import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Quote, TrendingUp, Users, Clock, Brain, CheckCircle2, ArrowRight, Search, ListChecks, Wrench } from 'lucide-react';
import AnimatedSection from '../components/shared/AnimatedSection';
import SharedCTA from '../components/shared/SharedCTA';
import SEO from '../components/SEO';

const stats = [
  { value: '3-4 hrs', label: 'saved per person, per week', icon: Clock },
  { value: '100%', label: 'increase in AI confidence', icon: TrendingUp },
  { value: '5', label: 'team members activated', icon: Users },
  { value: '4 weeks', label: 'from kickoff to results', icon: Brain },
];

const DualEnrollCaseStudyPage = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <SEO
        title="Case Study: Dual Enroll"
        description="How MVP Club's 4-week productivity sprint transformed an ed-tech team from AI skeptics to power users saving 3-4 hours per week."
        path="/case-studies/dual-enroll"
      />

      {/* Hero */}
      <section className="pt-32 pb-16" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <Link
              to="/for-organizations"
              className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors duration-200"
              style={{ color: 'var(--color-accent-lifted)' }}
            >
              <ArrowLeft size={16} />
              For Organizations
            </Link>
            <p
              className="text-xs font-semibold uppercase tracking-[0.15em] mb-4"
              style={{ color: 'var(--color-accent-lifted)' }}
            >
              Case Study
            </p>
            <h1 className="font-display text-3xl md:text-4xl text-white mb-4">
              How Dual Enroll Went from AI Skeptics to Saving 3-4 Hours a Week Per Person
            </h1>
            <p className="text-lg text-white/70">
              Ed-tech organization &middot; 4-week productivity sprint &middot; Multi-team engagement
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12" style={{ backgroundColor: 'white' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: 'var(--color-accent-lifted)' }}
                  >
                    <stat.icon size={22} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div className="font-display text-2xl mb-1" style={{ color: 'var(--color-primary)' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <p
              className="text-xs font-semibold uppercase tracking-[0.15em] mb-3"
              style={{ color: 'var(--color-secondary)' }}
            >
              The Challenge
            </p>
            <h2 className="font-display text-2xl md:text-3xl mb-6" style={{ color: 'var(--color-primary)' }}>
              AI Curiosity Without a Clear Path Forward
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Dual Enroll is an ed-tech organization with teams spanning customer success, operations, and leadership.
                They knew AI could improve how they worked, but the team ranged from daily AI users to outright
                skeptics who had never touched the tools.
              </p>
              <p>
                Without hands-on guidance, adoption had stalled at the surface level. People were experimenting
                in isolation, unsure how to connect AI tools to their actual workflows. Leadership wanted
                real productivity gains, not another training program that people would forget in a week.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* The Approach */}
      <section className="py-16" style={{ backgroundColor: 'white' }}>
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <p
              className="text-xs font-semibold uppercase tracking-[0.15em] mb-3"
              style={{ color: 'var(--color-secondary)' }}
            >
              The Approach
            </p>
            <h2 className="font-display text-2xl md:text-3xl mb-6" style={{ color: 'var(--color-primary)' }}>
              A 4-Week Embedded Coaching Sprint
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Instead of lectures or slide decks, we embedded directly with the team and coached them through
              real work. Each person identified high-value use cases from their own day-to-day, and we
              helped them build and test AI workflows they could use immediately.
            </p>
          </AnimatedSection>

          <div className="space-y-4">
            {[
              {
                phase: 'Org Kickoff',
                desc: 'Aligned leadership on goals and identified high-leverage AI opportunities across teams. Built a shared backlog of use cases ranked by impact.',
              },
              {
                phase: 'Team Kickoffs',
                desc: 'Broke into functional teams to scope specific workflows. Each team member identified 2-3 tasks where AI could save real time.',
              },
              {
                phase: '1:1 Coaching Sessions',
                desc: 'Hands-on sessions where coaches worked through individual workflows side-by-side. Built prompt templates, integrated AI into existing processes, and troubleshot live.',
              },
              {
                phase: 'Slack Support',
                desc: 'Ongoing async support between sessions so momentum never stalled. Quick answers, prompt feedback, and encouragement to keep experimenting.',
              },
              {
                phase: 'Wrap-Up & Roadmap',
                desc: 'Delivered a prioritized roadmap of next opportunities so the team could confidently continue building on their momentum after the engagement.',
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div
                  className="p-5 rounded-xl"
                  style={{
                    backgroundColor: 'var(--color-background)',
                    borderLeft: '3px solid var(--color-secondary)',
                  }}
                >
                  <div className="font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>
                    {item.phase}
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">{item.desc}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Method: Work Decomp & AI Opportunity ID */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <p
              className="text-xs font-semibold uppercase tracking-[0.15em] mb-3"
              style={{ color: 'var(--color-secondary)' }}
            >
              Our Method
            </p>
            <h2 className="font-display text-2xl md:text-3xl mb-4" style={{ color: 'var(--color-primary)' }}>
              Work Decomposition &amp; AI Opportunity Identification
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              The biggest reason AI adoption stalls is that people don&rsquo;t know where to start.
              &ldquo;Use AI more&rdquo; isn&rsquo;t actionable. Our method breaks real work down into
              concrete tasks, then systematically identifies which ones are high-leverage AI opportunities.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: Search,
                title: 'Decompose the Work',
                desc: 'Each team member maps their actual day-to-day into discrete tasks and workflows. Not hypotheticals — the real work they do every week.',
              },
              {
                icon: ListChecks,
                title: 'Identify AI Opportunities',
                desc: 'We score each task on AI leverage potential and time impact, then rank them into a prioritized backlog. The team picks the highest-value starting points.',
              },
              {
                icon: Wrench,
                title: 'Build & Test Live',
                desc: 'In 1:1 coaching sessions, we work through each opportunity side-by-side — building prompts, testing workflows, and iterating until it works in their real process.',
              },
            ].map((step, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="bg-white p-6 rounded-xl h-full">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'var(--color-accent-lifted)' }}
                  >
                    <step.icon size={20} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div className="font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>
                    {step.title}
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">{step.desc}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div
              className="p-6 rounded-xl bg-white"
              style={{ borderLeft: '3px solid var(--color-secondary)' }}
            >
              <div className="font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>
                Why this matters
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                At Dual Enroll, early planning sessions surfaced a lot of excellent ideas. Our structured decomposition process
                helped them narrow scope and prioritize, pick a specific task, and get to a working AI workflow fast.
                That first quick win built the confidence to tackle bigger opportunities.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* The Results — By the Numbers */}
      <section className="py-16" style={{ backgroundColor: 'white' }}>
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <p
              className="text-xs font-semibold uppercase tracking-[0.15em] mb-3"
              style={{ color: 'var(--color-secondary)' }}
            >
              The Results
            </p>
            <h2 className="font-display text-2xl md:text-3xl mb-4" style={{ color: 'var(--color-primary)' }}>
              From Skeptics to Power Users in 4 Weeks
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10">
              We surveyed all participants throughout the engagement. Here&rsquo;s what the data shows.
            </p>
          </AnimatedSection>

          {/* Before / After comparisons */}
          <div className="space-y-6 mb-10">
            {[
              {
                label: 'AI Confidence',
                before: '60% "not confident" or "slightly confident"',
                after: '80% "moderately confident," 20% "very confident"',
              },
              {
                label: 'Usage Frequency',
                before: '40% used AI rarely (a few times per month)',
                after: '40% using AI daily, 40% using AI weekly',
              },
              {
                label: 'Time Saved per Week',
                before: 'No measurable time savings',
                after: 'Range of 1-5 hrs, up to 5-10 hrs per person',
              },
            ].map((row, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--color-background)' }}>
                  <div
                    className="px-5 py-3 font-semibold text-sm"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {row.label}
                  </div>
                  <div className="grid md:grid-cols-2">
                    <div className="px-5 py-4 border-t" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                      <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Before</div>
                      <div className="text-sm text-gray-600">{row.before}</div>
                    </div>
                    <div
                      className="px-5 py-4 border-t"
                      style={{ borderColor: 'rgba(0,0,0,0.06)', backgroundColor: 'rgba(var(--color-secondary-rgb, 46,139,87), 0.05)' }}
                    >
                      <div
                        className="text-xs font-semibold uppercase tracking-wider mb-1"
                        style={{ color: 'var(--color-secondary)' }}
                      >
                        After
                      </div>
                      <div className="text-sm font-medium text-gray-700">{row.after}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Satisfaction Scores */}
          <AnimatedSection>
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { score: '4.2', label: 'Overall Satisfaction', outOf: '/ 5' },
                { score: '4.6', label: 'Would Recommend', outOf: '/ 5' },
                { score: '4.75', label: '1:1 Coaching Rating', outOf: '/ 5' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="text-center p-5 rounded-xl"
                  style={{ backgroundColor: 'var(--color-background)' }}
                >
                  <div className="font-display text-2xl md:text-3xl" style={{ color: 'var(--color-primary)' }}>
                    {item.score}
                    <span className="text-base text-gray-400 ml-1">{item.outOf}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Qualitative highlights */}
          <AnimatedSection>
            <h3 className="font-display text-lg mb-4" style={{ color: 'var(--color-primary)' }}>
              In Their Own Words
            </h3>
          </AnimatedSection>
          <div className="space-y-3">
            {[
              {
                quote: 'Having someone to explore systems with and run ideas through.',
                context: 'On 1:1 coaching value',
              },
              {
                quote: 'Spark projects within our organization to get moving and get done. Get our employees thinking about AI use and how to improve.',
                context: 'On program impact',
              },
              {
                quote: 'The guidance to better prompt ChatGPT to reach the goal I was looking for, creative prompting solutions, other ways to ask questions through the AI tool.',
                context: 'On skills gained',
              },
              {
                quote: 'Just having experts to talk to about big ideas.',
                context: 'On most valuable aspect',
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: 'var(--color-background)', borderLeft: '3px solid var(--color-accent)' }}
                >
                  <p className="text-sm text-gray-700 italic leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <p className="text-xs text-gray-400 mt-2">{item.context}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center">
              <Quote size={40} className="mx-auto mb-6" style={{ color: 'var(--color-accent-lifted)', opacity: 0.6 }} />
              <blockquote className="font-display text-xl md:text-2xl text-white leading-relaxed mb-8">
                &ldquo;MVP Club&rsquo;s 4 week productivity sprint was transformational for my team. We had AI
                skeptics and folks who never used it setting up and testing workflows, which is a huge win
                for me. And each team member is saving 3-4 hours a week already, and I expect this number
                to continue to rise. MVP Club left us with motivation and a roadmap asset on how to keep
                going so we can confidently build on this incredible momentum.&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: 'var(--color-secondary)' }}
                >
                  SH
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">Scott Holmes, CEO</div>
                  <div className="text-sm text-white/60">Dual Enroll</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What They Built */}
      <section className="py-16" style={{ backgroundColor: 'white' }}>
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <p
              className="text-xs font-semibold uppercase tracking-[0.15em] mb-3"
              style={{ color: 'var(--color-secondary)' }}
            >
              What They Built
            </p>
            <h2 className="font-display text-2xl md:text-3xl mb-8" style={{ color: 'var(--color-primary)' }}>
              Real Workflows, Not Hypotheticals
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'Onboarding Documentation',
                desc: 'Used AI to generate internal knowledge docs from onboarding sessions, restructuring Confluence for better team access.',
              },
              {
                title: 'Custom Knowledge Base GPT',
                desc: 'Built "R2K2" — a centralized assistant for pulling historical organizational information in one place.',
              },
              {
                title: 'Notification & Task Management',
                desc: 'Integrated AI into daily notification workflows and strategic communication templates.',
              },
              {
                title: 'Prompt Libraries',
                desc: 'Developed reusable prompt templates for repeated tasks, so the whole team could leverage AI without starting from scratch.',
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div
                  className="p-5 rounded-xl h-full"
                  style={{
                    backgroundColor: 'var(--color-background)',
                    borderLeft: '3px solid var(--color-accent)',
                  }}
                >
                  <div className="font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">{item.desc}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Inline CTA */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <div
              className="p-8 md:p-12 rounded-2xl text-center"
              style={{ backgroundColor: 'white', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
            >
              <h3 className="font-display text-2xl mb-4" style={{ color: 'var(--color-primary)' }}>
                Want Results Like These for Your Team?
              </h3>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
                Our 4-week productivity sprint is designed for teams that want real AI adoption,
                not another training program. Start small, prove value, scale what works.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://calendly.com/d/cybv-947-s8m/discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
                >
                  Book a Discovery Call
                </a>
                <Link
                  to="/for-organizations"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-200"
                  style={{ color: 'var(--color-primary)', border: '2px solid var(--color-primary)' }}
                >
                  Learn About Our Sprint
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SharedCTA />
    </div>
  );
};

export default DualEnrollCaseStudyPage;
