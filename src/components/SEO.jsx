import { Head } from 'vite-react-ssg';

const SITE_URL = 'https://mvpclub.ai';
const SITE_NAME = 'MVP Club';
const DEFAULT_IMAGE = `${SITE_URL}/mvp-club-logo.jpeg`;

const SEO = ({ title, description, path = '/', type = 'website', jsonLd }) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - AI Adoption Coaching`;
  const url = `${SITE_URL}${path}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={DEFAULT_IMAGE} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Head>
  );
};

export default SEO;
