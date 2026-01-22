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

## ⚠️ MANDATORY WORKFLOW — RALPH FIRST

**CRITICAL**: ALL tasks MUST go through Ralph. NO exceptions.

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

### Why Ralph
- **Accountability**: Every task documented with acceptance criteria
- **Quality**: Built-in gates (pnpm build must pass)
- **Memory**: `AGENTS.md` = long-term patterns, `progress.txt` = short-term notes
- **Parallel execution**: Skills can run in parallel within stories when independent

### Story Sizing
**Right-sized (ONE context window):** One component, one section, one feature
**Too big (SPLIT):** "Build entire homepage" → 17 separate stories

### Within Ralph Stories — Required Skills

| Phase | Required Skills |
|-------|-----------------|
| Design | `/frontend-design` for ALL components |
| Test | `/agent-browser` for ALL visual testing |
| Review (.tsx) | `/vercel-react-best-practices` |
| Review (.astro) | `/web-design-guidelines` |
| Marketing | `/orchestrator` → skill chain |

---

## ⚠️ MANDATORY SKILL USAGE — NO EXCEPTIONS

**CRITICAL**: Every task MUST use the appropriate skill. NO task is done "freestyle."

### Development Tasks — REQUIRED Skills

| Task Type | REQUIRED Skill | Run BEFORE |
|-----------|---------------|------------|
| Create PRD | `/prd` | Starting any work |
| Convert to prd.json | `/ralph` | Running Ralph loop |
| Design UI/component | `/frontend-design` | Writing any component code |
| Review .tsx files | `/vercel-react-best-practices` | Committing React code |
| Review .astro pages | `/web-design-guidelines` | Committing Astro code |
| Test in browser | `/agent-browser` | Marking story complete |

### Marketing/Content Tasks — ALWAYS START WITH /orchestrator

| Task Type | REQUIRED Flow |
|-----------|--------------|
| ANY marketing task | `/orchestrator` → routes to correct skills |
| Positioning/angles | `/orchestrator` → `/positioning-angles` |
| Keyword research | `/orchestrator` → `/keyword-research` |
| Brand voice | `/orchestrator` → `/brand-voice` |
| SEO content | `/orchestrator` → `/seo-content` |
| CTAs/conversion copy | `/orchestrator` → `/direct-response-copy` |
| Email sequences | `/orchestrator` → `/email-sequences` |
| Newsletter | `/orchestrator` → `/newsletter` |
| Content repurposing | `/orchestrator` → `/content-atomizer` |

### Enforcement Rules

1. **PRD MUST list required skills** per story (in acceptanceCriteria, not just notes)
2. **Ralph MUST validate** skill requirements before marking `passes: true`
3. **AGENTS.md MUST be updated** with skill patterns discovered
4. **Marketing tasks ALWAYS start with `/orchestrator`** — NO direct skill invocation

---

## Technical Stack

| Layer | Technology |
|-------|------------|
| Framework | Astro 5.0 (static generation) |
| UI | React 19 + Radix UI + shadcn/ui |
| Language | TypeScript 5.6 |
| Styling | Tailwind CSS 3.4 (CSS variables + shadcn neutral theme) |
| Icons | Lucide React |
| Content | Astro Content Collections (Zod validated) |

### Key Files
- **Business data:** `src/content/business/profile.yaml`
- **Content schema:** `src/content/config.ts`
- **Homepage:** `src/pages/index.astro`
- **Components:** `src/components/`
- **MCP config:** `.mcp.json` (shadcn server)

### Foundation (COMPLETE ✓)
- ✅ shadcn MCP server connected
- ✅ CSS variables configured (neutral theme)
- ✅ Core shadcn components: button, card, badge, separator, accordion, carousel, dialog, sheet
- ✅ Build verified passing (622 pages)

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

### URL Patterns
```
/                                    → Homepage
/services/[service]                  → Service page
/locations/[location]                → Location page
/services/[service]-[location]-on    → Service-city page
/blog/[slug]                         → Blog post
```

---

## REQUIRED Skills

Skills in `.claude/skills/`. **All execute within Ralph context. NO SKILL = NO TASK.**

### Design & Development — MANDATORY
| Skill | When | NEVER Skip |
|-------|------|------------|
| `/prd` | **FIRST** — All tasks start here | Creates acceptance criteria |
| `/ralph` | **SECOND** — Convert PRD to prd.json | Enables autonomous execution |
| `/frontend-design` | **BEFORE** writing any component | Creates design spec |
| `/agent-browser` | **AFTER** implementation | Validates visual output |
| `/vercel-react-best-practices` | **BEFORE** committing .tsx | Catches React issues |
| `/web-design-guidelines` | **BEFORE** committing .astro | Catches UI/UX issues |
| `/compound-engineering` | Complex multi-step features | Ensures systematic approach |

### Marketing — ORCHESTRATOR FIRST, ALWAYS
| Skill | Purpose | ONLY via /orchestrator |
|-------|---------|----------------------|
| `/orchestrator` | **GATEKEEPER** — routes to correct skills | START HERE |
| `/positioning-angles` | Differentiation strategy | orchestrator routes here |
| `/keyword-research` | Target keywords & content strategy | orchestrator routes here |
| `/brand-voice` | Voice consistency & tone | orchestrator routes here |
| `/seo-content` | SEO-optimized page content | orchestrator routes here |
| `/direct-response-copy` | CTAs, landing pages, conversion copy | orchestrator routes here |
| `/email-sequences` | Welcome, nurture, sales sequences | orchestrator routes here |
| `/newsletter` | Newsletter creation & format | orchestrator routes here |
| `/content-atomizer` | Repurpose content across platforms | orchestrator routes here |

**Marketing Flow (STRICT ORDER):** `/orchestrator` → diagnoses need → routes to: `/positioning-angles` → `/keyword-research` → `/brand-voice` → `/seo-content` → `/direct-response-copy`

**WRONG:** "Write landing page copy" → directly writes copy
**RIGHT:** "Write landing page copy" → `/orchestrator` → routes to correct skill chain

---

## Design Guidelines

### Aesthetic (STRICT)
- **NO gradient borders or buttons**
- Generous spacing (touch targets ≥ 44px)
- Premium but NOT alienating
- Solid colors only

### Images
- Use placeholders during dev: `<div class="bg-muted aspect-video">Hero Image — 1920×800</div>`
- Client replaces after UI approval

### CTAs
- **Primary:** Phone call only
- **Secondary:** Email (mailto:)
- **NOT included:** Online booking, forms

### shadcn MCP Tools
- `mcp__shadcn__search_items_in_registries` — Find components
- `mcp__shadcn__view_items_in_registries` — View details
- `mcp__shadcn__get_add_command_for_items` — Install command

---

## Testing Workflow

**MANDATORY**: Use `/agent-browser` for ALL testing.

1. Start dev server: `pnpm dev` (localhost:4321)
2. Invoke agent-browser skill with test scenarios
3. Verify: Visuals, interactions, mobile viewports (375px, 768px, 1024px)

---

## Code Review Checklist

**REQUIRED BEFORE EVERY COMMIT:**

1. ✅ `pnpm build` passes (zero errors)
2. ✅ `/agent-browser` visual testing complete
3. ✅ `/vercel-react-best-practices` for .tsx files
4. ✅ `/web-design-guidelines` for .astro pages
5. ✅ ALL Critical/High issues fixed
6. ✅ Commit with descriptive message

---

## DO NOT

### Ralph Violations (CRITICAL)
1. Start ANY task without PRD (`/prd` skill)
2. Skip prd.json conversion (`/ralph` skill)
3. Execute tasks outside `pnpm ralph`
4. Manually mark stories `passes: true` without verification
5. Bypass Ralph for "quick fixes"

### Code & Messaging
6. Add emergency/urgency messaging ("24/7", "3 slots left")
7. Add online booking or forms
8. Use gradient borders/buttons
9. Add Problem-Agitation sections
10. City-swap content (each page needs unique content)
11. Emphasize repairs over installations
12. Hardcode business data (use profile.yaml)

### Skill Violations (CRITICAL)
13. Skip `/frontend-design` when creating components
14. Skip `/agent-browser` testing
15. Skip code review skills before committing
16. Commit with unresolved Critical/High issues
17. **Invoke marketing skills directly** — MUST go through `/orchestrator` first
18. **Start content/copy tasks without `/orchestrator`** — orchestrator is MANDATORY
19. **Mark story `passes: true` without running required skills** — validation required
20. **Create PRD without skill requirements in acceptance criteria**

---

## Ralph Loop Instructions

When running inside Ralph's autonomous loop:

**Step 0: Read Institutional Memory**
- Read `AGENTS.md` for codebase patterns and gotchas (prevents repeating mistakes)

**Step 1: Read State**
- Read `prd.json` for stories
- Read `docs/project/ralph/progress.txt` for recent context

**Step 2: Verify Branch**
Confirm on branch from `prd.json.branchName`

**Step 3: Select Next Story**
Pick highest-priority where `passes: false`

If none remain: Output `<promise>COMPLETE</promise>` and stop

**Step 4: Implement**
- Read acceptance criteria
- Implement changes (minimal, focused)
- Run quality checks (`pnpm build`)

**Step 5: Update Docs**
- AGENTS.md: Reusable patterns (long-term)
- progress.txt: APPEND implementation notes (short-term)

**Step 6: Complete**
- `git add -A && git commit -m "feat: [Story Title]"`
- Update prd.json: `passes: true`
- Continue to next story

**Scripts:**
```bash
pnpm ralph      # 10 iterations
pnpm ralph:5    # 5 iterations
pnpm ralph:20   # 20 iterations
```

---

## Build Phases

### Phase 1: Foundation (COMPLETE ✓)
- ✅ shadcn MCP + CSS variables + components

### Phase 2: Homepage Build (COMPLETE ✓)
- ✅ 17 sections (Header through Exit Intent Modal)

### Phase 3: Page Templates (COMPLETE ✓)
- ✅ Categories → Services → Locations → Service-City → Supporting

### Phase 4: Integration & QA (COMPLETE ✓)
- ✅ Linking, mobile testing, SEO, performance

### Phase 5: Branding Polish (COMPLETE ✓)
- ✅ Colors, typography, spacing, accessibility

### Phase 6: Lead Conversion Architecture (COMPLETE ✓)
- ✅ Service/service-city page structure
- ✅ Local* components created
- ✅ Global typography system

### Phase 7: Design System Consolidation (DEPRECATED)
- ✅ Phase 7A: Infrastructure (typography, unified schema, component consolidation)
- ❌ Phase 7B: DEPRECATED - Content reset for Phase 8 fresh start

### Phase 8: City-Level Content Customization (CURRENT)

**Full Specification:** [PHASE-8-CITY-CONTENT-CUSTOMIZATION.md](PHASE-8-CITY-CONTENT-CUSTOMIZATION.md)

**Status:** FRESH START for ALL 25 cities (550 service-city pages)

**Scope:**
- 3,850 unique keyword-researched headings (7 per page)
- ~1,000 words per page (E-E-A-T content depth)
- 6 new schema fields (hero, finalCta, benefitsHeadline, contextHeadline, experienceStats)
- LocalBusiness structured data per page
- Premium positioning (NO emergency/urgency messaging)

**Required Skills Per Story Type:**
- Schema/Component (US-001 to US-004): `/frontend-design` → `/agent-browser` → `/web-design-guidelines`
- Content Generation (US-006 to US-014): `/orchestrator` → `/keyword-research` → `/positioning-angles` → `/seo-content` → `/direct-response-copy`
- Verification (US-015 to US-017): `/agent-browser`

**Execute via Ralph:**
```bash
/prd skill → create PRD for Phase 8A
/ralph skill → prd.json
pnpm ralph:20
```

---

## Homepage Sections (17)

```
0. Header (sticky, "Since 1994" badge)
1. Hero (premium, rebate mention, phone CTA)
2. Value Props Grid (4 trust signals)
3. Brand Logo Ticker
4. Service Categories Grid (5 categories)
5. Expert Consultation (low-pressure CTA)
6. Project Gallery (6-8 images)
7. Testimonials Carousel
8. Family Story / Meet Team
9. Service Area Map + Cities
10. Financing Preview (rebates)
11. Blog Preview (3 latest)
12. Certifications & Badges
13. Final CTA
14. Footer

PERSISTENT: Sticky Phone Drawer
OVERLAY: Exit Intent Modal
```

**REMOVED (Do Not Re-add):** Emergency CTA Banner, Problem-Agitation Section

---

## Content Requirements

| Page Type | Min Words | Uniqueness |
|-----------|-----------|------------|
| Homepage | N/A | 100% |
| Category | 500+ | 100% |
| Location | 1000+ | 100% |
| Service-city | ~1,000 | 80%+ (E-E-A-T, 7 unique headings, NO city-swapping) |
| Blog | 1500+ | 100% |

---

## Build & Verify

```bash
pnpm install     # Install dependencies
pnpm dev         # Dev server (localhost:4321)
pnpm build       # Production build (must pass)
pnpm preview     # Preview production
```

---

## Quick Reference

| Need | Location |
|------|----------|
| **Codebase patterns** | `AGENTS.md` (read first!) |
| Full plan | `HOMEPAGE-REDESIGN-FULL-AND-FINAL.md` |
| Phase 8 spec | `PHASE-8-CITY-CONTENT-CUSTOMIZATION.md` |
| Brand voice | `docs/project/ralph/brand-voice.md` |
| Business data | `src/content/business/profile.yaml` |
| Content schemas | `src/content/config.ts` |
| Skills | `.claude/skills/` |
| prd.json template | `prd.json.example` |
| Ralph progress | `docs/project/ralph/progress.txt` |
| Utility providers | `docs/reference/utility-providers.md` |

---

**When in doubt, consult HOMEPAGE-REDESIGN-FULL-AND-FINAL.md**
