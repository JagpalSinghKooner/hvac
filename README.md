# B.A.P Heating & Cooling — Premium HVAC Website

> A premium, SEO-optimized website for B.A.P Heating & Cooling Services Ltd, targeting affluent homeowners across Southern Ontario for high-ticket HVAC installations.

---

## Project Overview

This website is a **lead generation asset** designed to:
- Position B.A.P as the premium installation partner (not emergency repair)
- Convert qualified visitors into phone calls for installation quotes
- Rank for high-intent installation keywords across 25 cities
- Build trust through accountability messaging, not urgency tactics

**Target Customer:** Affluent homeowners making $10K-$15K+ installation decisions who want accountability and peace of mind.

---

## Business Information

| Field | Value |
|-------|-------|
| **Company** | B.A.P Heating & Cooling Services Ltd |
| **Established** | 1994 |
| **Owner** | Paul Palmer |
| **Primary Location** | Guelph, ON |
| **Phone** | +1 519-835-4858 |
| **Email** | info@bapheating.ca |
| **Rating** | 4.8 stars (407+ Google reviews) |

### Service Scope
- **22 Services** across Heating, Cooling, Indoor Air Quality, Water Heating, and Commercial
- **25 Cities** across 6 regions in Southern Ontario
- **550+ Service-City Pages** for local SEO coverage

See [profile.yaml](src/content/business/profile.yaml) for complete business data.

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Framework** | [Astro](https://astro.build) 5.0 |
| **UI** | [React](https://react.dev) 19 + [Radix UI](https://www.radix-ui.com) |
| **Language** | TypeScript 5.6 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) 3.4 |
| **Icons** | [Lucide React](https://lucide.dev) |

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

---

## Project Structure

```
src/
├── content/                 # Content collections (Astro)
│   ├── business/           # Business profile (single source of truth)
│   ├── services/           # 22 service pages
│   ├── locations/          # 25 location pages
│   ├── service-city/       # 550 service-location pages
│   ├── regions/            # 6 regional groupings
│   ├── blog/               # Blog posts
│   ├── faqs/               # FAQ items
│   ├── case-studies/       # Case studies
│   ├── reviews/            # Customer reviews
│   ├── homepage/           # Homepage section content (NEW)
│   └── service-categories/ # Category landing pages (NEW)
├── components/             # Astro & React components
├── pages/                  # Astro pages (routes)
├── layouts/                # Layout templates
├── lib/                    # Utility functions
└── styles/                 # Global styles

.claude/
└── skills/                 # Marketing skills for content generation
```

---

## URL Architecture

| Page Type | Pattern | Example |
|-----------|---------|---------|
| Homepage | `/` | `/` |
| Service | `/services/[service]` | `/services/furnace-installation` |
| Location | `/locations/[location]` | `/locations/guelph` |
| Service-City | `/services/[service]-[location]-on` | `/services/furnace-installation-guelph-on` |
| Category | `/services/category/[category]` | `/services/category/heating` |
| Blog | `/blog/[slug]` | `/blog/heat-pump-guide` |
| Rebates | `/rebates` | `/rebates` |

---

## Content Management

All content lives in **Astro Content Collections** at `/src/content/`.

### Single Source of Truth
The [business profile](src/content/business/profile.yaml) contains:
- Company information and contact details
- Service definitions (22 services by category)
- Geographic coverage (25 cities across 6 regions)
- Trust signals, warranties, certifications
- Brand voice and copy templates

**Rule:** Never hardcode business data in templates. Reference the profile.

---

## Marketing Skills

This project uses AI marketing skills in `.claude/skills/` for content generation:

| Skill | Purpose |
|-------|---------|
| `/positioning-angles` | Differentiate from competitors |
| `/keyword-research` | Find installation-intent keywords |
| `/brand-voice` | Define premium voice profile |
| `/seo-content` | Generate SEO-optimized page content |
| `/direct-response-copy` | Write conversion-focused copy |

**Execution Order:** positioning-angles → keyword-research → brand-voice → seo-content → direct-response-copy

---

## Key Principles

### Premium Positioning (Not Emergency)
- Accountability and peace of mind messaging
- High-ticket installation focus ($10K-$15K+)
- Research-mode user experience
- Single CTA: Phone call only

### Aesthetic
- NO gradient borders or buttons
- Generous, luxurious spacing
- Premium but accessible (not alienating)
- Solid color placeholders until real images available

### SEO Strategy
- Service-based: "furnace installation", "AC installation"
- Location-based: "HVAC Guelph", "heating Kitchener"
- 550+ service-city combinations for local dominance
- 80%+ unique content per page (no city-swapping)

---

## Implementation Status

**Current Phase:** Homepage Redesign Implementation

See [HOMEPAGE-REDESIGN-FULL-AND-FINAL.md](HOMEPAGE-REDESIGN-FULL-AND-FINAL.md) for:
- Complete 14-section homepage flow
- New components to build
- Content schema definitions
- SEO and internal linking strategy
- Build phases and verification checklist

---

## Contact

**B.A.P Heating & Cooling Services Ltd**
- Phone: +1 519-835-4858
- Email: info@bapheating.ca

---

**Built for long-term SEO performance and qualified lead generation.**
