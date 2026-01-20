# B.A.P Heating & Cooling Services — SEO-First Website

> An SEO-optimized, high-performance website for B.A.P Heating & Cooling Services Ltd, serving 30+ cities across 6 regions in Southern Ontario with 24/7 residential and commercial HVAC services.

---

## Project Overview

This project is an **SEO-first website** designed to:
- Rank strongly in local organic search for HVAC services
- Convert qualified visitors into booked service calls
- Build trust and credibility with homeowners and commercial customers
- Scale cleanly as services, locations, and content expand

**Not a brochure.** This website is a **core revenue channel** and **defensible SEO asset**.

---

## Business Information

- **Company:** B.A.P Heating & Cooling Services Ltd
- **Established:** 1994
- **Owner:** Paul Palmer
- **Primary Location:** Guelph, ON
- **Phone:** +1 519-835-4858
- **Email:** info@bapheating.ca
- **Rating:** 4.8 stars from 407 Google reviews

### Service Scope
- **20 Active Services** across Heating, Cooling, Indoor Air Quality, Water Heating, and Commercial HVAC
- **30+ Cities** across Wellington County, Waterloo Region, Halton Region, Peel Region, Hamilton & Brant, and Dufferin County
- **24/7 Emergency Service** with typical 60-minute response time

See [business profile](src/content/business/profile.yaml) for complete service and location details.

---

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | [Astro](https://astro.build) | 5.0.0 |
| **UI Framework** | [React](https://react.dev) | 19.2.3 |
| **Language** | [TypeScript](https://www.typescriptlang.org) | 5.6.0 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) | 3.4.19 |
| **Components** | [Radix UI](https://www.radix-ui.com) + shadcn/ui patterns | - |
| **Icons** | [Lucide React](https://lucide.dev) | 0.562.0 |

**Why Astro?** Static generation for exceptional SEO performance, content collections for structured data, and fast builds at scale (~700 pages).

---

## Quick Start

### Prerequisites
- Node.js 18+ (or compatible runtime)
- pnpm (preferred) or npm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd HVAC

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Commands
```bash
pnpm dev        # Start dev server (http://localhost:4321)
pnpm build      # Build for production (with type checking)
pnpm preview    # Preview production build
pnpm astro      # Run Astro CLI commands
```

---

## Project Structure

```
/documents/                 # Source of truth documentation
  /specs/                   # Feature specifications
  /decisions/               # Architectural Decision Records (ADRs)
  project-details.md        # Product Requirements Document (PRD)
  roadmap-phases            # Master phase definitions (Phase 0-9)

/roadmap/                   # Execution and progress tracking
  /phase-0-product-seo-strategy/
  /phase-1-technical-foundation/
  ... (10 phases total)

/src/
  /content/                 # Content collections (Astro)
    /business/              # Business profile (single source of truth)
    /services/              # 20 service pages
    /locations/             # 30+ location pages
    /regions/               # 6 region pages
    /blog/                  # Blog posts
    /faqs/                  # FAQ items
    /case-studies/          # Case studies
  /components/              # Astro & React components
  /pages/                   # Astro pages (routes)
  /layouts/                 # Layout templates
  /lib/                     # Utility functions
  /styles/                  # Global styles
```

**Key Principle:** Specifications live in `/documents/`, execution tracking lives in `/roadmap/`.

See [documents/README.md](documents/README.md) for governance rules.

---

## Content Management

All content is managed through **Astro Content Collections** in `/src/content/`.

### Business Profile
The [business profile](src/content/business/profile.yaml) is the **single source of truth** for:
- Company information (name, contact, hours, locations)
- Service definitions (20 services organized by category)
- Geographic coverage (30+ cities across 6 regions)
- Trust signals (reviews, warranties, certifications)
- Brand voice and copy templates

**Rule:** Never hardcode business information in templates. Always reference the business profile.

### Content Types
- **Services:** 20 active services (furnace, AC, heat pumps, etc.)
- **Locations:** 30+ cities in Southern Ontario
- **Regions:** 6 regional groupings
- **Blog:** Educational and seasonal content
- **FAQs:** Common questions and answers
- **Case Studies:** Customer success stories

---

## URL Architecture

**Pattern:** `/services/{service}-{location}-on`

### Examples
- Service page: `/services/furnace-repair`
- Location page: `/locations/guelph`
- Service-Location page: `/services/furnace-repair-guelph-on`
- Region page: `/regions/wellington-county`
- Blog post: `/blog/{slug}`

**Scale:** At full coverage, this architecture supports:
- 600+ service-location combinations (20 services × 30 locations)
- 20 service pages
- 30+ location pages
- 6 region pages
- Supporting content (blog, FAQs, about, contact)
- **Total: ~700+ pages**

See [ADR-002](documents/decisions/002-url-pattern-services-prefix.md) for the architectural decision behind this pattern.

---

## Development Workflow

### Phase-Based Delivery
This project follows a **10-phase delivery model** (Phase 0 → Phase 9).

Each phase:
1. Has a clear purpose, focus, and outcomes (see [roadmap-phases](documents/roadmap-phases))
2. Must be completed sequentially (no skipping phases)
3. Is only "done" when: project builds, site runs without errors, acceptance criteria met

See [roadmap/README.md](roadmap/README.md) for execution governance.

### Definition of "Done"
A phase is complete only when **all three conditions** are met:
1. ✓ The project builds successfully (no build errors)
2. ✓ The site runs without errors (no runtime errors)
3. ✓ All acceptance criteria are met (defined per phase)

### Making Decisions
Architectural and technical decisions must be recorded as **ADRs** in `/documents/decisions/`.

See [decisions/README.md](documents/decisions/README.md) for the ADR process.

---

## Key Principles

### SEO-First
- Structure and consistency drive SEO, not one-off optimization
- Service-based SEO (furnace repair, AC installation)
- Location-based SEO (Guelph, Kitchener, Burlington)
- Service-location combinations at scale

### Scalability
- Add new services without rework
- Add new service areas at scale
- Expand content volume significantly
- Iterate on design without structural changes

### Clarity & Trust
- Clear, professional appearance
- Strong trust signals (reviews, certifications, warranties)
- Easy contact and booking pathways
- Transparent recommendations

### Maintainability
- Content updates don't require code changes
- Business-critical information never hardcoded
- Clean architecture, avoid framework lock-in
- Fast, lightweight, minimal JavaScript

---

## Documentation

- **[Product Requirements](documents/project-details.md)** — Business goals, SEO strategy, success metrics
- **[Roadmap Phases](documents/roadmap-phases)** — 10-phase delivery model
- **[Governance Rules](documents/README.md)** — Source of truth philosophy
- **[Execution Tracking](roadmap/README.md)** — How roadmap works
- **[Decision Records](documents/decisions/)** — Architectural decisions (ADRs)
- **[Specifications](documents/specs/)** — Feature and technical specs

---

## Current Status

**Phase:** Pre-Phase 0 (Structure Finalization)

**Readiness:** 85% governance-ready
- ✓ Governance structure established
- ✓ Business scope defined (20 services, 30+ locations)
- ✓ Existing content audited
- ⚠️ Specifications in progress
- ⚠️ Phase 0 tasks not yet defined

**Next Steps:**
1. Create feature specifications (page types, URL architecture, content model, SEO)
2. Record architectural decisions (Astro framework, URL pattern)
3. Break down Phase 0 into tasks
4. Begin Phase 0 execution (SEO Strategy Lock)

---

## Contributing

This project follows strict governance rules to ensure quality and scalability.

**Before making changes:**
1. Read the [governance documentation](documents/README.md)
2. Understand the current phase (see [roadmap-phases](documents/roadmap-phases))
3. Ensure changes align with specifications
4. Record architectural decisions as ADRs when applicable

**Pull Requests:**
- Must pass type checking (`pnpm build`)
- Must not introduce runtime errors
- Must reference relevant specifications or ADRs
- Must align with current phase goals

---

## License

[Specify license or mark as proprietary]

---

## Contact

For questions about this project, contact Paul Palmer at B.A.P Heating & Cooling Services Ltd.

- **Phone:** +1 519-835-4858
- **Email:** info@bapheating.ca
- **Website:** [To be deployed]

---

**Built with care for long-term SEO performance and business growth.**
