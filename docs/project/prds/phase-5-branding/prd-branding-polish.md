# PRD: Phase 5 - Branding Polish

## Introduction

Visual branding and polish phase for the B.A.P Heating & Cooling website. This phase applies a professional HVAC color palette, refines typography and spacing, and adds micro-interactions for a polished user experience.

**Scope:** CSS variables, color application, typography, spacing, hover states, and final verification

**Design Principles:**
- NO gradient borders or buttons (solid colors only)
- Professional HVAC color palette (blue/orange tones - trustworthy and warm)
- Touch targets >= 44px maintained
- Premium but NOT alienating aesthetic
- Images remain as placeholders (client will replace later)

---

## Goals

- Apply professional HVAC brand colors across the site
- Refine typography for readability and visual hierarchy
- Adjust spacing for consistent visual rhythm
- Add polished hover states and micro-interactions
- Maintain Lighthouse 90+ Performance score after changes
- Ensure all color changes meet accessibility contrast requirements

---

## User Stories

### US-001: Define Brand Color Variables

**Description:** As a designer, I want to define brand colors in CSS variables so that the color palette can be applied consistently and easily updated later.

**Acceptance Criteria:**
- [ ] Update `src/styles/globals.css` with new color variables
- [ ] Define primary color: Professional blue (e.g., `--primary: 210 80% 45%` - trustworthy, HVAC industry standard)
- [ ] Define primary-foreground: White or light color for text on primary
- [ ] Define secondary color: Warm orange/amber (e.g., `--secondary: 30 90% 50%` - warmth, energy)
- [ ] Define accent color: Complementary accent for highlights
- [ ] Keep existing muted, background, foreground, border colors (neutral theme)
- [ ] Define ring color for focus states
- [ ] Define destructive color for error states
- [ ] All new colors use HSL format matching shadcn convention
- [ ] Document color choices in code comments
- [ ] `pnpm build` passes with no errors
- [ ] Verify color variables apply correctly in browser

---

### US-002: Apply Brand Colors to Components

**Description:** As a site visitor, I want to see consistent brand colors throughout the site so that the company appears professional and trustworthy.

**Acceptance Criteria:**
- [ ] Primary CTA buttons use `bg-primary text-primary-foreground`
- [ ] Phone CTA buttons stand out with primary color
- [ ] Badge components use appropriate brand colors (category badges, trust badges)
- [ ] Card hover states use subtle brand color accents
- [ ] Link colors use brand palette (not default blue)
- [ ] Active/selected states use brand colors
- [ ] Form focus states use brand ring color
- [ ] Section backgrounds use appropriate brand tints (bg-primary/5, bg-secondary/10)
- [ ] Header/navigation uses brand colors appropriately
- [ ] Footer uses brand colors appropriately
- [ ] Verify homepage sections with brand colors using `/agent-browser` skill
- [ ] Verify service page with brand colors using `/agent-browser` skill
- [ ] Verify location page with brand colors using `/agent-browser` skill
- [ ] `pnpm build` passes with no errors

---

### US-003: Typography Refinement

**Description:** As a site visitor, I want text to be easy to read so that I can quickly understand the services offered.

**Acceptance Criteria:**
- [ ] Verify font-family is set (system fonts or custom web font)
- [ ] H1 sizes: text-4xl md:text-5xl lg:text-6xl (responsive scaling)
- [ ] H2 sizes: text-3xl md:text-4xl (section headers)
- [ ] H3 sizes: text-2xl md:text-3xl (subsection headers)
- [ ] Body text: text-base with comfortable line-height (1.6-1.75)
- [ ] Small text: text-sm for captions, metadata
- [ ] Font weights: bold for headings, normal for body, medium for emphasis
- [ ] Verify prose classes on markdown content have good readability
- [ ] Check text doesn't break awkwardly on mobile (orphan words in headlines)
- [ ] Verify letter-spacing on headings (tracking-tight for large text)
- [ ] Test readability at all breakpoints using `/agent-browser` skill
- [ ] `pnpm build` passes with no errors

---

### US-004: Spacing Adjustments

**Description:** As a site visitor, I want consistent spacing between sections so that the site feels organized and easy to scan.

**Acceptance Criteria:**
- [ ] Section vertical padding: py-16 md:py-20 lg:py-24 (consistent rhythm)
- [ ] Section container max-width: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- [ ] Grid gaps: gap-6 md:gap-8 (consistent card spacing)
- [ ] Card padding: p-6 (consistent internal padding)
- [ ] Heading margin-bottom: mb-4 md:mb-6 (space after section titles)
- [ ] Paragraph margin-bottom: mb-4 (comfortable reading)
- [ ] Button padding: px-6 py-3 (touch-friendly, 44px+ height)
- [ ] List item spacing: space-y-4 (readable lists)
- [ ] Verify spacing consistency across homepage sections
- [ ] Verify spacing consistency across service pages
- [ ] Verify spacing consistency across location pages
- [ ] Use `/agent-browser` skill to verify visual rhythm at 1024px
- [ ] `pnpm build` passes with no errors

---

### US-005: Button & Card Polish

**Description:** As a site visitor, I want buttons and cards to feel responsive when I interact with them so that the site feels professional and modern.

**Acceptance Criteria:**
- [ ] Primary buttons: hover brightness/saturation change (hover:bg-primary/90)
- [ ] Primary buttons: active state slightly darker (active:bg-primary/80)
- [ ] Primary buttons: focus ring visible (focus-visible:ring-2 ring-ring)
- [ ] Secondary buttons: consistent hover/active/focus states
- [ ] Ghost buttons: subtle hover background (hover:bg-muted)
- [ ] Cards: subtle shadow on default (shadow-sm)
- [ ] Cards: elevated shadow on hover (hover:shadow-md)
- [ ] Cards: smooth transition (transition-shadow duration-200)
- [ ] Interactive cards (links): cursor-pointer, hover:shadow-md
- [ ] Badge hover states (if interactive): subtle background change
- [ ] All transitions use consistent timing (duration-200 or duration-300)
- [ ] No jarring or distracting animations
- [ ] Verify interactions on homepage using `/agent-browser` skill
- [ ] Verify interactions on service cards using `/agent-browser` skill
- [ ] `pnpm build` passes with no errors

---

### US-006: Final Verification

**Description:** As a developer, I want to verify all branding changes are complete and performant so that the site is ready for launch.

**Acceptance Criteria:**
- [ ] Run Lighthouse Performance audit on homepage - maintain 90+ score
- [ ] Run Lighthouse Accessibility audit on homepage - maintain 100 score
- [ ] Verify color contrast meets WCAG AA (4.5:1 normal text, 3:1 large text)
- [ ] Test site in Chrome, Firefox, Safari (cross-browser)
- [ ] Test site on actual mobile device if available
- [ ] Verify all phone CTAs use tel: links and are styled correctly
- [ ] Verify all email links use mailto: and are styled correctly
- [ ] Take screenshots of key pages for client approval:
  - Homepage hero
  - Service page hero
  - Location page hero
  - Service-city page
  - Mobile view (375px)
- [ ] Document final color palette in code comments
- [ ] Create visual style guide summary (colors, fonts, spacing)
- [ ] `pnpm build` passes with no errors
- [ ] All 628+ pages still generate correctly

---

## Functional Requirements

- FR-1: All colors must use CSS variables for easy future updates
- FR-2: Color contrast must meet WCAG 2.1 AA standards
- FR-3: No gradient borders or buttons (solid colors only)
- FR-4: Touch targets must remain minimum 44px
- FR-5: Transitions must be smooth and not exceed 300ms
- FR-6: Lighthouse Performance score must remain 90+
- FR-7: Images remain as placeholders (client replaces later)

---

## Non-Goals (Out of Scope)

- Real image replacement (client will provide)
- Logo update (client will provide)
- Content changes or rewrites
- New component development
- Third-party integrations
- Analytics setup
- Dark mode support

---

## Technical Considerations

- **CSS Variables:** All colors defined in `src/styles/globals.css` using HSL format
- **shadcn Theme:** Follow shadcn/ui theming conventions for consistency
- **Transitions:** Use Tailwind transition utilities (transition-colors, transition-shadow)
- **Testing:** Use `/agent-browser` skill for visual verification at each step

---

## Color Palette Reference

**Professional HVAC Color Scheme (Placeholder):**

| Variable | HSL Value | Hex Approx | Usage |
|----------|-----------|------------|-------|
| primary | 210 80% 45% | #1976D2 | CTAs, active states, trust |
| primary-foreground | 0 0% 100% | #FFFFFF | Text on primary |
| secondary | 30 90% 50% | #F5A623 | Warmth accents, highlights |
| secondary-foreground | 0 0% 10% | #1A1A1A | Text on secondary |
| accent | 210 40% 96% | #EEF4FC | Light backgrounds, hover |
| muted | 210 20% 96% | #F5F7FA | Subtle backgrounds |
| border | 210 20% 88% | #D8E0E8 | Card borders, dividers |

*Note: These are placeholder colors. Client can provide final brand colors for easy swap via CSS variables.*

---

## Success Metrics

- Brand colors applied consistently across all page types
- Lighthouse Performance: 90+ maintained after changes
- Lighthouse Accessibility: 100 maintained after changes
- All color contrasts meet WCAG AA
- Smooth hover/focus transitions on all interactive elements
- Visual rhythm consistent across all pages
- Client-ready screenshots of key pages available

---

## Open Questions

- None - all requirements clarified during planning phase
