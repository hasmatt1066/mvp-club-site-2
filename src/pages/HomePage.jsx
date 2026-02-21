import React from 'react';
import NewHero from '../components/homepage/NewHero';
import SocialProof from '../components/homepage/SocialProof';
import HowWeHelp from '../components/homepage/HowWeHelp';
import TeamSection from '../components/homepage/TeamSection';
import FinalCTA from '../components/homepage/FinalCTA';
import SEO from '../components/SEO';

const HomePage = () => (
  <>
    <SEO
      description="MVP Club helps professionals and teams adopt AI through practice-based coaching, community learning, and hands-on workshops. Bridge the gap between AI tools and real productivity."
      path="/"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'MVP Club',
        url: 'https://mvpclub.ai',
        logo: 'https://mvpclub.ai/mvp-club-logo.jpeg',
        description: 'AI adoption coaching through practice-based learning and community.',
        sameAs: [],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          url: 'https://calendly.com/d/cybv-947-s8m/discovery-call',
        },
      }}
    />
    <NewHero />
    <SocialProof />
    <HowWeHelp />
    <TeamSection />
    <FinalCTA />
  </>
);

export default HomePage;
