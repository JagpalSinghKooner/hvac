# Claude Project Context — B.A.P Heating & Cooling

> Read this file completely before starting any work on this project.

---

## Project Summary

**What:** Premium HVAC website for B.A.P Heating & Cooling Services Ltd
**Where:** Southern Ontario, Canada (25 cities across 6 regions)
**Goal:** Generate qualified phone leads for high-ticket installations ($10K-$15K+)

**Single Source of Truth:** [HOMEPAGE-REDESIGN-FULL-AND-FINAL.md](HOMEPAGE-REDESIGN-FULL-AND-FINAL.md)

---

## Critical Business Context

### Target Customer
- **Affluent homeowners** making major HVAC investment decisions
- Research-mode buyers who want peace of mind, not urgency
- Price is NOT the concern — accountability and trust ARE

### Value Proposition
> "A wealthy homeowner chooses B.A.P because they don't want to manage decisions, risk, or follow-ups. They want a company with enough history and judgment to make the right call the first time, install it properly, and stand behind it years later without excuses."

### The Pivot (DO NOT FORGET)
| WRONG (Old Focus) | RIGHT (Current Focus) |
|-------------------|----------------------|
| Emergency/repair messaging | Premium installation positioning |
| 24/7 urgency tactics | Accountability and peace of mind |
| "3 slots available" scarcity | Research-friendly experience |
| Multiple CTAs | Single CTA: Phone call only |
| Problem-agitation copy | Trust and expertise copy |

---

## Technical Stack

| Layer | Technology |
|-------|------------|
| Framework | Astro 5.0 (static generation) |
| UI | React 19 + Radix UI + shadcn/ui components |
| Language | TypeScript 5.6 |
| Styling | Tailwind CSS 3.4 (CSS variables + shadcn neutral theme) |
| Icons | Lucide React |
| Content | Astro Content Collections (Zod validated) |
| Design | `/frontend-design` skill + shadcn MCP |

### Foundation (COMPLETE ✓)
- ✅ shadcn MCP server connected
- ✅ CSS variables configured (neutral theme)
- ✅ Tailwind theme extended with shadcn colors
- ✅ Core shadcn components installed: button, card, badge, separator, accordion, carousel, dialog, sheet
- ✅ Build verified passing (622 pages)

### Key Files
- **Business data:** `src/content/business/profile.yaml` (single source of truth)
- **Content schema:** `src/content/config.ts`
- **Homepage:** `src/pages/index.astro`
- **Components:** `src/components/`
- **MCP config:** `.mcp.json` (shadcn server)

---

## ⚠️ MANDATORY WORKFLOW ENFORCEMENT

**CRITICAL**: The workflows documented in this file are MANDATORY. DO NOT deviate from these processes.

### RULE #1: RALPH FIRST (NO EXCEPTIONS)

```
┌─────────────────────────────────────────────────────────────────┐
│  EVERY TASK MUST GO THROUGH RALPH                               │
│                                                                 │
│  1. /prd skill    → Create PRD with user stories               │
│  2. /ralph skill  → Convert to prd.json                        │
│  3. pnpm ralph    → Execute autonomously                       │
│                                                                 │
│  NO TASK STARTS WITHOUT THIS SEQUENCE                          │
└─────────────────────────────────────────────────────────────────┘
```

### Skills Usage Requirements (Within Ralph Stories)

1. **Ralph Orchestration** (REQUIRED — FIRST):
   - **MUST create PRD** via `/prd` skill before ANY work begins
   - **MUST convert to prd.json** via `/ralph` skill
   - **MUST execute via** `pnpm ralph` — NO manual execution

2. **Design & Development Work** (REQUIRED — Within Ralph):
   - **MUST use `/frontend-design` skill** for ALL component creation
   - **MUST use `/agent-browser` skill** for ALL testing after implementation
   - **MUST use `/vercel-react-best-practices` skill** for ALL React components before committing
   - **MUST use `/web-design-guidelines` skill** for ALL user-facing pages before committing

3. **Marketing Work** (REQUIRED — Within Ralph):
   - **MUST use `/orchestrator` skill** when starting any marketing task (unless skill is already determined)
   - **MUST follow skill dependency chain** (orchestrator will guide you)
   - **DO NOT skip** foundation skills (brand-voice, positioning-angles) if missing

4. **Complex Features** (RECOMMENDED):
   - **SHOULD use `/compound-engineering` workflow** for multi-step features within Ralph stories

### Workflow Violation Consequences

❌ **DO NOT**:
- Start ANY task without PRD + prd.json
- Execute skills outside Ralph context
- Skip `/frontend-design` and write components manually
- Skip `/agent-browser` testing before committing
- Skip code review skills (`/vercel-react-best-practices`, `/web-design-guidelines`)
- Deviate from Phase 2 build process steps
- Bypass skill dependency chains in marketing work

✅ **ALWAYS**:
- Create PRD first (/prd skill)
- Convert to prd.json (/ralph skill)
- Execute via pnpm ralph
- Invoke skills within Ralph story context
- Follow documented workflow sequences
- Complete all steps before moving to next phase
- Run quality checks before committing

**Reminder**: These skills exist to ensure quality, consistency, and maintainability. Skipping them introduces technical debt and quality issues.

---

## Ralph-First Workflow (MANDATORY)

**CRITICAL**: ALL development tasks MUST go through Ralph. NO exceptions.

### The Rule

```
NO TASK STARTS WITHOUT:
1. A PRD (created via /prd skill)
2. A prd.json (created via /ralph skill)
3. Execution via pnpm ralph
```

### Why This Matters

- **Accountability**: Every task is documented with acceptance criteria
- **Consistency**: Same workflow for every feature, every time
- **Quality**: Built-in quality gates (pnpm build must pass)
- **Memory**: Progress tracked across iterations
- **Parallelism**: Multiple stories can execute within single Ralph run

### The Mandatory Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 1: PLAN                                                        │
│  /prd skill → Creates tasks/prd-[feature].md                        │
│  - Define user stories                                               │
│  - Set acceptance criteria                                           │
│  - Size stories (one context window each)                           │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 2: CONVERT                                                     │
│  /ralph skill → Creates prd.json from PRD                           │
│  - Validates story sizing                                           │
│  - Sets priorities based on dependencies                            │
│  - Adds quality criteria (pnpm build passes)                        │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 3: EXECUTE                                                     │
│  pnpm ralph → Runs autonomous loop                                  │
│  - Each iteration picks highest-priority incomplete story           │
│  - Skills execute within story context                              │
│  - Progress tracked in scripts/ralph/progress.txt                   │
│  - Completes when all stories pass                                  │
└─────────────────────────────────────────────────────────────────────┘
```

### Parallel Skill Execution Within Ralph

Within a single Ralph story, skills can execute in parallel when they don't have dependencies:

**Independent (CAN run in parallel):**
```
Story: "Create Hero Section"
├── /frontend-design (design generation)     ← Can start immediately
├── Content research (profile.yaml lookup)   ← Can start immediately
└── shadcn component check (MCP query)       ← Can start immediately
```

**Dependent (MUST run sequentially):**
```
Story: "Create Hero Section"
1. /frontend-design → Generates component code
2. Implement component → Write to file
3. pnpm build → Verify it compiles
4. /agent-browser → Test in browser
5. /web-design-guidelines → Audit UX
6. Update prd.json → Mark passes: true
```

### Story Sizing for Ralph

**Right-sized (ONE context window):**
- Create one component
- Build one page section
- Add one content collection
- Implement one feature

**Too big (SPLIT into multiple stories):**
- "Build entire homepage" → 17 separate stories (one per section)
- "Add all services" → One story per service
- "Implement authentication" → Schema, middleware, UI as separate stories

### Example: Homepage Build via Ralph

Instead of building sections ad-hoc, the homepage MUST be built via Ralph:

```bash
# 1. Create PRD for homepage
/prd skill → tasks/prd-homepage-phase2.md

# 2. Convert to Ralph format
/ralph skill → prd.json (17 user stories, one per section)

# 3. Execute
pnpm ralph:20  # 20 iterations for 17 sections + buffer
```

**prd.json structure for homepage:**
```json
{
  "project": "HVAC Homepage Phase 2",
  "branchName": "feature/homepage-sections",
  "description": "Build all 17 homepage sections",
  "userStories": [
    {
      "id": "US-001",
      "title": "Create Header Component",
      "priority": 1,
      "passes": false
    },
    {
      "id": "US-002",
      "title": "Create Hero Section",
      "priority": 2,
      "passes": false
    },
    // ... US-003 through US-017
  ]
}
```

### DO NOT Bypass Ralph

❌ **NEVER**:
- Start coding without a PRD
- Skip /ralph conversion
- Run skills outside Ralph context
- Manually mark stories as complete without verification

✅ **ALWAYS**:
- Create PRD first (/prd skill)
- Convert to prd.json (/ralph skill)
- Execute via pnpm ralph
- Let Ralph manage story completion

---

## Content Architecture

| Collection | Count | Location |
|------------|-------|----------|
| services | 22 | `src/content/services/` |
| locations | 25 | `src/content/locations/` |
| service-city | 550 | `src/content/service-city/` |
| regions | 6 | `src/content/regions/` |
| blog | 6+ | `src/content/blog/` |
| reviews | 74+ | `src/content/reviews/` |
| faqs | 35 | `src/content/faqs/` |
| case-studies | 3 | `src/content/case-studies/` |
| homepage | NEW | `src/content/homepage/` |
| service-categories | NEW | `src/content/service-categories/` |

### URL Patterns
```
/                                    → Homepage
/services/[service]                  → Service page
/locations/[location]                → Location page
/services/[service]-[location]-on    → Service-city page
/services/category/[category]        → Category landing page
/blog/[slug]                         → Blog post
/rebates                             → Rebates page
```

---

## Available Skills

Skills are in `.claude/skills/`. Invoke using the skill name or naturally through triggers.

**See "MANDATORY WORKFLOW ENFORCEMENT" section above for usage requirements.**

### Design & Development

| Skill | Usage | Purpose |
|-------|-------|---------|
| `/frontend-design` | **REQUIRED** for all components | Creating component designs and code |
| `/agent-browser` | **REQUIRED** for all testing | Testing website functionality, screenshots, form validation |
| `/vercel-react-best-practices` | **REQUIRED** for React components | React/Next.js performance optimization (45 rules from Vercel) |
| `/web-design-guidelines` | **REQUIRED** for user-facing pages | UI/UX audit against 100+ best practices |
| `/compound-engineering` | **RECOMMENDED** for complex features | Systematic feature development (Plan → Work → Review → Compound) |
| `/prd` | **REQUIRED** for all tasks | Planning all tasks (generates PRD documents for Ralph) |
| `/ralph` | **REQUIRED** for all tasks | Convert PRD to prd.json for autonomous execution |

### Marketing Strategy & Planning

| Skill | Usage | Purpose |
|-------|-------|---------|
| `/orchestrator` | **REQUIRED** for marketing tasks | Determines which marketing skill(s) to use, prevents wrong execution order |
| `/positioning-angles` | **REQUIRED** (via orchestrator) | Finding differentiation from competitors |
| `/keyword-research` | **REQUIRED** (via orchestrator) | Identifying target keywords for pages |
| `/brand-voice` | **REQUIRED** (via orchestrator) | Defining or checking voice consistency |

### Content Creation

| Skill | Usage | Purpose |
|-------|-------|---------|
| `/seo-content` | **REQUIRED** for page content | Generating SEO-optimized page content (MD files) |
| `/direct-response-copy` | **REQUIRED** for CTAs/conversion copy | Writing CTAs, headlines, conversion copy |
| `/content-atomizer` | **RECOMMENDED** for social distribution | Repurposing blog content to social media platforms |
| `/newsletter` | **OPTIONAL** (future use) | Creating newsletter editions |
| `/email-sequences` | **OPTIONAL** (future use) | Email automation sequences |
| `/lead-magnet` | **OPTIONAL** (future use) | Lead magnet concepts |

### Document Processing (Limited Use for HVAC Project)

| Skill | Usage | Purpose |
|-------|-------|---------|
| `/pdf` | **OPTIONAL** (rare) | PDF manipulation tasks |
| `/docx` | **OPTIONAL** (rare) | Word document creation/editing |

**Execution Order (Marketing):** orchestrator → positioning-angles → keyword-research → brand-voice → seo-content → direct-response-copy

**Execution Order (Development):** compound-engineering/prd (planning) → frontend-design (implementation) → agent-browser (testing) → vercel-react-best-practices/web-design-guidelines (review)

---

## Marketing Orchestration (Using `/orchestrator`)

If you're unsure which marketing skill to use or need a multi-step workflow, start with `/orchestrator`.

### What Orchestrator Does
- Asks qualifying questions about your goals
- Identifies missing marketing assets (voice, positioning, keywords, content)
- Recommends skill sequence based on dependencies
- Provides context handoffs between skills
- Prevents wasted effort from wrong execution order

### When to Use Orchestrator
- "I need help with marketing" (vague request)
- "Where do I start?" (no clear direction)
- "My marketing isn't working" (diagnostic needed)
- Launching new features or services
- Building complete marketing funnel

### Example Flow

**User:** "I need marketing help for the HVAC site"

**Orchestrator Response:**
1. Asks: "What's your primary goal? (traffic, leads, conversions, authority)"
2. Identifies: Brand voice defined ✓, Positioning clear ✓, Content exists ✓, Social distribution ✗
3. Recommends: Run `/content-atomizer` on blog posts to create platform-specific social content

**Result:** LinkedIn posts, Twitter threads, Instagram carousels ready to publish

### Skill Dependency Map

```
FOUNDATION (do first if missing)
├── brand-voice (how you sound)
└── positioning-angles (how you're different)

STRATEGY (builds on foundation)
├── keyword-research (what to write about)
└── lead-magnet (what to give away)

EXECUTION (requires strategy)
├── seo-content (needs keywords)
├── direct-response-copy (needs positioning + voice)
├── newsletter (needs voice + content)
└── email-sequences (needs lead-magnet + positioning + voice)

DISTRIBUTION (transforms execution)
└── content-atomizer (needs content to repurpose)
```

The orchestrator ensures you follow this dependency chain correctly.

---

## Design Workflow (Using `/frontend-design` + shadcn MCP)

### Per-Section Build Process

For each homepage section and page template:

1. **Prepare Context**
   - Section requirements from HOMEPAGE-REDESIGN-FULL-AND-FINAL.md
   - Business data from `src/content/business/profile.yaml`
   - Design constraints from this document (NO gradients, premium aesthetic, generous spacing)

2. **Run `/frontend-design`**
   - Provide section purpose and goal
   - Specify content requirements (headings, copy, CTAs)
   - Define layout (grid, split, carousel, etc.)
   - List available shadcn components (button, card, badge, etc.)
   - Specify data source (profile.yaml fields)
   - Include aesthetic constraints (no gradients, premium, accessible)

3. **Implement Generated Design**
   - Create Astro component in `src/components/sections/`
   - Use shadcn/ui primitives (Button, Card, etc.)
   - Add new shadcn components via MCP if needed (`mcp__shadcn__` tools)
   - Pull business data using `getEntry('business', 'profile')`
   - Use placeholder images: `<div class="bg-muted aspect-video">Hero Image — 1920×800</div>`

4. **Verify**
   - Run `pnpm build` (must pass)
   - Visual check in `pnpm dev`
   - Mobile responsive check
   - Accessibility check (touch targets ≥ 44px)

### shadcn MCP Tools Available

- `mcp__shadcn__search_items_in_registries` — Find components
- `mcp__shadcn__view_items_in_registries` — View component details
- `mcp__shadcn__get_add_command_for_items` — Get install command
- Use CLI: `npx shadcn@latest add [component]`

### Example: Hero Section Input

```
Section: Homepage Hero
Goal: Premium first impression + immediate conversion path
Layout: Full-width background with centered content
Content:
- H1: "Premium HVAC Installation in Guelph & Southern Ontario"
- Subheading: "Since 1994 • 4.8★ from 407+ reviews"
- Rebate mention: "Up to $10,000 in government rebates available"
- CTA: Phone icon + "Get a Free Installation Quote"
Data: Pull phone from profile.yaml (contact.phone_display)
Components: Use Button from shadcn/ui
Aesthetic: Premium but not stuffy, generous spacing, NO gradients
Background: Placeholder div with dimensions
```

---

## Testing Workflow (Using `/agent-browser`) — REQUIRED

**MANDATORY**: You MUST use `/agent-browser` skill for ALL testing. DO NOT skip this step.

### When Testing is REQUIRED
- ✅ After completing EVERY homepage section (before moving to next)
- ✅ After building EVERY page template
- ✅ Before committing ANY changes
- ✅ For mobile responsive verification (375px, 768px, 1024px)
- ✅ Visual regression testing after updates

### Testing Process

1. **Start local dev server**: `pnpm dev` (runs on http://localhost:4321)

2. **Invoke agent-browser skill**:
   ```
   Use the agent-browser skill to test [component name]:
   - Open http://localhost:4321/[path]
   - Verify [specific functionality]
   - Take screenshot for visual verification
   - Check mobile responsive behavior (375px, 768px, 1024px)
   ```

3. **Common test scenarios**:
   - Header: Sticky behavior, mobile nav toggle, "Since 1994" badge visible
   - Hero: Phone CTA clickable, rebate mention visible, background loads
   - CTAs: All phone links use correct format (tel:+15199939033)
   - Carousels: Navigation arrows work, autoplay functions
   - Forms: Validation errors display correctly (if applicable)
   - Service Area: All 25 cities render, grid layout responsive
   - Blog Preview: Fetches and displays 3 latest posts

### Example Test Request

"Use the agent-browser skill to test the homepage hero section:
- Open http://localhost:4321/
- Verify phone CTA button is visible and clickable
- Verify rebate mention text appears
- Take screenshot of hero section
- Test on mobile viewport (375px width)"

### Browser Testing Capabilities

- **Navigation**: Open URLs, navigate back/forward
- **Interaction**: Click, fill forms, hover, scroll
- **Verification**: Check text, get element values, verify page title
- **Screenshots**: Full page or element-specific
- **Wait strategies**: Wait for elements, network idle, specific text
- **Mobile testing**: Set viewport dimensions

---

## Design Guidelines

### Aesthetic (STRICT)
- **NO gradient borders**
- **NO gradient buttons**
- Generous, luxurious spacing (larger than 44px touch targets)
- Premium but NOT alienating to middle-class homeowners
- Solid colors only
- Clean, professional typography

### Images
- Use solid color placeholders with dimensions during development
- Example: `<div class="bg-primary-100 aspect-video">Hero Image — 1920×800</div>`
- Client replaces with real images after UI approval

### CTAs
- **Primary:** Phone call only ("Get a Free Installation Quote")
- **Secondary:** Email (mailto: link)
- **NOT included:** Online booking, forms (future project)

---

## Code Review & Quality Assurance — REQUIRED

**MANDATORY**: You MUST use these skills before committing. DO NOT bypass quality checks.

### React/Next.js Performance Review (Using `/vercel-react-best-practices`) — REQUIRED

**REQUIRED FOR**: ALL React components (.tsx files)

Review React components for performance issues using 45 rules from Vercel Engineering.

**When REQUIRED:**
- ✅ After writing ANY React component (StickyPhoneDrawer, ExitIntentModal, MobileNav, etc.)
- ✅ Before committing ANY interactive component
- ✅ When debugging performance issues
- ✅ During ALL code reviews

**What It Checks:**
- **Critical**: Async waterfall prevention (Promise.all usage, parallel fetching)
- **Critical**: Bundle size optimization (barrel imports, dynamic imports)
- **High**: Server-side performance (React.cache, data serialization)
- **Medium**: Re-render optimization (memo, useCallback, derived state)
- **Medium**: Rendering performance (content-visibility, SVG optimization)
- **Low-Medium**: JavaScript performance (Map/Set lookups, early exits)

**Example Usage:**

"Use the vercel-react-best-practices skill to review src/components/cta/StickyPhoneDrawer.tsx for performance issues"

**Common Findings for HVAC Project:**
- Avoid barrel imports from Lucide React (import specific icons)
- Use React.lazy() for heavy components loaded conditionally
- Memoize expensive calculations in carousels/grids
- Use primitive dependencies in useEffect hooks

### UI/UX Audit (Using `/web-design-guidelines`) — REQUIRED

**REQUIRED FOR**: ALL user-facing pages (.astro files, page templates)

Review frontend components against 100+ Web Interface Guidelines.

**When REQUIRED:**
- ✅ After completing EVERY homepage section
- ✅ Before launching ANY page template
- ✅ Periodic audits of ALL conversion pages (homepage, service pages, location pages)
- ✅ ALL accessibility compliance checks

**What It Checks:**
- Accessibility (ARIA labels, keyboard navigation, color contrast)
- Touch targets (minimum 44×44px for mobile)
- Form UX (labels, validation, error messages)
- Typography (hierarchy, readability, line length)
- Layout (responsive breakpoints, grid systems)
- Performance (image optimization, lazy loading)

**Example Usage:**

"Use the web-design-guidelines skill to audit src/pages/index.astro for UX compliance"

**Output Format:**
```
file:line: [RULE-ID] Brief description of issue
src/pages/index.astro:45: [TOUCH-TARGET] Button smaller than 44px
src/components/Header.astro:12: [ARIA-LABEL] Missing aria-label on nav toggle
```

### Code Review Workflow — MANDATORY CHECKLIST

**REQUIRED BEFORE EVERY COMMIT** (NO EXCEPTIONS):

1. ✅ **Build MUST pass**: `pnpm build` (zero errors)
2. ✅ **Visual test REQUIRED**: MUST invoke `/agent-browser` skill for ALL changes
3. ✅ **React performance check REQUIRED**: MUST invoke `/vercel-react-best-practices` skill for ANY .tsx files
4. ✅ **UX audit REQUIRED**: MUST invoke `/web-design-guidelines` skill for ANY user-facing pages
5. ✅ **Fix ALL Critical/High issues** found by skills (DO NOT commit with blockers)
6. ✅ **Commit with descriptive message** (only after ALL checks pass)

**Priority for Fixes:**
- **BLOCKER** (DO NOT COMMIT): Build failures, accessibility blockers, Critical performance issues
- **MUST FIX BEFORE COMMIT**: High performance issues, UX violations on conversion pages
- **FIX WITHIN SPRINT**: Medium UX improvements, code optimization
- **BACKLOG**: Low priority edge cases, advanced patterns

**Workflow Violation Warning**: Skipping these checks introduces technical debt, accessibility violations, and performance regressions. ALWAYS complete ALL steps.

---

## Development Workflow (Using `/compound-engineering`)

For systematic feature development where each unit of work makes subsequent work easier.

### When to Use
- Building new page templates (category, location, service-city pages)
- Adding complex functionality (e.g., dynamic filtering, search)
- Refactoring existing code
- When you want learnings captured for future reference

### The Compound Loop

```
Plan (40%) → Work (20%) → Review (20%) → Compound (20%) → Repeat
```

**Why this matters:** 80% of value comes from planning and review, not raw execution. Most developers invert this ratio and accumulate technical debt.

### Process Overview

**1. Plan (40% of time)**
- Research codebase for similar patterns
- Check git history for related changes
- Create detailed plan with acceptance criteria
- Include code examples that match existing patterns

**2. Work (20% of time)**
- Execute systematically, one task at a time
- Run tests after each change (`pnpm build`, `pnpm dev`)
- Commit incrementally with clear messages
- Follow existing patterns discovered in research

**3. Review (20% of time)**
- Code quality: Follows conventions, no unnecessary complexity
- Security: No exposed secrets, input validation where needed
- Performance: No obvious regressions
- Testing: Acceptance criteria met

**4. Compound (20% of time)**
- Document patterns discovered/created
- Record architectural decisions and rationale
- Turn bugs into lessons (symptom → root cause → prevention)
- Update AGENTS.md files for long-term knowledge

### Example: Building Category Landing Pages

**Plan:**
- Research: Check how service pages are structured
- Pattern found: Service pages use `BaseLayout` + `ServiceHero` + content sections
- Decision: Category pages should follow same pattern but with category-specific hero
- Create: Detailed implementation plan with file structure

**Work:**
- Create `src/pages/services/category/[category].astro`
- Implement CategoryHero component following ServiceHero pattern
- Add content sections (services grid, FAQ, CTA)
- Build passes, local testing confirms functionality

**Review:**
- Follows service page conventions ✓
- No hardcoded data (pulls from content collections) ✓
- Mobile responsive ✓
- Touch targets ≥ 44px ✓

**Compound:**
- Document in AGENTS.md: "Category pages follow service page pattern with CategoryHero variant"
- Decision recorded: "Used content collections for scalability rather than hardcoded data"
- Lesson: "Category slugs must match service-categories collection IDs"

**Result:** Next category-like page (region landing pages?) will be easier because patterns and decisions are documented.

### Benefits Over Time
- Each feature takes less effort than similar previous features
- Bugs become one-time events (documented and prevented)
- Code reviews surface fewer issues
- Technical debt decreases instead of accumulates

See `/compound-engineering` skill for complete workflow details.

---

## Homepage Section Flow (14 Sections)

```
0. Header (sticky, "Since 1994" badge, NO sticky phone)
1. Hero (premium, rebate mention, single phone CTA)
2. Value Props Grid (License, Warranty, 30+ Years, Brand Certified)
3. Brand Logo Ticker (Carrier, Daikin, etc.)
4. Service Categories Grid (5 categories → category landing pages)
5. Expert Consultation (low-pressure phone CTA)
6. Project Gallery (6-8 images, placeholders)
7. Testimonials Carousel (installation-focused)
8. Family Story / Meet the Team
9. Service Area Map + City Grid
10. Financing Preview (rebates highlighted)
11. Blog Preview (auto-fetch 3 latest)
12. Certifications & Trust Badges
13. Final Conversion (QuickQuoteConversionSection)
14. Footer

PERSISTENT: Sticky Phone Drawer (bottom, scroll-direction aware)
OVERLAY: Exit Intent Modal (desktop exit + mobile scroll)
```

### Sections REMOVED (Do Not Re-add)
- Emergency CTA Banner
- Problem-Agitation Section

---

## Components to Build (Using `/frontend-design`)

All components built from scratch using `/frontend-design` skill + shadcn/ui primitives:

### Homepage Sections (17 components)
| Component | Location | Build With |
|-----------|----------|------------|
| Header.astro | `src/components/` | `/frontend-design` + shadcn Sheet (mobile nav) |
| Footer.astro | `src/components/` | `/frontend-design` + shadcn Separator |
| HeroSection.astro | `src/components/sections/` | `/frontend-design` + shadcn Button |
| ValuePropsGrid.astro | `src/components/sections/` | `/frontend-design` + shadcn Card + Badge |
| BrandLogoTicker.astro | `src/components/ui/` | `/frontend-design` + CSS animation |
| ServiceCategoriesGrid.astro | `src/components/sections/` | `/frontend-design` + CategoryCard |
| CategoryCard.astro | `src/components/cards/` | `/frontend-design` + shadcn Card |
| ExpertConsultationSection.astro | `src/components/sections/` | `/frontend-design` + shadcn Button |
| ProjectGallerySection.astro | `src/components/sections/` | `/frontend-design` + shadcn Card |
| TestimonialsCarousel.astro | `src/components/sections/` | `/frontend-design` + shadcn Carousel |
| FamilyStorySection.astro | `src/components/sections/` | `/frontend-design` + shadcn Card |
| ServiceAreaSection.astro | `src/components/sections/` | `/frontend-design` + shadcn Card + Badge |
| FinancingPreviewSection.astro | `src/components/sections/` | `/frontend-design` + shadcn Card |
| BlogPreviewSection.astro | `src/components/sections/` | `/frontend-design` + shadcn Card |
| CertificationsSection.astro | `src/components/sections/` | `/frontend-design` + shadcn Badge |
| FinalCTASection.astro | `src/components/sections/` | `/frontend-design` + shadcn Button |
| PhoneCTA.astro | `src/components/cta/` | `/frontend-design` + shadcn Button |
| StickyPhoneDrawer.tsx | `src/components/cta/` | `/frontend-design` + shadcn Sheet (React) |
| ExitIntentModal.tsx | `src/components/modals/` | `/frontend-design` + shadcn Dialog (React) |

### Page Templates (Build After Homepage)
- Category landing pages (`/services/category/[category]`)
- Service pages (`/services/[service]`)
- Location pages (`/locations/[location]`)
- Service-city pages (`/services/[service]-[location]-on`)
- Supporting pages (about, contact, rebates, careers, reviews, faqs, blog)

---

## Content Requirements

| Page Type | Min Words | Uniqueness |
|-----------|-----------|------------|
| Homepage sections | N/A | 100% |
| Category pages | 500+ | 100% |
| Location pages | 1000+ | 100% |
| Service-city pages | 800+ | 80%+ (NO city-swapping) |
| Blog posts | 1500+ | 100% |

**Critical:** Every service-city page needs genuinely unique content with local context, not just city name swapped.

---

## Competitor Reference

**Primary Competitor:** Aire One KW (https://aireonekw.ca/)
- Since 1990, video hero, BBB badges
- B.A.P differentiates on: accountability, judgment, family-owned, 30+ years

---

## DO NOT

### Ralph Workflow Violations (CRITICAL — HIGHEST PRIORITY)
1. **DO NOT** start ANY task without creating a PRD first (`/prd` skill)
2. **DO NOT** skip converting PRD to prd.json (`/ralph` skill)
3. **DO NOT** execute tasks outside of `pnpm ralph`
4. **DO NOT** run skills independently without Ralph orchestration
5. **DO NOT** manually mark stories as `passes: true` without verification
6. **DO NOT** bypass Ralph for "quick fixes" or "small changes"

### Code Quality & Messaging
7. **DO NOT** add emergency/urgency messaging ("24/7", "3 slots left", "call now before...")
8. **DO NOT** add online booking or forms (future project)
9. **DO NOT** use gradient borders or buttons
10. **DO NOT** add Problem-Agitation sections
11. **DO NOT** city-swap content (each page needs unique content)
12. **DO NOT** emphasize repairs over installations
13. **DO NOT** add multiple CTAs (phone only, email secondary)
14. **DO NOT** create new documentation files (use existing FULL-AND-FINAL.md)
15. **DO NOT** hardcode business data (use profile.yaml)

### Skill Workflow Violations (CRITICAL)
16. **DO NOT** skip `/frontend-design` skill when creating components
17. **DO NOT** skip `/agent-browser` skill when testing
18. **DO NOT** skip code review skills (`/vercel-react-best-practices`, `/web-design-guidelines`) before committing
19. **DO NOT** commit code with unresolved Critical/High issues
20. **DO NOT** deviate from Phase 2 build process steps
21. **DO NOT** bypass skill dependency chains (e.g., skipping `/orchestrator` for marketing tasks)

**Consequence**: Violating workflow rules — especially Ralph bypass — introduces technical debt, accountability gaps, and quality issues that compound over time. Ralph ensures every task is documented, verified, and tracked.

---

## Build & Verify

```bash
pnpm install     # Install dependencies
pnpm dev         # Development server (localhost:4321)
pnpm build       # Production build (must pass)
pnpm preview     # Preview production build
```

**Before committing:** Ensure `pnpm build` passes without errors.

---

## Quick Reference

| Need | Location |
|------|----------|
| Full implementation plan | `HOMEPAGE-REDESIGN-FULL-AND-FINAL.md` |
| Business data | `src/content/business/profile.yaml` |
| Content schemas | `src/content/config.ts` |
| Marketing skills | `.claude/skills/` |
| Component patterns | `src/components/` |

---

## Ralph Autonomous Loop

Ralph is an autonomous AI agent loop that runs Claude Code repeatedly until all PRD items are complete. Based on [snarktank/ralph](https://github.com/snarktank/ralph).

### Workflow

```
1. /prd skill → Generate PRD markdown (tasks/prd-[feature].md)
2. /ralph skill → Convert PRD to prd.json
3. pnpm ralph → Execute bash loop until all stories pass
```

### When Running in Ralph Loop

When running as part of Ralph's autonomous loop, follow this workflow:

**Step 1: Read State**
1. Read `prd.json` for user stories
2. Read `scripts/ralph/progress.txt` for context from previous iterations
3. Check the "Codebase Patterns" section for important learnings

**Step 2: Verify Branch**
Confirm you're on the correct branch specified in `prd.json.branchName`.

**Step 3: Select Next Story**
Pick the highest-priority incomplete story (where `passes: false`).

If no incomplete stories remain:
- Output: `<promise>COMPLETE</promise>`
- Stop execution

**Step 4: Implement Story**
1. Read the story's description and acceptance criteria
2. Implement the required changes
3. Keep changes minimal and focused

**Step 5: Quality Checks**
Run and fix until passing:
- `pnpm build` (must pass)
- `pnpm test` (if tests exist)

**Step 6: Update Documentation**

**AGENTS.md (long-term memory):**
If you discovered a reusable pattern, add it to the nearest AGENTS.md file.

**progress.txt (short-term memory):**
APPEND (never replace):
```
## [Date] - [Story Title]
- What was implemented
- Files changed
- **Learnings for future iterations:**
  - Patterns discovered
  - Gotchas encountered
---
```

**Step 7: Commit Changes**
```bash
git add -A
git commit -m "feat: [Story Title]"
```

**Step 8: Mark Story Complete**
Update `prd.json` to set the story's `passes: true`.

**Step 9: Continue**
If more stories remain, continue to the next one.
If all stories complete, output: `<promise>COMPLETE</promise>`

### Story Size Guidelines

**Right-sized (one iteration):**
- Add a single component
- Create one page template
- Add a content collection
- Implement one section

**Too big (split these):**
- "Build entire homepage" → Split into sections
- "Add all 14 sections" → One section per story
- "Implement authentication" → Split into pieces

### Ralph Scripts

```bash
pnpm ralph      # Run with default 10 iterations
pnpm ralph:5    # Run with 5 iterations
pnpm ralph:20   # Run with 20 iterations
```

---

## Build Phases

### Phase 1: Foundation (COMPLETE ✓)
- ✅ shadcn MCP configured and connected
- ✅ CSS variables + Tailwind theme setup
- ✅ Core shadcn components installed
- ✅ Build verified passing

### Phase 2: Homepage Build (CURRENT) — RALPH-DRIVEN WORKFLOW

**CRITICAL**: Phase 2 MUST be executed via Ralph. NO ad-hoc section building.

#### Step 1: Create PRD (REQUIRED FIRST)

```bash
# Invoke /prd skill to create PRD
/prd skill → tasks/prd-homepage-phase2.md
```

The PRD must define all 17 homepage sections as user stories with:
- Clear acceptance criteria
- Priority order (dependencies)
- Quality gates (pnpm build passes, browser verification)

#### Step 2: Convert to Ralph Format (REQUIRED)

```bash
# Invoke /ralph skill to convert PRD
/ralph skill → prd.json
```

**Expected prd.json structure:**
```json
{
  "project": "HVAC Homepage Phase 2",
  "branchName": "feature/homepage-sections",
  "userStories": [
    {"id": "US-001", "title": "Create Header Component", "priority": 1, "passes": false},
    {"id": "US-002", "title": "Create Hero Section", "priority": 2, "passes": false},
    {"id": "US-003", "title": "Create Value Props Grid", "priority": 3, "passes": false},
    {"id": "US-004", "title": "Create Brand Logo Ticker", "priority": 4, "passes": false},
    {"id": "US-005", "title": "Create Service Categories Grid", "priority": 5, "passes": false},
    {"id": "US-006", "title": "Create Expert Consultation Section", "priority": 6, "passes": false},
    {"id": "US-007", "title": "Create Project Gallery Section", "priority": 7, "passes": false},
    {"id": "US-008", "title": "Create Testimonials Carousel", "priority": 8, "passes": false},
    {"id": "US-009", "title": "Create Family Story Section", "priority": 9, "passes": false},
    {"id": "US-010", "title": "Create Service Area Section", "priority": 10, "passes": false},
    {"id": "US-011", "title": "Create Financing Preview Section", "priority": 11, "passes": false},
    {"id": "US-012", "title": "Create Blog Preview Section", "priority": 12, "passes": false},
    {"id": "US-013", "title": "Create Certifications Section", "priority": 13, "passes": false},
    {"id": "US-014", "title": "Create Final CTA Section", "priority": 14, "passes": false},
    {"id": "US-015", "title": "Create Footer", "priority": 15, "passes": false},
    {"id": "US-016", "title": "Create Sticky Phone Drawer", "priority": 16, "passes": false},
    {"id": "US-017", "title": "Create Exit Intent Modal", "priority": 17, "passes": false}
  ]
}
```

#### Step 3: Execute via Ralph (REQUIRED)

```bash
pnpm ralph:20  # 20 iterations for 17 sections + buffer
```

#### Per-Story Workflow (Within Ralph)

Each story executes this sequence:

1. **Design Phase** (parallel where possible):
   - `/frontend-design` skill with section requirements
   - Content lookup from profile.yaml
   - shadcn component availability check

2. **Implementation Phase** (sequential):
   - Create Astro/React component
   - Use shadcn/ui primitives
   - Pull data from content collections

3. **Verification Phase** (sequential):
   - `pnpm build` (MUST pass)
   - `/agent-browser` visual + interaction testing
   - `/web-design-guidelines` UX audit (for .astro files)
   - `/vercel-react-best-practices` review (for .tsx files)

4. **Completion Phase**:
   - Fix any Critical/High issues
   - Update prd.json: `passes: true`
   - Commit with descriptive message

#### Quality Gates (Enforced by Ralph)

**Every story MUST include these acceptance criteria:**
```json
"acceptanceCriteria": [
  "Component created in correct location",
  "Uses shadcn/ui components",
  "pnpm build passes",
  "Verify in browser at localhost:4321",
  "Mobile responsive (375px, 768px, 1024px)",
  "Touch targets ≥ 44px"
]
```

**React components (.tsx) MUST also include:**
```json
"acceptanceCriteria": [
  "/vercel-react-best-practices review passes"
]
```

#### DO NOT (Phase 2 Specific)

- ❌ Build sections without PRD/prd.json
- ❌ Skip Ralph and build sections manually
- ❌ Run skills outside Ralph story context
- ❌ Mark stories complete without verification
- ❌ Commit without all quality gates passing

#### Build Order (17 Stories)

| Priority | Story | Component |
|----------|-------|-----------|
| 1 | US-001 | Header (sticky, "Since 1994" badge) |
| 2 | US-002 | Hero (premium positioning, phone CTA) |
| 3 | US-003 | Value Props Grid (4 trust signals) |
| 4 | US-004 | Brand Logo Ticker (animated scroll) |
| 5 | US-005 | Service Categories Grid (5 categories) |
| 6 | US-006 | Expert Consultation (low-pressure CTA) |
| 7 | US-007 | Project Gallery (6-8 placeholder images) |
| 8 | US-008 | Testimonials Carousel (installation-focused) |
| 9 | US-009 | Family Story (split layout) |
| 10 | US-010 | Service Area Map + City Grid (25 cities) |
| 11 | US-011 | Financing Preview (rebates highlight) |
| 12 | US-012 | Blog Preview (auto-fetch 3 latest) |
| 13 | US-013 | Certifications & Trust Badges |
| 14 | US-014 | Final Conversion CTA |
| 15 | US-015 | Footer (5 columns) |
| 16 | US-016 | Sticky Phone Drawer (React, scroll-aware) |
| 17 | US-017 | Exit Intent Modal (React, triggers) |

**Content Collections (alongside):**
- Create `src/content/homepage/` YAML files
- Create `src/content/service-categories/` MD files
- Update `src/content/config.ts` schemas

### Phase 3: Page Templates
**Build order:** Categories → Services → Locations → Service-City → Supporting Pages

Each page template:
1. Run `/frontend-design` with page requirements
2. Implement using shadcn components
3. Connect to content collections
4. Verify build

### Phase 4: Integration & QA
- Internal linking utility
- Build verification (all 622+ pages)
- Mobile testing
- SEO audit
- Performance check

### Phase 5: Branding Polish
- Update CSS variables with B.A.P brand colors
- Replace image placeholders with real photos
- Typography refinement
- Final UX polish

---

**When in doubt, consult HOMEPAGE-REDESIGN-FULL-AND-FINAL.md**
