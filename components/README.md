# Landing Page Components

This directory contains React components for the BuildFlow landing page.

## Components

### StickyCTA.tsx
A mobile-only sticky call-to-action that appears after scrolling and hides when the main CTA section is visible.

**Props:**
- `label: string` - Button text
- `href: string` - Link destination

**Features:**
- Mobile-only (hidden at ≥1024px)
- Fixed positioning with safe-area awareness
- IntersectionObserver for visibility control
- Full accessibility support

**Usage:**
```tsx
import StickyCTA from './components/StickyCTA';
import { landingCopy } from '../content/landingCopy';

<StickyCTA 
  label={landingCopy.finalCta.cta} 
  href="#cta-section" 
/>
```

### FAQAccordion.tsx
An accessible accordion component for FAQ items with keyboard navigation and ARIA support.

**Props:**
- `items: FAQItem[]` - Array of FAQ items from landingCopy

**Features:**
- Full keyboard navigation (Enter, Space, Arrow keys)
- ARIA attributes for screen readers
- Respects `prefers-reduced-motion`
- Smooth animations (when motion is allowed)

**Usage:**
```tsx
import FAQAccordion from './components/FAQAccordion';
import { landingCopy } from '../content/landingCopy';

<FAQAccordion items={landingCopy.faq} />
```

## Integration Notes

These components are designed to work with the existing `landingCopy.ts` content management system. They render text verbatim without any modifications.

To integrate into your current static HTML site, you would need to:
1. Convert to React/Next.js, or
2. Implement equivalent functionality in vanilla JavaScript

## Accessibility Features

- **StickyCTA**: Proper focus management, keyboard navigation, screen reader support
- **FAQAccordion**: ARIA expanded/controls, keyboard navigation, reduced motion support
- Both components follow WCAG 2.1 AA guidelines
