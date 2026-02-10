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
    ],
  },
];

export default routes;
