# Task 9: Testing & Documentation - Final Phase Implementation Plan

**Objective:** Establish comprehensive automated testing infrastructure and create authoritative design system documentation for B.A.P Heating & Cooling website (622 pages, 54 components).

**Approach:** Build automated testing scripts (not manual procedures), integrate accessibility testing tools, fix all issues found, and create code-rich documentation with real examples.

**Estimated Time:** 2-3 hours focused implementation

---

## Phase 1: Foundation Setup (30 minutes)

### 1.1 Install Dependencies

Add 8 new devDependencies:

```bash
npm install --save-dev \
  @axe-core/playwright@^4.9.0 \
  axe-core@^4.9.0 \
  lighthouse@^11.7.0 \
  chrome-launcher@^1.1.0 \
  @typescript-eslint/parser@^7.0.0 \
  glob@^10.3.10 \
  acorn@^8.11.3 \
  acorn-jsx@^5.3.2
```

### 1.2 Create Directory Structure

```bash
mkdir -p scripts/{audit/{parsers,analyzers,fixers,reporters},performance,docs}
mkdir -p tests/{accessibility,components,visual-regression}
mkdir -p docs/testing
mkdir -p performance
```

### 1.3 Update package.json Scripts

Add to `scripts` section:

```json
"test:a11y": "playwright test tests/accessibility",
"test:responsive": "playwright test tests/responsive",
"test:components": "playwright test tests/components",
"test:visual": "UPDATE_SNAPSHOTS=1 playwright test tests/visual-regression",

"audit:visual": "node scripts/audit/visual-consistency.js",
"audit:visual:fix": "node scripts/audit/visual-consistency.js --fix",

"perf:build": "node scripts/performance/build-time-tracker.js",
"perf:lighthouse": "node scripts/performance/lighthouse-runner.js",
"perf:budget": "node scripts/performance/performance-budget.js",
"perf:all": "npm run perf:build && npm run build && npm run preview & sleep 5 && npm run perf:lighthouse && npm run perf:budget",

"docs:extract-tokens": "node scripts/docs/extract-tokens.js",
"docs:extract-component": "node scripts/docs/extract-component-examples.js"
```

---

## Phase 2: Visual Consistency Audit (45 minutes)

### 2.1 Create Core Audit Script

**File:** `scripts/audit/visual-consistency.js`

**Purpose:** Scan all 54 components for design token violations

**What to Check:**
- Spacing: Verify `p-6`, `gap-6`, `py-12 sm:py-16`, `py-16 sm:py-24` patterns
- Typography: Validate `font-display`, `font-heading`, `font-body`, `text-display-lg`, `text-h1`, `text-body` classes
- Colors: Ensure only design system colors (primary, secondary, gray), flag arbitrary colors like `bg-[#FF0000]`
- Shadows: Check `shadow-card`, `shadow-card-hover`, `shadow-elevated` usage
- Gradients: Verify `gradient-brand`, `gradient-heating`, `gradient-cooling` classes

**Implementation Strategy:**
- Use regex patterns via glob/grep for speed
- Parse Astro files: Extract class attributes, validate against design tokens
- Parse React/TSX files: Extract className props, validate CVA variants
- Auto-fix common violations: `p-5` → `p-6`, `gap-[20px]` → `gap-lg`, `font-sans` → `font-body`

**Key Code Pattern:**

```javascript
import fs from 'fs/promises';
import { glob } from 'glob';

const DESIGN_TOKENS = {
  spacing: ['p-6', 'gap-6', 'gap-4', 'py-12', 'py-16', 'space-y-8', 'space-y-12'],
  typography: ['font-display', 'font-heading', 'font-body', 'text-display-lg', 'text-h1', 'text-body'],
  colors: /bg-(primary|secondary|gray|white|accent|muted)/,
  shadows: ['shadow-card', 'shadow-card-hover', 'shadow-elevated', 'shadow-soft'],
  gradients: ['gradient-brand', 'gradient-heating', 'gradient-cooling', 'gradient-mesh-cool', 'gradient-mesh-warm']
};

async function scanComponents() {
  const files = await glob('src/components/**/*.{astro,tsx}');
  let violations = [];

  for (const file of files) {
    const content = await fs.readFile(file, 'utf-8');

    // Check for arbitrary spacing: p-5, gap-[20px], etc.
    const arbitrarySpacing = content.match(/\b(p|px|py|gap|space-[xy])-(\[[\d.]+(?:px|rem)\]|\d+)(?!\d)/g);
    if (arbitrarySpacing) {
      violations.push({ file, type: 'spacing', matches: arbitrarySpacing });
    }

    // Check for arbitrary colors: bg-[#...], text-blue-500 (not primary/secondary)
    const arbitraryColors = content.match(/\b(bg|text|border)-([\[#]|blue-|red-|green-)/g);
    if (arbitraryColors) {
      violations.push({ file, type: 'color', matches: arbitraryColors });
    }
  }

  return violations;
}
```

**Output:** JSON report with violations + auto-fixable suggestions

### 2.2 Create Sub-Analyzers

**Files to Create:**
- `scripts/audit/parsers/astro-parser.js` - Extract class attributes from Astro files
- `scripts/audit/parsers/react-parser.js` - Extract className from React/TSX
- `scripts/audit/analyzers/spacing-analyzer.js` - Validate spacing tokens
- `scripts/audit/analyzers/typography-analyzer.js` - Validate font/text classes
- `scripts/audit/analyzers/color-analyzer.js` - Validate color usage
- `scripts/audit/fixers/auto-fixer.js` - Apply fixes to files
- `scripts/audit/reporters/json-reporter.js` - Generate JSON report

### 2.3 Run Audit & Fix Violations

```bash
npm run audit:visual              # Dry-run, report only
npm run audit:visual:fix          # Apply auto-fixes
npm run audit:visual -- --report-format html  # Generate HTML report
```

**Expected Outcome:** All 54 components comply with design tokens (95%+ compliance)

---

## Phase 3: Accessibility Testing (30 minutes)

### 3.1 Automated Accessibility Tests

**File:** `tests/accessibility/a11y-core.spec.ts`

**Purpose:** Run axe-core against all key pages, validate WCAG AA compliance

**Pages to Test:**
- Homepage (`/`)
- About page (`/about`)
- Contact page (`/contact`)
- Service page: Heating (`/services/furnace-repair`)
- Service page: Cooling (`/services/air-conditioning-installation`)
- Location page (`/locations/guelph`)
- Emergency service (`/emergency-service`)

**Implementation:**

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = [
  { name: 'Homepage', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'Contact', url: '/contact' },
  { name: 'Furnace Repair Service', url: '/services/furnace-repair' },
  { name: 'AC Installation Service', url: '/services/air-conditioning-installation' },
  { name: 'Guelph Location', url: '/locations/guelph' },
  { name: 'Emergency Service', url: '/emergency-service' },
];

test.describe('WCAG AA Accessibility Tests', () => {
  for (const page of PAGES) {
    test(`${page.name} should not have accessibility violations`, async ({ page: pw }) => {
      await pw.goto(page.url);
      await pw.waitForLoadState('networkidle');

      const results = await new AxeBuilder({ page: pw })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }
});
```

**What axe-core Checks:**
- Color contrast ratios (4.5:1 for normal text, 3:1 for large text)
- ARIA attributes (aria-label, aria-hidden, aria-expanded)
- Semantic HTML (heading hierarchy, landmarks, form labels)
- Alt text on images
- Keyboard accessibility (interactive elements focusable)

### 3.2 Color Contrast Validation

**File:** `tests/accessibility/a11y-color-contrast.spec.ts`

**Purpose:** Deep-dive into color contrast issues

**Check:**
- Body text (text-gray-700) on white background
- Body text on gray-50 background
- Body text on primary-50/30 background
- Button text on gradient backgrounds (gradient-brand, gradient-heating, gradient-cooling)
- Link colors (text-primary-600) on various backgrounds

**Expected Ratios:**
- primary-500 (#0066CC) on white: 7.48:1 ✓ WCAG AAA
- secondary-500 (#FF6600) on white: 3.74:1 ⚠️ WCAG AA Large Text Only
- secondary-600 on white: 5.27:1 ✓ WCAG AA

**Fix Strategy:** If violations found, adjust to darker shades (e.g., secondary-600 instead of secondary-500 for body text)

### 3.3 Keyboard Navigation Tests

**File:** `tests/accessibility/a11y-keyboard-nav.spec.ts`

**Purpose:** Verify keyboard accessibility

**Tests:**
- Tab through all interactive elements on homepage
- Verify focus indicators visible (2px primary ring)
- Test mobile navigation keyboard access (hamburger → Sheet → Accordion)
- Test modal/dialog keyboard trap (Escape closes, focus returns)
- Verify no keyboard traps exist

```typescript
test('Homepage keyboard navigation', async ({ page }) => {
  await page.goto('/');

  // Focus on first focusable element
  await page.keyboard.press('Tab');

  let focusableCount = 0;
  const maxTabs = 50;

  for (let i = 0; i < maxTabs; i++) {
    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? {
        tagName: el.tagName,
        hasVisibleFocusRing: window.getComputedStyle(el, ':focus-visible').outlineWidth !== '0px'
      } : null;
    });

    if (focusedElement) {
      focusableCount++;
      expect(focusedElement.hasVisibleFocusRing).toBe(true);
    }

    await page.keyboard.press('Tab');
  }

  expect(focusableCount).toBeGreaterThan(10); // Homepage should have many interactive elements
});
```

### 3.4 Manual Testing Checklist

**File:** `docs/testing/manual-accessibility-checklist.md`

**Content:** Step-by-step procedures for:
- Touch target measurements (mobile: 44x44px minimum)
- Screen reader testing with VoiceOver/NVDA (optional, 30 min procedure)
- Focus state visual inspection
- Motion sensitivity verification (prefers-reduced-motion support)

### 3.5 Fix Accessibility Issues

**Strategy:**
- Run `npm run test:a11y`
- Review violations in Playwright report
- Fix violations in components (add aria-labels, adjust colors, fix heading hierarchy)
- Re-run tests until all pass

---

## Phase 4: Performance Testing (30 minutes)

### 4.1 Build Time Tracking

**File:** `scripts/performance/build-time-tracker.js`

**Purpose:** Measure and track build performance over time

**Implementation:**

```javascript
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);
const THRESHOLD_SECONDS = 7;
const HISTORY_FILE = 'performance/build-history.json';

async function measureBuildTime() {
  console.log('Building project...');
  const start = Date.now();

  try {
    const { stdout } = await execAsync('npm run build');
    const duration = (Date.now() - start) / 1000;

    // Extract page count from Astro output
    const pageMatch = stdout.match(/(\d+) pages in ([\d.]+)s/);
    const pages = pageMatch ? parseInt(pageMatch[1]) : null;

    return {
      timestamp: new Date().toISOString(),
      duration,
      pages,
      success: true,
    };
  } catch (error) {
    return {
      timestamp: new Date().toISOString(),
      duration: (Date.now() - start) / 1000,
      success: false,
      error: error.message,
    };
  }
}

async function run() {
  const result = await measureBuildTime();

  // Save to history
  let history = [];
  try {
    const data = await fs.readFile(HISTORY_FILE, 'utf-8');
    history = JSON.parse(data);
  } catch {}

  history.push(result);
  if (history.length > 100) history = history.slice(-100);

  await fs.mkdir('performance', { recursive: true });
  await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2));

  // Check threshold
  if (result.duration > THRESHOLD_SECONDS) {
    console.error(`❌ Build time ${result.duration.toFixed(2)}s exceeds ${THRESHOLD_SECONDS}s threshold`);
    process.exit(1);
  }

  console.log(`✅ Build completed in ${result.duration.toFixed(2)}s (${result.pages} pages)`);
}

run();
```

### 4.2 Lighthouse CI Integration

**File:** `scripts/performance/lighthouse-runner.js`

**Purpose:** Run Lighthouse audits on 5 key pages

**Pages to Test:**
- Homepage
- Heating service (furnace-repair)
- Cooling service (air-conditioning-installation)
- Location page (guelph)
- About page

**Thresholds:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

**Implementation:** Use `lighthouse` npm package, launch Chrome headless, run audits, save results to `performance/lighthouse-results.json`

### 4.3 Performance Budgets

**File:** `scripts/performance/performance-budget.js`

**Purpose:** Enforce file size limits

**Budgets:**
- CSS: 150KB max per file, 300KB total
- JS: 200KB max per file, 500KB total
- HTML: 50KB max per page

**Implementation:** Use glob to find files, check file sizes, fail if exceeds budget

### 4.4 Run Performance Tests

```bash
npm run perf:build              # Track build time (should be <7s)
npm run build                    # Build the site
npm run preview &                # Start preview server
npm run perf:lighthouse          # Run Lighthouse (requires server running)
npm run perf:budget              # Check file size budgets
```

**Expected Outcome:** Build time <7s, Lighthouse scores 90+, all budgets met

---

## Phase 5: Responsive Testing Enhancement (20 minutes)

### 5.1 Component-Specific Tests

**File:** `tests/components/service-cards.spec.ts`

**Purpose:** Test ServiceCard responsive behavior across 4 breakpoints

**What to Test:**
- Grid layout: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Card stacking: Vertical on mobile, horizontal on desktop
- Touch targets: 44x44px minimum on mobile
- Hover states: Only active on desktop (not mobile)
- Image scaling: Images fit containers at all breakpoints

**Implementation:**

```typescript
test('ServiceCards display correct grid layout per breakpoint', async ({ page }, testInfo) => {
  await page.goto('/');

  const cards = page.locator('[class*="ServiceCard"], .service-card').first();
  await cards.scrollIntoViewIfNeeded();

  const cardCount = await page.locator('[class*="ServiceCard"], .service-card').count();

  if (testInfo.project.name === 'mobile-320px') {
    // Verify single column layout (cards stack vertically)
  } else if (testInfo.project.name === 'tablet-768px') {
    // Verify 2-column layout
  } else if (testInfo.project.name.includes('desktop')) {
    // Verify 3-column layout
  }
});
```

### 5.2 Visual Regression Testing

**File:** `tests/visual-regression/snapshot-homepage.spec.ts`

**Purpose:** Detect unintended visual changes

**Implementation:**

```typescript
test('Homepage visual snapshot', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Full page screenshot
  await expect(page).toHaveScreenshot(`homepage-${testInfo.project.name}.png`, {
    fullPage: true,
    maxDiffPixels: 100,
  });
});
```

### 5.3 Update Playwright Config

**File:** `playwright.config.ts`

Add visual regression settings:

```typescript
expect: {
  toHaveScreenshot: {
    maxDiffPixels: 100,
    threshold: 0.2,
  },
},
updateSnapshots: process.env.UPDATE_SNAPSHOTS ? 'all' : 'missing',
```

### 5.4 Run Responsive Tests

```bash
npm run test:responsive         # Run existing + new responsive tests
npm run test:components          # Run component-specific tests
npm run test:visual              # Generate visual regression baselines
```

**Expected Outcome:** All responsive tests pass, visual snapshots created

---

## Phase 6: Design System Documentation (25 minutes)

### 6.1 Create Documentation File

**File:** `documents/design-system.md`

**Structure:** 12 main sections

1. **Introduction** (5 min)
   - Design philosophy: "Warm & Approachable"
   - Brand values: Professional, trustworthy, community-focused (since 1994)
   - Tech stack: Astro 5.0, Tailwind CSS 3.4, shadcn/ui, CVA

2. **Color Palette** (5 min)
   - Primary blues (50-900 scale): Full HSL values with hex codes
   - Secondary oranges (50-900 scale): Full HSL values with hex codes
   - Neutral grays (50-900 scale): Full HSL values
   - Semantic colors: success, warning, error
   - Usage guidelines: Heating = orange, Cooling = blue
   - Contrast ratios: List all color/background combinations with WCAG compliance

3. **Typography Scale** (5 min)
   - Font families: Nunito (display), Quicksand (heading), Open Sans (body), Source Code Pro (mono)
   - Display sizes: text-display-lg (72px), text-display-md (56px), text-display-sm (40px)
   - Heading sizes: text-h1 (32px), text-h2 (24px), text-h3 (20px)
   - Body sizes: text-body-lg (18px), text-body (16px), text-body-sm (14px)
   - Responsive scaling: Mobile adjustments for display sizes
   - Code examples from actual components

4. **Spacing System** (3 min)
   - Scale: xs (8px), sm (12px), md (16px), lg (24px), xl (32px), 2xl (48px), 3xl (64px), 4xl (96px)
   - Common patterns: Card padding (`p-6`), Grid gaps (`gap-6`), Section padding (`py-12 sm:py-16`)
   - Code examples

5. **Shadow Hierarchy** (2 min)
   - 6 levels: soft, card, card-hover, elevated, glow-primary, glow-secondary
   - Usage guidelines: When to use each level
   - CSS values with rgba

6. **Gradient Utilities** (3 min)
   - 10 gradients: gradient-brand, gradient-heating, gradient-cooling, gradient-primary-soft, gradient-secondary-soft, gradient-mesh-cool, gradient-mesh-warm, gradient-brand-overlay, gradient-text, gradient-border-animated
   - Use cases for each
   - Code examples from Button and HomeHero components

7. **Animation Keyframes** (2 min)
   - 5 animations: pulse-slow, fade-in, fade-in-left, float, gradient-rotate
   - Accessibility: All respect `prefers-reduced-motion`
   - Code examples

8. **Component Patterns** (10 min)
   - **Button Component** (extract from `src/components/ui/button.tsx`)
     - 9 variants: default, secondary, destructive, outline, ghost, link, gradient, gradient-heating, gradient-cooling
     - 4 sizes: sm, default, lg, icon
     - Code examples with all variants
   - **ServiceCard Component** (extract from `src/components/cards/ServiceCard.astro`)
     - 2 variants: compact, featured
     - Category theming: heating (orange), cooling (blue)
     - Code examples
   - **Section Component** (extract from `src/components/layout/Section.astro`)
     - Background variants: none, white, muted, primary-light, gradient-cool, gradient-warm
     - Padding options: none, sm, md, lg
     - fullWidth prop for breakout sections
     - Code examples

9. **Page Templates** (5 min)
   - Homepage structure: Hero → Emergency CTA → Value Props → Services → Testimonials → Quick Quote
   - Service pages: Category-themed (heating = orange, cooling = blue)
   - Location pages: Local trust signals, service area grid
   - Visual rhythm pattern: White → Gray-50 → Primary-50/30 (trust-focused)
   - Code examples from `src/pages/index.astro`

10. **Accessibility Guidelines** (5 min)
    - WCAG AA compliance requirements
    - Color contrast minimums (4.5:1 for body text)
    - Touch target minimums (44x44px on mobile)
    - Keyboard navigation standards
    - Focus state requirements (2px primary ring)
    - Motion sensitivity (prefers-reduced-motion)
    - Testing procedures: `npm run test:a11y`

11. **Performance Standards** (3 min)
    - Build time target: <7 seconds for 622 pages
    - Current metrics: 6.5s (under target ✓)
    - Lighthouse targets: 90+ across all categories
    - Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
    - Performance budgets
    - Monitoring: `npm run perf:all`

12. **Maintenance Guidelines** (5 min)
    - How to add new colors to palette
    - How to create new gradient utilities
    - How to add new typography sizes
    - When to create new components vs. use existing
    - Testing workflow: `npm run audit:visual`, `npm run test`, `npm run perf:all`

### 6.2 Code Extraction Strategy

**Manual Extraction (during documentation writing):**
- Read key components: Button, Card, ServiceCard, Section, HomeHero
- Copy relevant code snippets (props interfaces, variant definitions, usage examples)
- Annotate with comments explaining design system principles

**Automated Token Extraction (optional script):**

**File:** `scripts/docs/extract-tokens.js`

```javascript
import fs from 'fs/promises';

async function extractTokens() {
  const tailwindConfig = await fs.readFile('tailwind.config.mjs', 'utf-8');
  const globalsCSS = await fs.readFile('src/styles/globals.css', 'utf-8');

  // Extract color palette from tailwind config
  const colorMatch = tailwindConfig.match(/colors:\s*{([^}]+)}/s);

  // Extract gradients from globals.css
  const gradientMatches = globalsCSS.matchAll(/\.gradient-(\w+)\s*{([^}]+)}/g);

  // Output as JSON
  console.log(JSON.stringify({
    colors: colorMatch ? colorMatch[1] : null,
    gradients: Array.from(gradientMatches).map(m => ({ name: m[1], css: m[2] }))
  }, null, 2));
}

extractTokens();
```

### 6.3 Write Documentation

**Process:**
1. Start with Introduction section (design philosophy, tech stack)
2. Extract design tokens from `tailwind.config.mjs` and `src/styles/globals.css`
3. Create color palette table with hex codes and contrast ratios
4. Document typography scale with pixel values and line heights
5. Document spacing, shadows, gradients, animations
6. Extract component examples from Button, ServiceCard, Section
7. Document page templates with visual rhythm patterns
8. Add accessibility and performance guidelines
9. Add maintenance instructions

**Goal:** 200-300 lines of well-structured markdown with code examples

---

## Verification & Testing

### Step 1: Visual Consistency Audit

```bash
npm run audit:visual
```

**Expected:** Report of any design token violations across 54 components

**If violations found:**
```bash
npm run audit:visual:fix
npm run audit:visual  # Re-run to verify fixes
```

**Success Criteria:** 95%+ compliance with design tokens

### Step 2: Accessibility Testing

```bash
npm run test:a11y
```

**Expected:** All pages pass WCAG AA compliance (0 violations)

**If violations found:**
- Review Playwright HTML report: `npm run test:report`
- Fix violations in components (add aria-labels, adjust colors, fix heading hierarchy)
- Re-run: `npm run test:a11y`

**Success Criteria:** 0 accessibility violations on all 7 tested pages

### Step 3: Performance Testing

```bash
npm run perf:build
```

**Expected:** Build time <7 seconds for 622 pages

```bash
npm run build
npm run preview &
sleep 5
npm run perf:lighthouse
```

**Expected:** Lighthouse scores 90+ on all 5 pages (Performance, Accessibility, Best Practices, SEO)

```bash
npm run perf:budget
```

**Expected:** All file size budgets met (CSS <150KB/file, JS <200KB/file, HTML <50KB/page)

**Success Criteria:** Build time <7s, Lighthouse scores 90+, budgets met

### Step 4: Responsive Testing

```bash
npm run test:responsive
npm run test:components
```

**Expected:** All responsive tests pass across 4 breakpoints (320px, 768px, 1024px, 1440px)

```bash
npm run test:visual
```

**Expected:** Visual regression baseline screenshots created for all pages/components

**Success Criteria:** All responsive tests pass, visual snapshots created

### Step 5: Documentation Review

**Manual Review:**
- Open `documents/design-system.md`
- Verify all 12 sections are complete
- Verify code examples are accurate and extracted from actual components
- Verify color contrast ratios are listed
- Verify usage guidelines are clear

**Success Criteria:** Documentation is comprehensive, accurate, and code-rich (200-300 lines)

---

## Critical Files to Create

### Scripts (15 files)
1. `scripts/audit/visual-consistency.js` - Main audit orchestrator
2. `scripts/audit/parsers/astro-parser.js` - Parse Astro files
3. `scripts/audit/parsers/react-parser.js` - Parse React/TSX files
4. `scripts/audit/analyzers/spacing-analyzer.js` - Validate spacing
5. `scripts/audit/analyzers/typography-analyzer.js` - Validate typography
6. `scripts/audit/analyzers/color-analyzer.js` - Validate colors
7. `scripts/audit/fixers/auto-fixer.js` - Apply fixes
8. `scripts/audit/reporters/json-reporter.js` - Generate reports
9. `scripts/performance/build-time-tracker.js` - Track build time
10. `scripts/performance/lighthouse-runner.js` - Run Lighthouse
11. `scripts/performance/performance-budget.js` - Check budgets
12. `scripts/docs/extract-tokens.js` - Extract design tokens

### Tests (8 files)
13. `tests/accessibility/a11y-core.spec.ts` - Core accessibility tests
14. `tests/accessibility/a11y-color-contrast.spec.ts` - Color contrast tests
15. `tests/accessibility/a11y-keyboard-nav.spec.ts` - Keyboard navigation tests
16. `tests/components/service-cards.spec.ts` - ServiceCard responsive tests
17. `tests/components/hero-components.spec.ts` - Hero responsive tests
18. `tests/components/cta-components.spec.ts` - CTA responsive tests
19. `tests/visual-regression/snapshot-homepage.spec.ts` - Homepage snapshots
20. `tests/visual-regression/snapshot-components.spec.ts` - Component snapshots

### Documentation (2 files)
21. `docs/testing/manual-accessibility-checklist.md` - Manual testing procedures
22. `documents/design-system.md` - Comprehensive design system documentation

---

## Critical Files to Modify

1. **`package.json`** - Add 8 devDependencies, add 12 new scripts
2. **`playwright.config.ts`** - Add visual regression config (expect.toHaveScreenshot)
3. **`README.md`** (optional) - Add links to design system docs and testing procedures

---

## Success Criteria Summary

- ✅ All 54 components comply with design system tokens (95%+ compliance)
- ✅ WCAG AA accessibility maintained (0 violations on 7 tested pages)
- ✅ Build time remains <7 seconds for 622 pages
- ✅ Lighthouse scores >90 across all categories on 5 tested pages
- ✅ Responsive design works flawlessly across 4 breakpoints (320px-1440px)
- ✅ Visual regression baselines established (snapshots created)
- ✅ Design system documentation complete and authoritative (200-300 lines, 12 sections)
- ✅ All automated tests run without errors
- ✅ Performance budgets enforced

---

## Post-Implementation Workflow

### Daily Development
```bash
npm run audit:visual    # Quick design token check
npm run test            # Run all tests (responsive + accessibility)
```

### Before Commits
```bash
npm run audit:visual:fix   # Auto-fix violations
npm run test:a11y          # Verify accessibility
npm run perf:build         # Check build performance
```

### Before Releases
```bash
npm run audit:visual
npm run test
npm run perf:all
# Review reports, fix any issues
```

### Quarterly Maintenance
- Full manual accessibility test (screen reader)
- Performance optimization review
- Documentation updates
- Dependency updates

---

## 🚀 Quick Start Prompt

To begin implementation of this plan, use the following prompt:

```
Implement Task 9: Testing & Documentation plan from TASK-9-IMPLEMENTATION-PLAN.md.

Start with Phase 1 (Foundation Setup):
1. Install all 8 dependencies
2. Create directory structure
3. Update package.json scripts

Then proceed through Phases 2-6 systematically:
- Phase 2: Create visual consistency audit scripts
- Phase 3: Build accessibility test suite
- Phase 4: Implement performance monitoring
- Phase 5: Add responsive/visual regression tests
- Phase 6: Write comprehensive design system documentation

Fix any issues discovered during testing. Run all verification steps to ensure success criteria are met.
```
