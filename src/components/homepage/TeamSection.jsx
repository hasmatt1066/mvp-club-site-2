import React from 'react';
import AnimatedSection from '../shared/AnimatedSection';

const teamMembers = [
  {
    photo: '/matt-hastings.png',
    name: 'Matt Hastings',
    bio:
      'Has run over 100 AI adoption coaching sessions. Manages AI implementation team at General Assembly and designs AI training products for Fortune 500 clients.',
    quote:
      'The only way to learn is by doing \u2014 understanding comes through practice, not preparation.',
  },
  {
    photo: '/jill-ozovek.jpg',
    name: 'Jill Ozovek',
    bio:
      'Certified Professional Coach who led learning design including AI programming and agentic workflows at GA. Sets up AI workflows for startups and runs AI coaching sessions for MVP Club.',
    quote:
      "Most people's biggest AI barrier isn't technical \u2014 it's psychological.",
  },
  {
    photo: '/ryan-brodsky.jpg',
    name: 'Ryan Brodsky',
    bio:
      'Software Developer who uses AI to create customer support articles, prototype applications, and has shipped 50+ feature requests using AI-assisted development.',
    quote:
      'You learn more when you watch somebody do something wrong and they explain what happened.',
  },
];

const TeamSection = () => {
  return (
    <section
      id="team"
      className="py-20"
      style={{ backgroundColor: 'var(--color-primary)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-[0.15em] mb-3"
              style={{ color: 'var(--color-accent-lifted)' }}
            >
              About Us
            </p>
            <h2 className="font-display text-3xl text-white mb-3">
              Meet the Team
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-[640px] mx-auto">
              We're practitioners first&mdash;people who've navigated the AI transformation ourselves
              and are passionate about helping others do the same.
            </p>
          </div>
        </AnimatedSection>

        {/* Team cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {teamMembers.map((member, index) => (
            <AnimatedSection key={member.name} delay={index * 100}>
              <div
                className="rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Photo */}
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-5"
                  style={{ border: '3px solid rgba(255,255,255,0.15)' }}
                />

                {/* Name */}
                <h3 className="font-display text-xl text-white mb-4">
                  {member.name}
                </h3>

                {/* Bio */}
                <p className="text-sm text-white/65 leading-relaxed mb-4">
                  {member.bio}
                </p>

                {/* Quote */}
                <div
                  className="pt-3"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <p className="text-xs italic text-white/50 leading-relaxed">
                    &ldquo;{member.quote}&rdquo;
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
