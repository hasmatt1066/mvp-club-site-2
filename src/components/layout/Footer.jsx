import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-12" style={{ backgroundColor: 'var(--color-primary)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display text-xl" style={{ color: 'var(--color-accent-lifted)' }}>
            MVP Club
          </div>
          <div className="flex items-center gap-8">
            <Link
              to="/how-we-work"
              className="text-white/70 hover:text-white text-sm transition-colors"
              style={{ textDecoration: 'none' }}
            >
              How We Work
            </Link>
            <Link
              to="/for-organizations"
              className="text-white/70 hover:text-white text-sm transition-colors"
              style={{ textDecoration: 'none' }}
            >
              For Organizations
            </Link>
            <Link
              to="/community"
              className="text-white/70 hover:text-white text-sm transition-colors"
              style={{ textDecoration: 'none' }}
            >
              Community
            </Link>
            <a
              href="/blog/"
              className="text-white/70 hover:text-white text-sm transition-colors"
            >
              Blog
            </a>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a
              href="mailto:info@mvpclub.ai"
              className="text-white/70 hover:text-white transition-colors"
            >
              info@mvpclub.ai
            </a>
            <span className="text-white/30">&copy; 2025 MVP Club</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
