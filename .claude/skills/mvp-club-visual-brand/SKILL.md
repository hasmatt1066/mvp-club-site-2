---
name: mvp-club-visual-brand
description: Use when creating designs, visual assets, UI components, or any visual materials for MVP Club. Provides color palette, typography, and design guidelines.
---

# MVP Club Visual Brand Guide

Use this skill when creating any visual designs, UI components, presentations, social media graphics, or visual assets for MVP Club.

---

## Color System: The Dusk Palette

MVP Club uses a warm, professional color system called the "Dusk Palette" - evoking the transition moment between day and night, reflecting the transformation journey we guide clients through.

### Primary Colors

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Primary** | Deep Navy | `#081f3f` | Headers, navigation, primary buttons, text on light backgrounds |
| **Secondary** | Slate Blue | `#15465b` | Stats sections, accent areas, secondary buttons |
| **Accent** | Warm Amber | `#d97706` | CTAs, badges, highlights, interactive elements |
| **Accent Soft** | Golden Yellow | `#eba714` | Decorative accents, icons, subtle highlights |
| **Background** | Warm Stone | `#faf5f0` | Page backgrounds, creates warmth |
| **Surface** | White | `#ffffff` | Cards, content areas, modals |

### Color Variants

Each base color has programmatic variants:

| Variant | Modification | Use Case |
|---------|--------------|----------|
| `-lifted` | +15% lightness | Text on dark backgrounds |
| `-tint` | 15% opacity | Subtle background overlays |
| `-tint-solid` | +40% lightness | Card backgrounds, hover states |
| `-dark` | -10% lightness | Pressed states, emphasis |
| `-muted` | 70% opacity | Secondary text, disabled states |

### Color Usage Rules

**DO:**
- Use Primary (navy) for headers and main navigation
- Use Accent (amber) for all call-to-action buttons
- Use Background (warm stone) for page backgrounds
- Use white for content cards and surfaces
- Use Secondary (slate blue) for supporting sections

**DON'T:**
- Use pure black (`#000000`) - use Primary navy instead
- Use pure white for backgrounds - use Warm Stone
- Use accent colors for large background areas
- Mix warm and cool tones without purpose

---

## Typography

### Font Stack

| Purpose | Font | Weights | Usage |
|---------|------|---------|-------|
| **Display** | Zilla Slab | Regular (400) ONLY | Headlines, page titles, hero text |
| **Body** | Inter | Regular (400), Semi-bold (600) | All body copy, UI text, buttons |

### Typography Rules

**Zilla Slab (Display):**
- Use for headlines and major section titles ONLY
- NEVER use bold weight - Regular only
- Creates formal authority without coldness
- Pairs with the professional yet warm brand tone

**Inter (Body):**
- All paragraph text, buttons, labels, navigation
- Regular (400) for body copy
- Semi-bold (600) for emphasis, button text, labels

### Hierarchy

```
H1: Zilla Slab Regular, 48-64px
H2: Zilla Slab Regular, 36-48px
H3: Zilla Slab Regular, 24-32px
Body: Inter Regular, 16-18px
Small: Inter Regular, 14px
Button: Inter Semi-bold, 16px
```

---

## Visual Tone

### Emotional Foundation

The MVP Club visual identity should feel:

- **Warm and approachable** - Not cold corporate
- **Professional and credible** - Not playful or casual
- **Human-centered** - People, not technology, are the focus
- **Premium without being exclusive** - Quality without elitism
- **Transformational** - Movement, growth, change

### Design Principles

1. **Authority without coldness** - Professional expertise delivered with warmth
2. **Clarity over decoration** - Every element serves a purpose
3. **White space is intentional** - Let content breathe
4. **Consistent rhythm** - Predictable spacing and alignment
5. **Subtle animation** - Movement that supports, never distracts

---

## Imagery Guidelines

### Photography Style

**DO:**
- Real people in authentic work environments
- Warm, natural lighting
- Diverse representation
- Collaborative scenes (people working together)
- Detail shots that show the human element

**DON'T:**
- Generic stock photography (people pointing at screens)
- Cold, clinical environments
- Technology-focused imagery without humans
- Overly polished, artificial compositions
- AI-generated faces or obvious AI imagery

### Illustrations & Icons

- Use Lucide icon library for UI icons
- Simple, line-based illustrations
- Warm accent colors for icon fills
- Consistent stroke weights
- Human elements where possible

---

## Component Patterns

### Buttons

**Primary CTA:**
- Background: Accent (`#d97706`)
- Text: White
- Hover: Accent Dark
- Font: Inter Semi-bold

**Secondary:**
- Background: Transparent
- Border: Primary (`#081f3f`)
- Text: Primary
- Hover: Primary background, white text

### Cards

- Background: White (`#ffffff`)
- Border-radius: 8-12px
- Shadow: Subtle, warm-toned
- Hover: Slight lift, deeper shadow
- Padding: Generous (24-32px)

### Navigation

- Background: Primary (`#081f3f`)
- Text: White
- Active/Hover: Accent lifted (`#fbbf24`)
- Logo: Full color on dark background

### Sections

- Alternate between:
  - Warm Stone background with navy text
  - Primary (navy) background with white/gold text
- Use Secondary (slate blue) sparingly for stats/data sections

---

## Spacing & Layout

### Spacing Scale

```
4px   - Micro (icon padding)
8px   - XSmall (related elements)
16px  - Small (within components)
24px  - Medium (between related sections)
32px  - Large (between components)
48px  - XLarge (major sections)
64px  - XXLarge (page sections)
```

### Container

- Max-width: 1200-1400px
- Padding: 24px (mobile), 48px (desktop)
- Content centered

### Grid

- 12-column grid for complex layouts
- Single column for focused content
- Generous gutters (24-32px)

---

## Animation & Motion

### Principles

- **Purpose-driven** - Animation should guide, not distract
- **Subtle** - Barely noticeable, smoothly professional
- **Consistent** - Same timing curves throughout

### Specifications

- **Duration:** 200-300ms for micro-interactions
- **Easing:** Ease-out for entrances, ease-in-out for state changes
- **Scroll animations:** Fade-in with slight upward movement

### What to Animate

- Button hover states
- Card hover lifts
- Section fade-ins on scroll
- Navigation transitions
- Loading states

### What NOT to Animate

- Text content
- Critical information
- Anything that could cause motion sickness
- Decorative animations that loop indefinitely

---

## Accessibility Requirements

### Color Contrast

- All text must meet WCAG AA standards (4.5:1 for body, 3:1 for large text)
- The Dusk palette is designed for accessibility
- Use `-lifted` variants for text on dark backgrounds

### Typography

- Minimum body text: 16px
- Line height: 1.5-1.6 for body copy
- Maximum line length: 65-75 characters

### Interactive Elements

- Minimum touch target: 44x44px
- Clear focus states
- Keyboard navigable

---

## What to Avoid

### Colors
- Pure black (`#000000`)
- Bright neon colors
- Purple as primary (conflicts with coaching warmth)
- Cold grays without warmth
- Overly saturated colors

### Typography
- Bold Zilla Slab (never)
- All caps for body text
- More than 2 font families
- Decorative or script fonts

### Visual Style
- Cold, sterile tech aesthetics
- Generic startup look (bright colors, playful illustrations)
- Cluttered layouts
- Stock photo clichés
- Over-designed elements

### Imagery
- Robots or AI imagery without humans
- Futuristic/sci-fi aesthetics
- Fear-inducing visuals
- Corporate boardroom clichés

---

## Quick Reference: Visual Brand Check

Before finalizing any visual asset, verify:

1. **Does it use Dusk palette colors correctly?**
2. **Is Zilla Slab Regular only (never bold)?**
3. **Does it feel warm and professional, not cold or casual?**
4. **Is there adequate white space?**
5. **Would a skeptical professional find it credible?**

If yes to all five, it's on-brand.
