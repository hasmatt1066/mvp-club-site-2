import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../shared/AnimatedSection';

const SprintArrowIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 14h16m0 0l-6-6m6 6l-6 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="23" cy="7" r="2" fill="#fbbf24" opacity="0.9"/>
    <circle cx="25" cy="11" r="1.2" fill="#fbbf24" opacity="0.6"/>
  </svg>
);

const CoachingFiguresIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="8" r="3" stroke="white" strokeWidth="2" fill="none"/>
    <path d="M4 22c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="20" cy="10" r="2.5" stroke="#fbbf24" strokeWidth="1.8" fill="none" opacity="0.85"/>
    <path d="M15.5 24c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" opacity="0.85"/>
  </svg>
);

const ConnectedNodesIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="6" r="2.5" stroke="white" strokeWidth="1.8" fill="none"/>
    <circle cx="6" cy="20" r="2.5" stroke="white" strokeWidth="1.8" fill="none"/>
    <circle cx="22" cy="20" r="2.5" stroke="white" strokeWidth="1.8" fill="none"/>
    <line x1="12.5" y1="8.2" x2="7.5" y2="17.8" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    <line x1="15.5" y1="8.2" x2="20.5" y2="17.8" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    <line x1="8.5" y1="20" x2="19.5" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

const services = [
  {
    badge: 'For Organizations',
    badgeBg: 'rgba(26, 54, 93, 0.1)',
    badgeColor: 'var(--color-primary)',
    iconBg: 'var(--color-primary)',
    Icon: SprintArrowIcon,
    title: 'Embedded Team Coaching',
    description:
      'We embed within your organization to coach your people through AI adoption. We start by finding a real workflow where AI could help, then we support individuals through practicing \u2014 through the intimidation, the setbacks, and into genuine confidence.',
    features: [
      "Grounded in your team's real work",
      'Small team planning calls',
      'Office hours & 1:1 coaching',
      'We stay until it sticks',
    ],
    linkTo: '/for-organizations',
    linkText: 'Learn more',
  },
  {
    badge: 'The Approach',
    badgeBg: 'rgba(17, 94, 89, 0.1)',
    badgeColor: 'var(--color-secondary)',
    iconBg: 'var(--color-secondary)',
    Icon: CoachingFiguresIcon,
    title: 'Practice, Not Presentations',
    description:
      "AI is a skill you get good at by doing, not by watching a slide deck. Our coaches \u2014 including an ICF-certified professional coach and a PhD educator \u2014 help people work through the emotional and practical barriers that keep them stuck. You'll be bad at it at first. That's the point. We're there for that part.",
    features: [
      'An educator, a coach, and a builder',
      'Non-technical backgrounds welcome',
      "We've been through it ourselves",
    ],
    linkTo: '/how-we-work',
    linkText: 'See our approach',
  },
  {
    badge: 'For Individuals',
    badgeBg: 'rgba(217, 119, 6, 0.15)',
    badgeColor: 'var(--color-accent)',
    iconBg: 'var(--color-accent)',
    Icon: ConnectedNodesIcon,
    title: 'AI-First Practitioner Community',
    description:
      "Going through this moment alone is harder than it needs to be. Our community is where people build with AI together \u2014 with live sessions, coaching, and peers who get it. Members have shipped real apps, tools, and workflows. Non-technical backgrounds are the norm, not the exception.",
    features: [
      'New AI Tools Monday',
      'Getting Unstuck Tuesday',
      'Demo & Share Wednesday',
      'Monthly Getting Started sessions',
    ],
    linkTo: '/community',
    linkText: 'Join the Community',
  },
];

const HowWeHelp = () => {
  return (
    <section
      id="how-we-help"
      className="py-20"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-[0.15em] mb-3"
              style={{ color: 'var(--color-secondary)' }}
            >
              How We Work
            </p>
            <h2
              className="font-display text-3xl mb-3"
              style={{ color: 'var(--color-primary)' }}
            >
              We Coach Alongside You, Not Above You
            </h2>
            <p className="text-lg text-gray-500 max-w-[600px] mx-auto leading-relaxed">
              We're not consultants who hand you a deck and leave. We embed with your team
              and stay until AI becomes part of how they actually work.
            </p>
          </div>
        </AnimatedSection>

        {/* Service cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 100}>
              <div
                className="bg-white rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 flex flex-col relative overflow-hidden"
                style={{
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                }}
              >
                {/* Badge */}
                <span
                  className="inline-block px-3 py-1 rounded-full text-[0.7rem] font-semibold uppercase tracking-[0.05em] mb-4 w-fit"
                  style={{
                    backgroundColor: service.badgeBg,
                    color: service.badgeColor,
                  }}
                >
                  {service.badge}
                </span>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: service.iconBg }}
                >
                  <service.Icon />
                </div>

                {/* Title */}
                <h3
                  className="font-display text-xl mb-3"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[0.95rem] text-gray-500 leading-relaxed mb-5 flex-grow">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="list-none mb-6">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-sm text-gray-700 py-1 flex items-center gap-2"
                    >
                      <span
                        className="font-bold text-xs"
                        style={{ color: 'var(--color-secondary)' }}
                      >
                        &#10003;
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <Link
                  to={service.linkTo}
                  className="text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 hover:gap-2.5 no-underline"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {service.linkText}
                  <span>&rarr;</span>
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeHelp;
