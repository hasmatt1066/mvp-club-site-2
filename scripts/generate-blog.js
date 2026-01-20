/**
 * Blog Static Site Generator
 *
 * Reads JSON blog posts from content/blog/ and generates static HTML pages.
 * Run automatically via `npm run prebuild` before Vite builds.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const OUTPUT_DIR = path.join(ROOT, 'public', 'blog');

// Brand colors (from theme-system.js default palette)
const COLORS = {
  primary: '#1a365d',
  secondary: '#115e59',
  accent: '#d97706',
  background: '#faf5f0',
  surface: '#ffffff',
};

/**
 * HTML template for individual blog posts
 */
function postTemplate(post) {
  const publishDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(post.title)} | MVP Club Blog</title>
  <meta name="description" content="${escapeHtml(post.description || '')}">
  <meta name="author" content="${escapeHtml(post.author)}">

  <!-- Open Graph -->
  <meta property="og:title" content="${escapeHtml(post.title)}">
  <meta property="og:description" content="${escapeHtml(post.description || '')}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://mvpclub.co/blog/${post.slug}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(post.title)}">
  <meta name="twitter:description" content="${escapeHtml(post.description || '')}">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Zilla+Slab&display=swap" rel="stylesheet">

  <!-- Schema.org Article markup -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${escapeHtml(post.title)}",
    "author": {
      "@type": "Person",
      "name": "${escapeHtml(post.author)}"
    },
    "datePublished": "${post.date}",
    "description": "${escapeHtml(post.description || '')}",
    "publisher": {
      "@type": "Organization",
      "name": "MVP Club",
      "url": "https://mvpclub.co"
    }
  }
  </script>

  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background-color: ${COLORS.background};
      color: ${COLORS.primary};
      line-height: 1.7;
      -webkit-font-smoothing: antialiased;
    }

    .nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: ${COLORS.surface};
      border-bottom: 1px solid rgba(26, 54, 93, 0.1);
      padding: 1rem 2rem;
      z-index: 100;
    }

    .nav-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-logo {
      font-family: 'Zilla Slab', serif;
      font-size: 1.5rem;
      color: ${COLORS.primary};
      text-decoration: none;
    }

    .nav-links a {
      color: ${COLORS.primary};
      text-decoration: none;
      margin-left: 2rem;
      font-weight: 500;
    }

    .nav-links a:hover {
      color: ${COLORS.accent};
    }

    main {
      max-width: 720px;
      margin: 0 auto;
      padding: 8rem 1.5rem 4rem;
    }

    .post-meta {
      margin-bottom: 2rem;
    }

    .post-pillar {
      display: inline-block;
      background: ${COLORS.accent};
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.25rem 0.75rem;
      border-radius: 2rem;
      margin-bottom: 1rem;
    }

    h1 {
      font-family: 'Zilla Slab', serif;
      font-size: 2.5rem;
      font-weight: 400;
      line-height: 1.2;
      color: ${COLORS.primary};
      margin-bottom: 1rem;
    }

    .post-info {
      color: ${COLORS.secondary};
      font-size: 0.95rem;
    }

    .post-info span {
      margin-right: 1rem;
    }

    .post-content {
      font-size: 1.1rem;
    }

    .post-content p {
      margin-bottom: 1.5rem;
    }

    .post-content h2 {
      font-family: 'Zilla Slab', serif;
      font-size: 1.75rem;
      font-weight: 400;
      color: ${COLORS.primary};
      margin: 2.5rem 0 1rem;
    }

    .post-content h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: ${COLORS.primary};
      margin: 2rem 0 0.75rem;
    }

    .post-content ul, .post-content ol {
      margin: 0 0 1.5rem 1.5rem;
    }

    .post-content li {
      margin-bottom: 0.5rem;
    }

    .post-content a {
      color: ${COLORS.accent};
      text-decoration: underline;
    }

    .post-content blockquote {
      border-left: 4px solid ${COLORS.accent};
      padding-left: 1.5rem;
      margin: 1.5rem 0;
      font-style: italic;
      color: ${COLORS.secondary};
    }

    .post-content strong {
      font-weight: 600;
    }

    .post-content figure.blog-image {
      margin: 2rem -120px;
      text-align: center;
    }

    .post-content figure.blog-image img {
      max-width: 100%;
      width: 960px;
      height: auto;
      border-radius: 0.5rem;
      display: block;
      margin: 0 auto;
    }

    @media (max-width: 1000px) {
      .post-content figure.blog-image {
        margin: 2rem -40px;
      }
      .post-content figure.blog-image img {
        width: calc(100% + 80px);
        max-width: calc(100vw - 2rem);
      }
    }

    @media (max-width: 640px) {
      .post-content figure.blog-image {
        margin: 2rem -1rem;
      }
      .post-content figure.blog-image img {
        width: calc(100% + 2rem);
        border-radius: 0;
      }
    }

    .post-content figure.blog-image figcaption {
      margin-top: 0.75rem;
      font-size: 0.9rem;
      color: ${COLORS.secondary};
      font-style: italic;
    }

    .post-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      font-size: 0.95rem;
    }

    .post-content thead {
      background: ${COLORS.primary};
      color: white;
    }

    .post-content th {
      padding: 0.75rem 1rem;
      text-align: left;
      font-weight: 600;
    }

    .post-content td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid rgba(26, 54, 93, 0.1);
    }

    .post-content tbody tr:nth-child(even) {
      background: rgba(26, 54, 93, 0.03);
    }

    .post-content tbody tr:hover {
      background: rgba(26, 54, 93, 0.06);
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: ${COLORS.secondary};
      text-decoration: none;
      font-weight: 500;
      margin-bottom: 2rem;
    }

    .back-link:hover {
      color: ${COLORS.accent};
    }

    .cta-section {
      background: ${COLORS.surface};
      border: 1px solid rgba(26, 54, 93, 0.1);
      border-radius: 1rem;
      padding: 2rem;
      margin-top: 3rem;
      text-align: center;
    }

    .cta-section h3 {
      font-family: 'Zilla Slab', serif;
      font-size: 1.5rem;
      font-weight: 400;
      margin-bottom: 0.75rem;
    }

    .cta-section p {
      color: ${COLORS.secondary};
      margin-bottom: 1.5rem;
    }

    .cta-button {
      display: inline-block;
      background: ${COLORS.accent};
      color: white;
      font-weight: 600;
      padding: 0.875rem 2rem;
      border-radius: 0.5rem;
      text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);
    }

    footer {
      text-align: center;
      padding: 3rem 1.5rem;
      color: ${COLORS.secondary};
      font-size: 0.9rem;
    }

    @media (max-width: 640px) {
      h1 { font-size: 1.875rem; }
      main { padding-top: 6rem; }
    }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="nav-content">
      <a href="/" class="nav-logo">MVP Club</a>
      <div class="nav-links">
        <a href="/">Home</a>
        <a href="/blog/">Blog</a>
        <a href="/#contact">Contact</a>
      </div>
    </div>
  </nav>

  <main>
    <a href="/blog/" class="back-link">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      Back to Blog
    </a>

    <article>
      <header class="post-meta">
        ${post.pillar ? `<span class="post-pillar">${escapeHtml(post.pillar)}</span>` : ''}
        <h1>${escapeHtml(post.title)}</h1>
        <div class="post-info">
          <span>By ${escapeHtml(post.author)}</span>
          <span>${publishDate}</span>
        </div>
      </header>

      <div class="post-content">
        ${post.content}
      </div>

      <div class="cta-section">
        <h3>Ready to transform your AI practice?</h3>
        <p>Join MVP Club and learn alongside peers who are navigating the same journey.</p>
        <a href="/#contact" class="cta-button">Get Started</a>
      </div>
    </article>
  </main>

  <footer>
    <p>&copy; ${new Date().getFullYear()} MVP Club. All rights reserved.</p>
  </footer>
</body>
</html>`;
}

/**
 * HTML template for blog listing page
 */
function listingTemplate(posts) {
  const postCards = posts.map(post => {
    const publishDate = new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    return `
      <a href="/blog/${post.slug}/" class="post-card">
        ${post.pillar ? `<span class="post-pillar">${escapeHtml(post.pillar)}</span>` : ''}
        <h2>${escapeHtml(post.title)}</h2>
        <p class="post-excerpt">${escapeHtml(post.description || '')}</p>
        <div class="post-card-meta">
          <span>${escapeHtml(post.author)}</span>
          <span>${publishDate}</span>
        </div>
      </a>
    `;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog | MVP Club</title>
  <meta name="description" content="Insights on AI adoption, practice-based learning, and human-AI collaboration from the MVP Club team.">

  <!-- Open Graph -->
  <meta property="og:title" content="MVP Club Blog">
  <meta property="og:description" content="Insights on AI adoption, practice-based learning, and human-AI collaboration.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://mvpclub.co/blog">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Zilla+Slab&display=swap" rel="stylesheet">

  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background-color: ${COLORS.background};
      color: ${COLORS.primary};
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    .nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: ${COLORS.surface};
      border-bottom: 1px solid rgba(26, 54, 93, 0.1);
      padding: 1rem 2rem;
      z-index: 100;
    }

    .nav-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-logo {
      font-family: 'Zilla Slab', serif;
      font-size: 1.5rem;
      color: ${COLORS.primary};
      text-decoration: none;
    }

    .nav-links a {
      color: ${COLORS.primary};
      text-decoration: none;
      margin-left: 2rem;
      font-weight: 500;
    }

    .nav-links a:hover {
      color: ${COLORS.accent};
    }

    main {
      max-width: 1000px;
      margin: 0 auto;
      padding: 8rem 1.5rem 4rem;
    }

    .page-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .page-header h1 {
      font-family: 'Zilla Slab', serif;
      font-size: 3rem;
      font-weight: 400;
      color: ${COLORS.primary};
      margin-bottom: 1rem;
    }

    .page-header p {
      font-size: 1.25rem;
      color: ${COLORS.secondary};
      max-width: 600px;
      margin: 0 auto;
    }

    .posts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .post-card {
      background: ${COLORS.surface};
      border-radius: 1rem;
      padding: 1.5rem;
      text-decoration: none;
      color: inherit;
      transition: transform 0.2s, box-shadow 0.2s;
      display: block;
    }

    .post-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(26, 54, 93, 0.1);
    }

    .post-card .post-pillar {
      display: inline-block;
      background: ${COLORS.accent};
      color: white;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.2rem 0.6rem;
      border-radius: 2rem;
      margin-bottom: 0.75rem;
    }

    .post-card h2 {
      font-family: 'Zilla Slab', serif;
      font-size: 1.375rem;
      font-weight: 400;
      color: ${COLORS.primary};
      margin-bottom: 0.75rem;
      line-height: 1.3;
    }

    .post-excerpt {
      color: ${COLORS.secondary};
      font-size: 0.95rem;
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .post-card-meta {
      font-size: 0.85rem;
      color: ${COLORS.secondary};
      display: flex;
      gap: 1rem;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: ${COLORS.secondary};
    }

    .empty-state h2 {
      font-family: 'Zilla Slab', serif;
      font-size: 1.5rem;
      font-weight: 400;
      margin-bottom: 1rem;
    }

    footer {
      text-align: center;
      padding: 3rem 1.5rem;
      color: ${COLORS.secondary};
      font-size: 0.9rem;
    }

    @media (max-width: 640px) {
      .page-header h1 { font-size: 2.25rem; }
      main { padding-top: 6rem; }
    }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="nav-content">
      <a href="/" class="nav-logo">MVP Club</a>
      <div class="nav-links">
        <a href="/">Home</a>
        <a href="/blog/">Blog</a>
        <a href="/#contact">Contact</a>
      </div>
    </div>
  </nav>

  <main>
    <header class="page-header">
      <h1>Blog</h1>
      <p>Insights on AI adoption, practice-based learning, and building effective human-AI teams.</p>
    </header>

    ${posts.length > 0 ? `
      <div class="posts-grid">
        ${postCards}
      </div>
    ` : `
      <div class="empty-state">
        <h2>Coming Soon</h2>
        <p>We're working on some great content. Check back soon!</p>
      </div>
    `}
  </main>

  <footer>
    <p>&copy; ${new Date().getFullYear()} MVP Club. All rights reserved.</p>
  </footer>
</body>
</html>`;
}

/**
 * Escape HTML entities
 */
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Main build function
 */
function build() {
  console.log('🔨 Building blog...\n');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Read index.json
  const indexPath = path.join(CONTENT_DIR, 'index.json');
  if (!fs.existsSync(indexPath)) {
    console.log('⚠️  No content/blog/index.json found. Creating empty blog listing.');
    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), listingTemplate([]));
    return;
  }

  const index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
  console.log(`📄 Found ${index.length} blog post(s)\n`);

  // Generate individual post pages
  const posts = [];
  for (const entry of index) {
    const postPath = path.join(CONTENT_DIR, `${entry.slug}.json`);

    if (!fs.existsSync(postPath)) {
      console.log(`⚠️  Skipping ${entry.slug}: JSON file not found`);
      continue;
    }

    const post = JSON.parse(fs.readFileSync(postPath, 'utf-8'));
    posts.push(post);

    // Create post directory and index.html for clean URLs
    const postOutputDir = path.join(OUTPUT_DIR, post.slug);
    if (!fs.existsSync(postOutputDir)) {
      fs.mkdirSync(postOutputDir, { recursive: true });
    }

    const html = postTemplate(post);
    fs.writeFileSync(path.join(postOutputDir, 'index.html'), html);
    console.log(`✅ Generated: /blog/${post.slug}/`);
  }

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Generate listing page
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), listingTemplate(posts));
  console.log(`✅ Generated: /blog/\n`);

  console.log(`🎉 Blog build complete! ${posts.length} post(s) generated.`);
}

// Run build
build();
