import React from 'react';
import { Building2, CheckCircle2, TrendingUp, Target, Layers, Brain } from 'lucide-react';
import AnimatedSection from '../components/shared/AnimatedSection';
import SharedCTA from '../components/shared/SharedCTA';

const ForOrganizationsPage = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* For Organizations Section */}
      <section id="organizations" className="pt-32 py-24" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <Building2 size={24} style={{ color: 'var(--color-accent-lifted)' }} />
              <p
                className="text-lg font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-accent-lifted)' }}
              >
                For Organizations
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-6 max-w-2xl">
              4-Week Productivity Sprint
            </h2>
            <p className="text-xl text-white/90 mb-6 max-w-2xl font-semibold">
              Start Small. Prove Value. Scale Fast.
            </p>
            <p className="text-lg text-white/80 mb-12 max-w-2xl leading-relaxed">
              A rapid productivity sprint that installs AI workflows into your team's real processes—without
              training programs, strategy cycles, or major time commitments. Get measurable productivity
              gains in 4 weeks by doing actual work, not sitting through programs.
            </p>
          </AnimatedSection>

          {/* Timeline */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                weeks: 'Week 1',
                title: 'Workflow Discovery',
                activities: [
                  'Identify 2-3 high-value use cases',
                  'Map current processes',
                  'Define success metrics'
                ]
              },
              {
                weeks: 'Week 2-3',
                title: 'Build + Install',
                activities: [
                  'Create tailored AI workflows',
                  'Install into real team processes',
                  'Train by doing actual work'
                ]
              },
              {
                weeks: 'Week 4',
                title: 'Measure + Expand',
                activities: [
                  'Track impact on cycle time, output, workload',
                  'Identify next workflows to automate',
                  'Design scale plan (optional)'
                ]
              }
            ].map((phase, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div
                  className="p-6 rounded-xl h-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  <div
                    className="text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: 'var(--color-accent-lifted)' }}
                  >
                    {phase.weeks}
                  </div>
                  <h4 className="font-display text-lg text-white mb-4">{phase.title}</h4>
                  <div className="space-y-2">
                    {phase.activities.map((activity, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle2 size={14} style={{ color: 'var(--color-accent-lifted)' }} className="flex-shrink-0 mt-0.5" />
                        <span className="text-white/70 text-sm">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* What You Get Summary */}
          <AnimatedSection>
            <div
              className="p-8 rounded-xl mb-16 max-w-3xl mx-auto bg-white"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '2px solid var(--color-secondary)' }}
            >
              <h3 className="font-display text-2xl mb-6 text-center" style={{ color: 'var(--color-primary)' }}>What You Get</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  '2-3 production-ready AI workflows',
                  'Role-specific prompt libraries',
                  'Loom walkthroughs for each workflow',
                  'Measurable productivity gains',
                  'Clear roadmap for broader rollout'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} style={{ color: 'var(--color-secondary)' }} className="flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Deliverables */}
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-xl text-white mb-6">What You Walk Away With</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Working AI Workflows (Not Just Ideas)',
                      desc: '2-3 fully functional, team-tested workflows with copy/paste prompts ready for production use'
                    },
                    {
                      title: 'Role-Based Playbooks',
                      desc: 'Tailored for your specific roles (PM, Designer, Analyst, etc.) with 3-5 tactical workflows per role'
                    },
                    {
                      title: 'Video Walkthroughs',
                      desc: 'Loom recordings showing exactly how to use each workflow—no guesswork, no ambiguity'
                    },
                    {
                      title: 'Impact Metrics',
                      desc: 'Measure cycle time reduction, track output increases, prove ROI for broader rollout'
                    }
                  ].map((deliverable, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        borderLeft: '3px solid var(--color-accent-lifted)'
                      }}
                    >
                      <div className="font-semibold mb-1" style={{ color: 'var(--color-accent-lifted)' }}>{deliverable.title}</div>
                      <div className="text-white/70 text-sm">{deliverable.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="p-8 rounded-xl bg-white"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '2px solid var(--color-accent)' }}
              >
                <h3 className="font-display text-xl mb-6" style={{ color: 'var(--color-primary)' }}>Target Outcomes</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Faster project delivery (measured in days saved)', icon: TrendingUp },
                    { label: 'Reduced employee workload (same output, less time)', icon: Target },
                    { label: 'Sustainable AI capability (practice builds lasting skills)', icon: Layers },
                    { label: 'Clear path to scale (pilot proves the model)', icon: Brain }
                  ].map((outcome, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                      >
                        <outcome.icon size={20} style={{ color: 'white' }} />
                      </div>
                      <span className="text-gray-700">{outcome.label}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://calendly.com/d/cybv-947-s8m/discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 w-full py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 block text-center"
                  style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
                >
                  Schedule a Discovery Call
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Shared CTA */}
      <SharedCTA />
    </div>
  );
};

export default ForOrganizationsPage;
