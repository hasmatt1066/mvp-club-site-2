import React from 'react';
import Layout from './components/layout/Layout';

const routes = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/layout/Layout.jsx',
    children: [
      {
        index: true,
        Component: React.lazy(() => import('./pages/HomePage')),
        entry: 'src/pages/HomePage.jsx',
      },
      {
        path: 'how-we-work',
        Component: React.lazy(() => import('./pages/HowWeWorkPage')),
        entry: 'src/pages/HowWeWorkPage.jsx',
      },
      {
        path: 'for-organizations',
        Component: React.lazy(() => import('./pages/ForOrganizationsPage')),
        entry: 'src/pages/ForOrganizationsPage.jsx',
      },
      {
        path: 'community',
        Component: React.lazy(() => import('./pages/CommunityPage')),
        entry: 'src/pages/CommunityPage.jsx',
      },
      {
        path: 'case-studies/dual-enroll',
        Component: React.lazy(() => import('./pages/DualEnrollCaseStudyPage')),
        entry: 'src/pages/DualEnrollCaseStudyPage.jsx',
      },
      {
        path: 'webinar',
        Component: React.lazy(() => import('./pages/WebinarPage')),
        entry: 'src/pages/WebinarPage.jsx',
      },
      {
        path: 'assess',
        Component: React.lazy(() => import('./pages/AssessPage')),
        entry: 'src/pages/AssessPage.jsx',
      },
    ],
  },
];

export default routes;
