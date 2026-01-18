# MVP Club Website - Technical Readout

> For developers integrating external blog content into the site

---

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | 18.3.1 |
| Build Tool | Vite | 6.0.3 |
| Styling | Tailwind CSS | 3.4.19 |
| Icons | Lucide React | 0.460.0 |
| Color Utils | color2k | 2.0.3 |
| CSS Processing | PostCSS + Autoprefixer | 8.5.6 / 10.4.23 |

**Module Type:** ES Modules (`"type": "module"` in package.json)

---

## Project Structure

```
mvp-club-site-2/
├── src/
│   ├── main.jsx                 # React app entry point
│   ├── mvp-club-site.jsx        # Main application component (all sections)
│   ├── index.css                # Tailwind imports
│   ├── theme-system.js          # Dynamic color palette system
│   ├── WorkLoop.jsx             # Interactive methodology visualization
│   ├── AnimatedValley.jsx       # Journey section animation
│   ├── ElementHelix.jsx         # 3D helix visualization
│   └── ColorExplorer.jsx        # Dev-only theme switcher
├── index.html                   # HTML entry point
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS plugins
└── package.json                 # Dependencies and scripts
```

---

## Routing

**Type:** Single Page Application (SPA) with anchor-based navigation

There is **no router library** (no React Router). Navigation is handled via:
- Smooth scroll to section IDs
- `Element.scrollIntoView({ behavior: 'smooth' })`

**Current Sections:**
| Section ID | Label |
|------------|-------|
| `#hero` | Home |
| `#problem` | The Problem |
| `#journey` | Journey |
| `#philosophy` | Philosophy |
| `#methodology` | Methodology |
| `#organizations` | Organizations |
| `#practitioners` | Practitioners |
| `#team` | Team |
| `#testimonials` | Testimonials |
| `#contact` | Contact |

### Adding a Blog Route

To add a `/blog` page, you'll need to:
1. Install React Router: `npm install react-router-dom`
2. Wrap the app in `<BrowserRouter>`
3. Create route structure separating the landing page from blog pages

---

## Component Architecture

**Pattern:** All sections live in `mvp-club-site.jsx` as one large component with extracted sub-components for complex visualizations.

```
MVPClubWebsite (root)
├── Navigation (inline, fixed header)
├── AnimatedSection (reusable wrapper for fade-in animations)
├── [All page sections inline]
├── ElementHelix (imported)
├── AnimatedValley (imported)
├── WorkLoop (imported)
└── ColorExplorer (imported, dev tool)
```

**Animation Pattern:** Uses Intersection Observer for scroll-triggered fade-in animations.

---

## Styling Approach

### Tailwind CSS
- Utility classes for layout, spacing, responsive design
- Breakpoints: `md:` (768px), `lg:` (1024px)
- Max content width: `max-w-7xl`

### Dynamic Theme System
Colors are managed through CSS custom properties, not Tailwind config:

```javascript
// theme-system.js exports
applyTheme(palette)           // Apply a color palette
getTheme()                    // Get current theme from CSS vars
palettes                      // 25+ predefined color palettes
```

**CSS Variables Available:**
- `--color-primary`
- `--color-secondary`
- `--color-accent`
- `--color-background`
- `--color-lifted`
- `--color-tint`
- `--color-tintSolid`
- `--color-dark`
- `--color-muted`

**Usage in JSX:**
```jsx
<div style={{ backgroundColor: 'var(--color-primary)' }}>
```

### Fonts
- **Display:** Zilla Slab (serif) - `.font-display`
- **Body:** Inter (sans-serif) - `.font-body`
- Loaded via Google Fonts in `index.css`

---

## Data & Content Patterns

**Current State:** All content is static/hardcoded in JSX.

```javascript
// Example: Content as inline data
const teamMembers = [
  { name: 'Ryan', role: '...', bio: '...', expertise: [...] },
  // ...
];

// Rendered via map
{teamMembers.map(member => <TeamCard {...member} />)}
```

**No existing:**
- API calls
- Data fetching utilities
- CMS integration
- Environment variables for content

---

## Build & Deployment

### NPM Scripts
```bash
npm run dev      # Start dev server (Vite)
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

### Build Output
- Static files in `dist/`
- Uses `vite-react-ssg` for static site generation with SSR

### Production Deployment (Vercel)
- **Host:** Vercel
- **Domain:** mvpclub.ai
- **Source Branch:** `main`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

Vercel automatically deploys on push to `main`. The site includes serverless API functions (e.g., `/api/generate-usecase` for the AI generator).

> **Note:** The `gh-pages` branch exists but is deprecated. Do not deploy from it - it lacks the API functions.

---

## Known Issues & Fixes

### Mobile Carousel Content Clipping (Fixed Jan 2026)
**Issue:** HeroCarousel wasn't showing full content on mobile - the stacked Old Way → Coaching → New Way cards were being clipped.

**Root Cause:**
- Container had `overflow-hidden` at all breakpoints but only had fixed height (`h-80`) at desktop (`md:`)
- Mobile content div had `max-h-full` which doesn't work without a parent height
- Content was clipped on mobile

**Fix:** `src/components/hero/HeroCarousel.jsx`
```jsx
// Container: only apply overflow-hidden at desktop
className="relative md:h-80 md:overflow-hidden rounded-2xl bg-white"

// Mobile content: removed height constraints
className="md:hidden w-full space-y-4"
```

### React Hydration Warnings
**Issue:** Console shows React hydration errors (#425, #418, #423) about server/client mismatch.

**Root Cause:** `AnimatedValley.jsx` has state that differs between SSR and client:
- `isMobile` starts as `false` during SSR, changes on client based on `window.innerWidth`
- `themeColors` reads from CSS variables which aren't available during SSR

**Status:** Low priority - doesn't affect functionality, just console warnings. Fix would require suppressing hydration on affected elements or deferring client-only state.

---

## Integration Points for Blog

### Recommended Approach

1. **Add React Router** for `/blog` and `/blog/:slug` routes
2. **Create blog components:**
   - `src/pages/Blog.jsx` - Blog listing page
   - `src/pages/BlogPost.jsx` - Individual post page
   - `src/components/BlogCard.jsx` - Post preview card

3. **Data fetching options:**
   - Fetch from external CMS API at runtime
   - Build-time static generation (would require switching to Next.js/Astro)
   - Hybrid: Fetch on page load with loading states

4. **Styling consistency:**
   - Use existing Tailwind utilities
   - Apply theme via CSS variables for brand consistency
   - Use Lucide icons for iconography

### Example Blog Page Structure

```jsx
// src/pages/Blog.jsx
import { useEffect, useState } from 'react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('YOUR_CMS_API_ENDPOINT/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="font-display text-4xl mb-8"
          style={{ color: 'var(--color-primary)' }}>
        Blog
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## Key Files to Reference

| File | Purpose |
|------|---------|
| `src/mvp-club-site.jsx` | Main component, see section patterns |
| `src/theme-system.js` | Color palette system |
| `src/index.css` | Font imports, Tailwind directives |
| `tailwind.config.js` | Tailwind setup |
| `vite.config.js` | Build configuration |

---

## Environment & Versions

- **Node:** Any modern LTS (no `.nvmrc` specified)
- **Package Manager:** npm (lockfile present)
- **Production Branch:** `main` (deployed via Vercel)
- **Deprecated Branch:** `gh-pages` (static files only, no API)

---

## Questions for Blog Integration

1. **CMS Choice:** What platform will host the blog content? (Ghost, Contentful, Sanity, Strapi, etc.)
2. **Build Strategy:**
   - Runtime fetch (current React SPA approach)
   - Static generation (would need framework change)
3. **URL Structure:** `/blog`, `/posts`, `/articles`?
4. **SEO Requirements:** Will need meta tags, OG images - consider adding `react-helmet`

---

## Quick Start for Development

```bash
# Clone and install
git clone [repo-url]
cd mvp-club-site-2
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Dev server runs at `http://localhost:5173` by default.
