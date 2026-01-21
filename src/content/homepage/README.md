# Homepage Content Collection

This collection contains structured content for all homepage sections following the 14-section design.

## Schema Overview

### hero.yaml
Main hero section content at the top of the homepage.

**Fields:**
- `headline` (string) - Main H1 headline with keyword + location + benefit
- `subheadline` (string) - Supporting headline text
- `trustLine` (string) - Trust signals (e.g., "Since 1994 • 4.8★ from 407+ reviews")
- `rebateMention` (string) - Rebate availability mention
- `ctaCopy` (string) - CTA button text
- `backgroundImage` (string) - Placeholder image identifier

### services-grid.yaml
Service category cards grid (Section 4).

**Fields:**
- `heading` (string) - Section heading
- `subheading` (string) - Section subheading
- `categories` (array) - List of 5 service categories
  - `title` (string) - Category name
  - `description` (string) - Brief description
  - `icon` (string) - Lucide icon name
  - `href` (string) - Link to category page
  - `accentColor` (string) - Color variant (heating, cooling, iaq, water, commercial)

### expert-consultation.yaml
Low-pressure consultation CTA section (Section 5).

**Fields:**
- `headline` (string) - Section heading
- `subheadline` (string) - Section subheading
- `trustBullets` (array of strings) - 4 trust bullets
- `ctaCopy` (string) - CTA button text
- `backgroundImage` (string) - Placeholder image identifier

### project-gallery.yaml
Project gallery showcase (Section 6).

**Fields:**
- `headline` (string) - Section heading
- `subheadline` (string) - Section subheading
- `projects` (array) - List of 6-8 project images
  - `image` (string) - Placeholder image identifier
  - `title` (string) - Project title
  - `location` (string) - Project location (city, ON)
  - `type` (string) - Project type description
  - `caseStudySlug` (string | null) - Link to case study if available
- `ctaText` (string) - Link text
- `ctaLink` (string) - Link URL

### family-story.yaml
Family business story and team section (Section 8).

**Fields:**
- `headline` (string) - Section heading
- `story` (string, markdown) - 2-3 paragraph story about the business
- `familyImage` (string) - Placeholder family photo identifier
- `teamMembers` (array) - List of 3-4 team members
  - `name` (string) - Team member name
  - `role` (string) - Job title/role
  - `image` (string) - Placeholder headshot identifier
- `ctaText` (string) - Link text
- `ctaLink` (string) - Link URL

### financing-preview.yaml
Financing options preview (Section 10).

**Fields:**
- `headline` (string) - Section heading
- `subheadline` (string) - Section subheading
- `rebateHighlight` (string) - Featured rebate mention
- `options` (array) - List of 3 financing options
  - `title` (string) - Option name
  - `description` (string) - Brief description
  - `icon` (string) - Lucide icon name
- `ctaText` (string) - Primary link text
- `ctaLink` (string) - Financing page URL
- `rebatesLink` (string) - Rebates page URL

### brand-ticker.yaml
Brand logo ticker (Section 3).

**Fields:**
- `label` (string) - Badge label (e.g., "Certified Dealer")
- `heading` (string) - Section heading
- `logos` (array) - List of 8+ brand logos
  - `src` (string) - Placeholder image identifier
  - `alt` (string) - Alt text
  - `brand` (string) - Brand name for placeholder display
- `speed` (string) - Animation speed: 'slow' | 'normal' | 'fast'

## Usage in Components

Import content in Astro components:

```astro
---
import { getEntry } from 'astro:content';

const hero = await getEntry('homepage', 'hero');
const servicesGrid = await getEntry('homepage', 'services-grid');
// etc.
---

<section>
  <h1>{hero.data.headline}</h1>
  <p>{hero.data.subheadline}</p>
</section>
```

## Image Placeholders

During development, all images use placeholder identifiers. These will be replaced with actual images from the client.

**Placeholder format:** `placeholder-[name]-[width]x[height]`

Examples:
- `placeholder-hero-1920x800`
- `placeholder-project-1-800x600`
- `placeholder-team-paul-400x400`

Components should render these as colored blocks with dimensions and labels for visual reference.

## Content Generation

Content will be generated using marketing skills:
- `/seo-content` - For keyword-optimized content
- `/direct-response-copy` - For CTA and conversion copy
- `/brand-voice` - To ensure consistent premium voice

See Phase D in the implementation plan for content generation workflow.
