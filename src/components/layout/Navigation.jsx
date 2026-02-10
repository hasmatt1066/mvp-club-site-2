import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImage from '../../mvp-club-logo.jpeg';

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'How We Work', to: '/how-we-work' },
    { label: 'For Organizations', to: '/for-organizations' },
    { label: 'Community', to: '/community' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 py-4"
      style={{
        backgroundColor: 'var(--color-primary)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 font-display text-2xl font-medium cursor-pointer"
          style={{ color: 'var(--color-accent-lifted)', textDecoration: 'none' }}
        >
          <img
            src={logoImage}
            alt="MVP Club Logo"
            className="h-10 w-10 rounded-lg object-cover"
          />
          <span>MVP Club</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium transition-colors duration-200"
              style={{
                color: isActive(link.to) ? 'var(--color-accent-lifted)' : 'rgba(255,255,255,0.8)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-lifted)'}
              onMouseLeave={(e) => {
                if (!isActive(link.to)) {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                }
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/blog/"
            className="text-sm font-medium transition-colors duration-200"
            style={{
              color: location.pathname.startsWith('/blog') ? 'var(--color-accent-lifted)' : 'rgba(255,255,255,0.8)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-lifted)'}
            onMouseLeave={(e) => {
              if (!location.pathname.startsWith('/blog')) {
                e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
              }
            }}
          >
            Blog
          </a>
          <a
            href="https://calendly.com/d/cybv-947-s8m/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
          >
            Book a Call
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: 'white' }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="lg:hidden absolute top-full left-0 right-0 py-6 px-6"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-left py-3 text-white/80 hover:text-white transition-colors font-medium"
            style={{
              color: isActive('/') ? 'var(--color-accent-lifted)' : undefined,
              textDecoration: 'none'
            }}
          >
            Home
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block w-full text-left py-3 text-white/80 hover:text-white transition-colors font-medium"
              style={{
                color: isActive(link.to) ? 'var(--color-accent-lifted)' : undefined,
                textDecoration: 'none'
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/blog/"
            className="block w-full text-left py-3 text-white/80 hover:text-white transition-colors font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
