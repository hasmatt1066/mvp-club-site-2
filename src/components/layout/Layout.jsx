import React, { useEffect, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import { COLOR_PALETTES, generateTheme, applyTheme } from '../../theme-system';
import LeadMagnetPopup, { useLeadMagnetPopup } from '../../LeadMagnetPopup';

const Layout = () => {
  const location = useLocation();
  const { shouldShow: showLeadMagnet, dismiss: dismissLeadMagnet } = useLeadMagnetPopup();

  // Initialize theme on mount
  useEffect(() => {
    const theme = generateTheme(COLOR_PALETTES.dusk);
    applyTheme(theme);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {showLeadMagnet && <LeadMagnetPopup onDismiss={dismissLeadMagnet} />}
      <Navigation />
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Layout;
