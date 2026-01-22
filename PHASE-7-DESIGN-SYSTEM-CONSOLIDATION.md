# Phase 7: Design System Consolidation

**Date:** January 22, 2026
**Status:** Ready for Implementation
**Branch:** `feature/phase-7-design-system`

---

## Decisions Made (Gap Analysis Complete)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Gallery rename | `LocalGallerySection` → `ServiceGallerySection` | Avoids conflict with `ProjectGallerySection` on homepage |
| Fallback behavior | Service-city CAN override parent | Enables 80%+ content uniqueness for SEO |
| "Local" prefix | Eliminate entirely | Same field names, different content scope |
| Order of operations | Atomic commits | Rename + import update in same commit to avoid breaks |
| New service fields | Optional initially | Content creation is separate from schema migration |

---

## Key Insight: No "Local" Prefix Needed

The field name is the same (`problem`, `solution`, `benefits`), only the content differs:

| Field | Service Page Content | Service-City Page Content |
|-------|---------------------|---------------------------|
| `problem` | "Ontario homeowners face aging furnaces..." | "Guelph's Ward neighbourhood has Victorian homes..." |
| `solution` | "B.A.P's Ontario approach..." | "Our approach for Guelph's unique housing..." |
| `benefits` | General service benefits | City-specific benefits |
| `trustOpener` | Ontario trust statement | City trust statement |
| `proof` | Ontario testimonial | Local testimonial |
| `context` | Ontario market context | City market context |

---

## Executive Summary

### The Goal
Consolidate service and service-city pages to use:
- **IDENTICAL schema** (same fields, same structure)
- **Same shared layout** (16 sections)
- **Global typography** (single font import)
- **Different content scope** (Province vs City)

### Content Model

| Page Type | Content Scope | URL Pattern | Example Content |
|-----------|--------------|-------------|-----------------|
| **Service** | Province-wide (Ontario) | `/services/furnace-installation` | "Furnace challenges across Ontario homes built before 1980..." |
| **Service-City** | City-specific | `/services/furnace-installation-guelph-on` | "Furnace challenges in Guelph's older Ward neighbourhoods..." |

### Impact Summary

| Category | Count | Description |
|----------|-------|-------------|
| Content files | 573 | 23 services + 550 service-city |
| Components | 10 | Consolidate, modify, rename, delete |
| Page templates | 2 | Both use new shared layout |
| Style files | 2 | Create typography.css, modify globals.css |
| Layouts | 1 | Create ServicePageLayout.astro |

---

## Current State Analysis

### Actual Content State (CRITICAL)

**Services (23 files) - ALL fields populated:**
| Field | Status | Rename To |
|-------|--------|-----------|
| `problemStatement` | ✅ Populated | → `problem` |
| `problemStatement.painPoints` | ✅ Populated | → `problem.issues` |
| `solutionApproach` | ✅ Populated | → `solution` |
| `valueProps` | ✅ Populated | → `benefits` |
| `processSteps` | ✅ Populated | Keep |
| `savings` | ✅ Populated | Keep |
| `images` | ✅ Populated | → `galleryImages` |
| (add new) | - | `trustOpener` (optional) |
| (add new) | - | `proof` (optional) |
| (add new) | - | `context` (optional) |

**Service-City (550 files) - Only 2 fields have content:**
| Field | Status | Rename To |
|-------|--------|-----------|
| `localContext` | ✅ 550 files | → `context` |
| `localProof` | ✅ 550 files | → `proof` |
| `localTrustOpener` | ❌ 0 files | → `trustOpener` (schema only) |
| `localProblem` | ❌ 0 files | → `problem` (schema only) |
| `localSolution` | ❌ 0 files | → `solution` (schema only) |
| `localBenefits` | ❌ 0 files | → `benefits` (schema only) |
| `localSavings` | ❌ 0 files | → `savings` (schema only) |
| `localGalleryImages` | ❌ 0 files | → `galleryImages` (schema only) |

**Implication:** Most "local*" components never render in production because content doesn't exist yet.

---

### Problem 1: Duplicate Components

| Generic Component | Local Variant | Difference | Action |
|-------------------|---------------|------------|--------|
| `ProblemSection.astro` | `LocalProblemSection.astro` | 99% identical - only prop name differs | **DELETE** Local |
| `SolutionSection.astro` | `LocalSolutionSection.astro` | Local has city badge + trust indicator | **MERGE** into generic |
| N/A | `LocalTrustOpener.astro` | Unique section | **RENAME** to TrustOpenerSection |
| N/A | `LocalGallerySection.astro` | Unique section | **RENAME** to ServiceGallerySection |
| N/A | `LocalProofSection.astro` | Unique section | **RENAME** to ProofSection |

### Problem 2: Schema Field Name Mismatches

| Purpose | Service Field | Service-City Field | New Unified |
|---------|--------------|-------------------|-------------|
| Trust | (missing) | `localTrustOpener` | `trustOpener` |
| Problem | `problemStatement` | `localProblem` | `problem` |
| Problem issues | `problemStatement.painPoints` | `localProblem.citySpecificIssues` | `problem.issues` |
| Solution | `solutionApproach` | `localSolution` | `solution` |
| Benefits | `valueProps` | `localBenefits` | `benefits` |
| Gallery | `images` | `localGalleryImages` | `galleryImages` |
| Savings rebate | `savings.rebateInfo` | `localSavings.localRebates` | `savings.rebateInfo` |
| Proof | (missing) | `localProof` | `proof` |
| Context | (missing) | `localContext` | `context` |

### Problem 3: Typography Chaos (9 Components with Google Fonts)

| Component | Font Import Method | Issue |
|-----------|-------------------|-------|
| ProblemSection | `@import` in style block | Duplicate |
| LocalProblemSection | `@import` in style block | Duplicate |
| SolutionSection | `@import` in style block | Duplicate |
| LocalSolutionSection | `<link>` tag + CSS class | Wrong pattern |
| LocalTrustOpener | `@import` in style block | Duplicate |
| LocalGallerySection | `@import` in style block | Duplicate |
| ServiceBenefitsSection | `@import` + Inline `style="font-family:..."` | Wrong pattern |
| ServiceSavingsSection | `<link>` tags in template | Wrong pattern |
| LocationServicesGrid | `@import` in style block | Duplicate |

**Note:** Header.astro uses system fonts (`-apple-system, BlinkMacSystemFont`) not Google Fonts.

**Result:** 9 Google Font requests per page instead of 1.

### Problem 4: No Shared Layout

- Service page template: `[service].astro` - 11 sections
- Service-city page template: `[serviceLocation].astro` - 16 sections
- No `ServicePageLayout.astro` exists
- Both pages built independently with different section orders

---

## Target State

### Unified Schema Structure

Both `services` and `service-city` collections will have **IDENTICAL** field names:

```yaml
# SHARED FIELDS (both collections)
title: "Furnace Installation"
seoTitle: "Furnace Installation Services | B.A.P Heating"
seoDescription: "Professional furnace installation..."

# Trust Section
trustOpener: |
  For over 30 years, Ontario homeowners have trusted B.A.P...

# Problem Section
problem:
  headline: "The Hidden Cost of an Aging Furnace"
  description: "Many homeowners don't realize..."
  issues:
    - "Rising energy bills from inefficient heating"
    - "Uneven temperatures throughout your home"
    - "Frequent repairs adding up"

# Solution Section
solution:
  headline: "Professional Installation Done Right"
  description: "Our certified technicians..."
  differentiators:
    - "TSSA-licensed gas fitters"
    - "Manufacturer-certified installers"
    - "10-year parts and labour warranty"

# Gallery Section
galleryImages:
  - src: "/images/projects/furnace-install-1.jpg"
    alt: "New high-efficiency furnace installation"
    caption: "Carrier Infinity system installed in Guelph"

# Benefits Section
benefits:
  - title: "Energy Savings"
    description: "Up to 40% reduction in heating costs"
    icon: "piggy-bank"
  - title: "Quiet Operation"
    description: "Modern variable-speed technology"
    icon: "volume-x"

# Process Section
processSteps:
  - step: 1
    title: "Home Assessment"
    description: "We evaluate your heating needs..."
  - step: 2
    title: "Custom Recommendation"
    description: "You receive options tailored to your home..."

# Proof Section
proof:
  testimonial: "B.A.P installed our new furnace last winter..."
  customerName: "John M."
  customerLocation: "Guelph, ON"
  result: "40% lower heating bills"

# Savings Section
savings:
  headline: "Maximize Your Savings"
  description: "Take advantage of available rebates..."
  bullets:
    - "Up to $7,100 in government rebates"
    - "Flexible financing options"
  rebateInfo: "Enbridge and federal rebates available"
  financingNote: "0% financing for 60 months OAC"

# Context (Markdown content)
context: |
  ## Why Ontario Homeowners Choose B.A.P

  With harsh winters and rising energy costs...

# Workflow
workflowStatus: published
```

### Services-Specific Fields (in addition to shared)

```yaml
# Metadata
category: heating
status: live
priority: true
order: 1
icon: "flame"
serviceType: installation

# Future use
guarantee:
  items:
    - "100% satisfaction guarantee"
inclusions:
  equipment: ["Furnace unit", "Thermostat"]
  labour: ["Professional installation", "System testing"]
```

### Service-City-Specific Fields (in addition to shared)

```yaml
# Cross-references
serviceSlug: furnace-installation
locationSlug: guelph
```

### Service-City Fallback Behavior

Service-city pages can override parent service data OR inherit if not specified:

```typescript
// In ServicePageLayout props
benefits={serviceCity.data.benefits || service.data.benefits}
processSteps={serviceCity.data.processSteps || service.data.processSteps}
savings={serviceCity.data.savings || service.data.savings}
```

---

## Implementation Phases

### Phase 7.1: Global Typography System

**Goal:** Single font import, consistent heading styles everywhere.

#### 7.1.1 Create Typography CSS

**Create:** `/src/styles/typography.css`

```css
/**
 * B.A.P Design System - Typography
 * Single source of truth for all fonts
 */

/* Import fonts ONCE - Playfair Display for headings, Inter for body */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap');

/* Heading styles - Playfair Display (serif) */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

/* Body styles - Inter (sans-serif) */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
}

/* Ensure all text elements inherit body font */
p, span, li, label, input, textarea, button, a {
  font-family: inherit;
}

/* Utility classes for explicit use */
.font-heading {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.font-body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

#### 7.1.2 Update globals.css

**Modify:** `/src/styles/globals.css`

```css
/* Add at the very top, before @tailwind directives */
@import './typography.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Remove existing body font-family (line 123) */
/* Remove existing h1-h6 font styles (lines 128-143) */
```

#### 7.1.3 Remove Font Imports from Components (ALL 10)

| Component | Current Code to Remove |
|-----------|----------------------|
| `ProblemSection.astro` | @import and h2 styles |
| `LocalProblemSection.astro` | @import and h2 styles |
| `SolutionSection.astro` | @import and h2 styles |
| `LocalSolutionSection.astro` | `<link>` tag and CSS class |
| `LocalTrustOpener.astro` | @import and h2 styles |
| `LocalGallerySection.astro` | @import and .font-serif styles |
| `ServiceBenefitsSection.astro` | @import and inline `style="font-family:..."` |
| `ServiceSavingsSection.astro` | `<link>` tags and @import |
| `LocationServicesGrid.astro` | @import and .font-serif styles |
| `Header.astro` | inline font-family in style block |

**Keep only component-specific animations/transitions in style blocks.**

#### 7.1.4 Verification

```bash
pnpm build
# Expected: Build passes

grep -r "@import.*Playfair" src/components/
# Expected: No results (all imports removed)

grep -r "font-family.*Playfair" src/components/
# Expected: No results (no inline font-family)
```

---

### Phase 7.2: Unified Schema

**Goal:** Both collections have IDENTICAL field names.

#### 7.2.1 Update Services Schema

**Modify:** `/src/content/config.ts`

```typescript
const services = defineCollection({
  type: 'content',
  schema: z.object({
    // REQUIRED core fields
    title: z.string(),
    description: z.string(),
    category: z.enum(['heating', 'cooling', 'iaq', 'water-heating', 'commercial', 'plans']),
    status: z.enum(['live', 'draft']),
    seoTitle: z.string(),
    seoDescription: z.string(),

    // OPTIONAL metadata
    priority: z.boolean().optional(),
    order: z.number().optional(),
    icon: z.string().optional(),
    serviceType: z.enum(['installation', 'repair', 'maintenance', 'service']).optional(),

    // ========================================
    // CONTENT SECTIONS (UNIFIED with service-city)
    // ========================================

    // Trust Section (NEW - was missing)
    trustOpener: z.string().optional(),

    // Problem Section (RENAMED from problemStatement)
    problem: z.object({
      headline: z.string(),
      description: z.string(),
      issues: z.array(z.string()),  // RENAMED from painPoints
    }).optional(),

    // Solution Section (RENAMED from solutionApproach)
    solution: z.object({
      headline: z.string(),
      description: z.string(),
      differentiators: z.array(z.string()).optional(),
    }).optional(),

    // Gallery Section (RENAMED from images)
    galleryImages: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })).optional(),

    // Benefits Section (RENAMED from valueProps)
    benefits: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
    })).optional(),

    // Process Section (unchanged)
    processSteps: z.array(z.object({
      step: z.number(),
      title: z.string(),
      description: z.string(),
    })).optional(),

    // Proof Section (NEW - was missing)
    proof: z.object({
      testimonial: z.string(),
      customerName: z.string(),
      customerLocation: z.string(),
      result: z.string().optional(),
    }).optional(),

    // Savings Section (unchanged structure)
    savings: z.object({
      headline: z.string(),
      bullets: z.array(z.string()).optional(),
      description: z.string().optional(),
      rebateInfo: z.string().optional(),
      financingNote: z.string().optional(),
    }).optional(),

    // Context Section (NEW - was missing)
    context: z.string().optional(),

    // Future use (unchanged)
    guarantee: z.object({
      items: z.array(z.union([
        z.string(),
        z.object({ title: z.string(), description: z.string() }),
      ])).optional(),
    }).optional(),

    inclusions: z.object({
      equipment: z.array(z.string()).optional(),
      labour: z.array(z.string()).optional(),
      warranty: z.array(z.string()).optional(),
      extras: z.array(z.string()).optional(),
    }).optional(),

    // Workflow
    workflowStatus: z.enum(['published', 'draft', 'review']),
    reviewedBy: z.string().optional(),
    reviewedDate: z.string().optional(),
    approvedBy: z.string().optional(),
    approvedDate: z.string().optional(),
  }),
});
```

#### 7.2.2 Update Service-City Schema

**Modify:** `/src/content/config.ts`

```typescript
const serviceCity = defineCollection({
  type: 'content',
  schema: z.object({
    // Cross-references (unique to service-city)
    serviceSlug: z.string(),
    locationSlug: z.string(),

    // REQUIRED core fields
    title: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),

    // ========================================
    // CONTENT SECTIONS (UNIFIED with services)
    // ========================================

    // Trust Section (RENAMED from localTrustOpener)
    trustOpener: z.string().optional(),

    // Problem Section (RENAMED from localProblem)
    problem: z.object({
      headline: z.string(),
      description: z.string(),
      issues: z.array(z.string()),  // RENAMED from citySpecificIssues
    }).optional(),

    // Solution Section (RENAMED from localSolution)
    solution: z.object({
      headline: z.string(),
      description: z.string(),
      differentiators: z.array(z.string()).optional(),  // ADDED
    }).optional(),

    // Gallery Section (RENAMED from localGalleryImages)
    galleryImages: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })).optional(),

    // Benefits Section (RENAMED from localBenefits)
    benefits: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
    })).optional(),

    // Process Section (ADDED - was missing)
    processSteps: z.array(z.object({
      step: z.number(),
      title: z.string(),
      description: z.string(),
    })).optional(),

    // Proof Section (RENAMED from localProof)
    proof: z.object({
      testimonial: z.string(),
      customerName: z.string(),
      customerLocation: z.string(),
      result: z.string().optional(),
    }).optional(),

    // Savings Section (RENAMED from localSavings)
    savings: z.object({
      headline: z.string(),
      description: z.string().optional(),
      bullets: z.array(z.string()).optional(),
      rebateInfo: z.string().optional(),  // RENAMED from localRebates
      financingNote: z.string().optional(),  // ADDED
    }).optional(),

    // Context Section (RENAMED from localContext)
    context: z.string().optional(),

    // Workflow
    workflowStatus: z.enum(['published', 'draft', 'review']),
    reviewedBy: z.string().optional(),
    reviewedDate: z.string().optional(),
    approvedBy: z.string().optional(),
    approvedDate: z.string().optional(),
  }),
});
```

#### 7.2.3 Field Mapping Summary

| Purpose | Old Service | Old Service-City | New Unified |
|---------|------------|------------------|-------------|
| Trust | (missing) | `localTrustOpener` | `trustOpener` |
| Problem headline | `problemStatement.headline` | `localProblem.headline` | `problem.headline` |
| Problem description | `problemStatement.description` | `localProblem.description` | `problem.description` |
| Problem issues | `problemStatement.painPoints` | `localProblem.citySpecificIssues` | `problem.issues` |
| Solution headline | `solutionApproach.headline` | `localSolution.headline` | `solution.headline` |
| Solution description | `solutionApproach.description` | `localSolution.description` | `solution.description` |
| Solution differentiators | `solutionApproach.differentiators` | (missing) | `solution.differentiators` |
| Gallery | `images` | `localGalleryImages` | `galleryImages` |
| Benefits | `valueProps` | `localBenefits` | `benefits` |
| Process | `processSteps` | (missing) | `processSteps` |
| Proof | (missing) | `localProof` | `proof` |
| Savings headline | `savings.headline` | `localSavings.headline` | `savings.headline` |
| Savings rebate | `savings.rebateInfo` | `localSavings.localRebates` | `savings.rebateInfo` |
| Context | (missing) | `localContext` | `context` |

---

### Phase 7.3: Content Migration

**Goal:** Update all 573 content files to use unified field names.

#### 7.3.1 Actual Migration Required

**Services (23 files) - 5 field renames:**
- `problemStatement` → `problem`
- `problemStatement.painPoints` → `problem.issues`
- `solutionApproach` → `solution`
- `valueProps` → `benefits`
- `images` → `galleryImages`

**Service-City (550 files) - Only 2 field renames needed:**
- `localContext` → `context`
- `localProof` → `proof`

**Schema-only changes (no content exists):**
- `localTrustOpener` → `trustOpener`
- `localProblem` → `problem`
- `localSolution` → `solution`
- `localBenefits` → `benefits`
- `localSavings` → `savings`
- `localGalleryImages` → `galleryImages`

#### 7.3.2 Create Migration Script

**Create:** `/scripts/migrate-content-schema.ts`

The script must handle:
1. Top-level field renames (`localContext` → `context`)
2. Nested property renames (`problemStatement.painPoints` → `problem.issues`)
3. Dry-run mode for review
4. Backup before execution

```typescript
/**
 * Content Schema Migration Script
 * Migrates services and service-city content to unified schema
 *
 * Usage:
 *   pnpm tsx scripts/migrate-content-schema.ts --dry-run
 *   pnpm tsx scripts/migrate-content-schema.ts --execute
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { glob } from 'glob';

const DRY_RUN = process.argv.includes('--dry-run');

// Field mappings for services
const SERVICE_MAPPINGS = {
  // Top-level renames
  'problemStatement': { newName: 'problem', nested: { 'painPoints': 'issues' } },
  'solutionApproach': { newName: 'solution' },
  'valueProps': { newName: 'benefits' },
  'images': { newName: 'galleryImages' },
};

// Field mappings for service-city
const SERVICE_CITY_MAPPINGS = {
  'localContext': { newName: 'context' },
  'localProof': { newName: 'proof' },
  'localTrustOpener': { newName: 'trustOpener' },
  'localProblem': { newName: 'problem', nested: { 'citySpecificIssues': 'issues' } },
  'localSolution': { newName: 'solution' },
  'localBenefits': { newName: 'benefits' },
  'localSavings': { newName: 'savings', nested: { 'localRebates': 'rebateInfo' } },
  'localGalleryImages': { newName: 'galleryImages' },
};

// ... (full implementation)
```

#### 7.3.3 Migration Execution Plan

**Step 1: Backup**
```bash
mkdir -p backups/content-migration-2026-01-22
cp -r src/content/services backups/content-migration-2026-01-22/
cp -r src/content/service-city backups/content-migration-2026-01-22/
```

**Step 2: Migrate Services (23 files)**
```bash
pnpm tsx scripts/migrate-content-schema.ts --collection=services --dry-run
# Review changes
pnpm tsx scripts/migrate-content-schema.ts --collection=services --execute
pnpm build  # Verify
git add -A && git commit -m "chore: migrate services schema - Phase 7.3"
```

**Step 3: Migrate Service-City (550 files)**
```bash
pnpm tsx scripts/migrate-content-schema.ts --collection=service-city --dry-run
# Review changes
pnpm tsx scripts/migrate-content-schema.ts --collection=service-city --execute
pnpm build  # Verify
git add -A && git commit -m "chore: migrate service-city schema - Phase 7.3"
```

#### 7.3.4 Add New Fields to Services (Optional)

The 23 service content files can have NEW fields added later:

| New Field | Content Scope | Status |
|-----------|--------------|--------|
| `trustOpener` | Ontario-wide | Optional - add when content ready |
| `proof` | Province testimonial | Optional - add when content ready |
| `context` | Ontario market context | Optional - add when content ready |

**This is content creation, not migration. Defer to Phase 8.**

---

### Phase 7.4: Component Consolidation

**Goal:** Single set of components used by both page types.

**CRITICAL: Atomic Commits**

For each rename, do BOTH in same commit to avoid import breakage:
1. Rename file with `git mv`
2. Update ALL imports immediately
3. Commit before next rename

#### 7.4.1 Delete LocalProblemSection

**Delete:** `/src/components/sections/LocalProblemSection.astro`

**Reason:** 99% identical to ProblemSection. Only difference was prop name.

#### 7.4.2 Update ProblemSection

**Modify:** `/src/components/sections/ProblemSection.astro`

```astro
---
interface Props {
  headline: string;
  description: string;
  issues: string[];  // RENAMED from painPoints
  imageAlt?: string;
  reversed?: boolean;
  variant?: 'default' | 'muted' | 'primary';
}

const {
  headline,
  description,
  issues,  // RENAMED
  imageAlt,
  reversed = false,
  variant = 'muted'
} = Astro.props;

const variantClasses = {
  default: 'bg-background',
  muted: 'bg-muted/30',
  primary: 'bg-primary/5',
};
---

<section class={`py-16 md:py-20 lg:py-24 ${variantClasses[variant]}`}>
  <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
      <div class={`space-y-6 ${reversed ? 'md:order-2' : ''}`}>
        <h2 class="text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
          {headline}
        </h2>

        <p class="text-lg md:text-xl text-muted-foreground leading-relaxed">
          {description}
        </p>

        {issues && issues.length > 0 && (
          <ul class="space-y-4 mt-8" role="list">
            {issues.map((issue) => (
              <li class="flex items-start gap-4 group">
                <span class="flex-shrink-0 w-1.5 h-1.5 bg-destructive rounded-full mt-2.5" aria-hidden="true"></span>
                <span class="text-base md:text-lg text-foreground/90 leading-relaxed">
                  {issue}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div class={reversed ? 'md:order-1' : ''}>
        <div class="bg-muted aspect-video rounded-xl flex items-center justify-center text-muted-foreground text-sm">
          {imageAlt || "Problem Image — 800×600"}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* Only component-specific animations - NO font imports */
  li {
    transition: transform 0.2s ease;
  }
  li:hover {
    transform: translateX(4px);
  }
</style>
```

#### 7.4.3 Merge LocalSolutionSection into SolutionSection

**Delete:** `/src/components/sections/LocalSolutionSection.astro`

**Modify:** `/src/components/sections/SolutionSection.astro`

```astro
---
interface Props {
  headline: string;
  description: string;
  differentiators?: string[];
  cityName?: string;  // NEW - shows city badge when provided
  showTrustIndicator?: boolean;  // NEW - shows "Serving X Since 1994"
  imageAlt?: string;
  reversed?: boolean;
  variant?: 'default' | 'muted' | 'primary';
}

const {
  headline,
  description,
  differentiators,
  cityName,
  showTrustIndicator = false,
  imageAlt,
  reversed = false,
  variant = 'default'
} = Astro.props;

const variantClasses = {
  default: 'bg-background',
  muted: 'bg-muted/30',
  primary: 'bg-primary/5',
};
---

<section class={`py-16 md:py-20 lg:py-24 ${variantClasses[variant]}`}>
  <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
      <div class={`space-y-6 ${reversed ? 'md:order-2' : ''}`}>
        {/* City badge - only shows if cityName provided */}
        {cityName && (
          <span class="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
            Solution in {cityName}
          </span>
        )}

        <h2 class="text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
          {headline}
        </h2>

        <p class="text-lg md:text-xl text-muted-foreground leading-relaxed">
          {description}
        </p>

        {differentiators && differentiators.length > 0 && (
          <div class="flex flex-wrap gap-2 mt-6">
            {differentiators.map((item) => (
              <span class="px-3 py-1.5 bg-primary/5 text-primary text-sm font-medium rounded-lg border border-primary/20">
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Trust indicator - only shows if enabled */}
        {showTrustIndicator && cityName && (
          <p class="text-sm text-muted-foreground mt-4">
            Serving {cityName} Since 1994
          </p>
        )}
      </div>

      <div class={reversed ? 'md:order-1' : ''}>
        <div class="bg-muted aspect-video rounded-xl flex items-center justify-center text-muted-foreground text-sm">
          {imageAlt || "Solution Image — 800×600"}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* Only component-specific animations - NO font imports */
</style>
```

#### 7.4.4 Rename Components (ATOMIC - rename + update imports together)

| Current Name | New Name | Command |
|--------------|----------|---------|
| `LocalTrustOpener.astro` | `TrustOpenerSection.astro` | `git mv` + update imports |
| `LocalGallerySection.astro` | `ServiceGallerySection.astro` | `git mv` + update imports |
| `LocalProofSection.astro` | `ProofSection.astro` | `git mv` + update imports |
| `LocalContextSection.astro` | `ContextSection.astro` | `git mv` + update imports |

**Example atomic commit:**
```bash
git mv src/components/sections/LocalTrustOpener.astro src/components/sections/TrustOpenerSection.astro
# Update import in [serviceLocation].astro
# Update import in ServicePageLayout.astro
git add -A && git commit -m "refactor: rename LocalTrustOpener to TrustOpenerSection"
```

---

### Phase 7.5: Shared Layout

**Goal:** Single layout component for both page types.

#### 7.5.1 Create ServicePageLayout

**Create:** `/src/layouts/ServicePageLayout.astro`

```astro
---
import BaseLayout from './BaseLayout.astro';

// Section Components
import ServiceHeroSection from '@/components/sections/ServiceHeroSection.astro';
import TrustOpenerSection from '@/components/sections/TrustOpenerSection.astro';
import ProblemSection from '@/components/sections/ProblemSection.astro';
import SolutionSection from '@/components/sections/SolutionSection.astro';
import ServiceGallerySection from '@/components/sections/ServiceGallerySection.astro';
import ServiceBenefitsSection from '@/components/sections/ServiceBenefitsSection.astro';
import ServiceProcessSection from '@/components/sections/ServiceProcessSection.astro';
import ProofSection from '@/components/sections/ProofSection.astro';
import ContextSection from '@/components/sections/ContextSection.astro';
import LocationServicesGrid from '@/components/sections/LocationServicesGrid.astro';
import ServiceSavingsSection from '@/components/sections/ServiceSavingsSection.astro';
import ServiceFAQSection from '@/components/sections/ServiceFAQSection';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import RelatedServicesSection from '@/components/sections/RelatedServicesSection.astro';
import FinalCTASection from '@/components/sections/FinalCTASection.astro';

interface Props {
  // Page Type
  pageType: 'service' | 'service-city';

  // SEO
  title: string;
  seoTitle: string;
  seoDescription: string;

  // Identity
  serviceName: string;
  serviceSlug: string;
  category: string;
  cityName?: string;
  locationSlug?: string;

  // Section Data (all optional - render if exists)
  heroData: {
    headline: string;
    subheadline?: string;
    serviceType?: string;
  };
  trustOpener?: string;
  problem?: {
    headline: string;
    description: string;
    issues: string[];
  };
  solution?: {
    headline: string;
    description: string;
    differentiators?: string[];
  };
  galleryImages?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  benefits?: {
    title: string;
    description: string;
    icon?: string;
  }[];
  processSteps?: {
    step: number;
    title: string;
    description: string;
  }[];
  proof?: {
    testimonial: string;
    customerName: string;
    customerLocation: string;
    result?: string;
  };
  savings?: {
    headline: string;
    description?: string;
    bullets?: string[];
    rebateInfo?: string;
    financingNote?: string;
  };
  context?: string;

  // Content
  Content?: any;

  // Collections
  faqs: any[];
  reviews: any[];
  relatedServices: any[];

  // Business Data
  business: any;
}

const {
  pageType,
  title,
  seoTitle,
  seoDescription,
  serviceName,
  serviceSlug,
  category,
  cityName,
  locationSlug,
  heroData,
  trustOpener,
  problem,
  solution,
  galleryImages,
  benefits,
  processSteps,
  proof,
  savings,
  context,
  Content,
  faqs,
  reviews,
  relatedServices,
  business,
} = Astro.props;

const isServiceCity = pageType === 'service-city';
---

<BaseLayout title={seoTitle} description={seoDescription}>
  <!-- 1. Hero Section (always) -->
  <ServiceHeroSection
    headline={heroData.headline}
    subheadline={heroData.subheadline}
    serviceName={serviceName}
    serviceType={heroData.serviceType}
    cityName={cityName}
    business={business}
  />

  <!-- 2. Trust Opener (if exists) -->
  {trustOpener && (
    <TrustOpenerSection
      content={trustOpener}
      cityName={cityName}
      variant="primary"
    />
  )}

  <!-- 3. Problem Section (if exists) -->
  {problem && (
    <ProblemSection
      headline={problem.headline}
      description={problem.description}
      issues={problem.issues}
      variant="muted"
    />
  )}

  <!-- 4. Solution Section (if exists) -->
  {solution && (
    <SolutionSection
      headline={solution.headline}
      description={solution.description}
      differentiators={solution.differentiators}
      cityName={isServiceCity ? cityName : undefined}
      showTrustIndicator={isServiceCity}
      variant="default"
    />
  )}

  <!-- 5. Gallery Section (if exists) -->
  {galleryImages && galleryImages.length > 0 && (
    <ServiceGallerySection
      images={galleryImages}
      cityName={cityName}
      variant="muted"
    />
  )}

  <!-- 6. Markdown Content (if exists) -->
  {Content && (
    <section class="py-16 md:py-20 lg:py-24 bg-background">
      <div class="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="prose prose-lg max-w-none">
          <Content />
        </div>
      </div>
    </section>
  )}

  <!-- 7. Benefits Section (if exists) -->
  {benefits && benefits.length > 0 && (
    <ServiceBenefitsSection
      benefits={benefits}
      variant="default"
    />
  )}

  <!-- 8. Process Section (if exists) -->
  {processSteps && processSteps.length > 0 && (
    <ServiceProcessSection
      steps={processSteps}
      variant="muted"
    />
  )}

  <!-- 9. Proof Section (if exists) -->
  {proof && (
    <ProofSection
      testimonial={proof.testimonial}
      customerName={proof.customerName}
      customerLocation={proof.customerLocation}
      result={proof.result}
      variant="default"
    />
  )}

  <!-- 10. Context Section (if exists) -->
  {context && (
    <ContextSection
      content={context}
      cityName={cityName}
      serviceName={serviceName}
      variant="muted"
    />
  )}

  <!-- 11. Location Services Grid (service-city only) -->
  {isServiceCity && locationSlug && (
    <LocationServicesGrid
      locationSlug={locationSlug}
      currentServiceSlug={serviceSlug}
      variant="muted"
    />
  )}

  <!-- 12. Savings Section (if exists) -->
  {savings && (
    <ServiceSavingsSection
      headline={savings.headline}
      description={savings.description}
      bullets={savings.bullets}
      rebateInfo={savings.rebateInfo}
      financingNote={savings.financingNote}
      variant="primary"
    />
  )}

  <!-- 13. FAQ Section (always) -->
  <ServiceFAQSection
    faqs={faqs}
    serviceName={serviceName}
    client:load
  />

  <!-- 14. Testimonials Carousel (always) -->
  <TestimonialsCarousel
    reviews={reviews}
    business={business}
    client:load
  />

  <!-- 15. Related Services (always) -->
  <RelatedServicesSection
    services={relatedServices}
    currentService={serviceSlug}
    cityName={cityName}
  />

  <!-- 16. Final CTA (always) -->
  <FinalCTASection
    business={business}
    serviceName={serviceName}
    cityName={cityName}
  />
</BaseLayout>
```

#### 7.5.2 Update Page Templates

**Modify:** `/src/pages/services/[service].astro`

```astro
---
import { getCollection, getEntry } from 'astro:content';
import ServicePageLayout from '@/layouts/ServicePageLayout.astro';

export async function getStaticPaths() {
  const services = await getCollection('services', ({ data }) => data.status === 'live');
  return services.map((service) => ({
    params: { service: service.slug },
    props: { service },
  }));
}

const { service } = Astro.props;
const { Content } = await service.render();

// Get business data
const businessEntry = await getEntry('business', 'profile');
const business = businessEntry?.data;

// Get FAQs for this service
const allFaqs = await getCollection('faqs', ({ data }) => data.status === 'live');
const serviceFaqs = allFaqs.filter((faq) =>
  faq.data.scopes.some((scope) => scope.includes(service.slug))
);

// Get reviews for this service
const allReviews = await getCollection('reviews', ({ data }) => data.status === 'live');
const reviewsToShow = allReviews
  .filter((r) => r.data.serviceSlug === service.slug)
  .slice(0, 9);

// Get related services
const allServices = await getCollection('services', ({ data }) => data.status === 'live');
const relatedServices = allServices
  .filter((s) => s.data.category === service.data.category && s.slug !== service.slug)
  .slice(0, 3);
---

<ServicePageLayout
  pageType="service"
  title={service.data.title}
  seoTitle={service.data.seoTitle}
  seoDescription={service.data.seoDescription}
  serviceName={service.data.title}
  serviceSlug={service.slug}
  category={service.data.category}
  heroData={{
    headline: service.data.title,
    subheadline: service.data.description,
    serviceType: service.data.serviceType,
  }}
  trustOpener={service.data.trustOpener}
  problem={service.data.problem}
  solution={service.data.solution}
  galleryImages={service.data.galleryImages}
  benefits={service.data.benefits}
  processSteps={service.data.processSteps}
  proof={service.data.proof}
  savings={service.data.savings}
  Content={Content}
  faqs={serviceFaqs}
  reviews={reviewsToShow}
  relatedServices={relatedServices}
  business={business}
/>
```

**Modify:** `/src/pages/services/[serviceLocation].astro`

```astro
---
import { getCollection, getEntry } from 'astro:content';
import ServicePageLayout from '@/layouts/ServicePageLayout.astro';

export async function getStaticPaths() {
  const serviceCityPages = await getCollection('service-city');

  return await Promise.all(
    serviceCityPages.map(async (serviceCity) => {
      const service = await getEntry('services', serviceCity.data.serviceSlug);
      const location = await getEntry('locations', serviceCity.data.locationSlug);

      return {
        params: { serviceLocation: `${serviceCity.data.serviceSlug}-${serviceCity.data.locationSlug}-on` },
        props: { serviceCity, service, location },
      };
    })
  );
}

const { serviceCity, service, location } = Astro.props;
const { Content } = await serviceCity.render();

// Get business data
const businessEntry = await getEntry('business', 'profile');
const business = businessEntry?.data;

// Get FAQs
const allFaqs = await getCollection('faqs', ({ data }) => data.status === 'live');
const serviceFAQs = allFaqs.filter((faq) =>
  faq.data.scopes.some((scope) => scope.includes(service.slug))
);

// Get reviews
const allReviews = await getCollection('reviews', ({ data }) => data.status === 'live');
const reviewsToShow = allReviews
  .filter((r) => r.data.serviceSlug === service.slug)
  .slice(0, 9);

// Get related services (same service in other cities)
const allServiceCity = await getCollection('service-city');
const relatedServices = allServiceCity
  .filter((sc) => sc.data.serviceSlug === service.slug && sc.data.locationSlug !== location.slug)
  .slice(0, 6);
---

<ServicePageLayout
  pageType="service-city"
  title={serviceCity.data.title}
  seoTitle={serviceCity.data.seoTitle}
  seoDescription={serviceCity.data.seoDescription}
  serviceName={service.data.title}
  serviceSlug={service.slug}
  category={service.data.category}
  cityName={location.data.title}
  locationSlug={serviceCity.data.locationSlug}
  heroData={{
    headline: serviceCity.data.title,
    subheadline: service.data.description,
    serviceType: service.data.serviceType,
  }}
  trustOpener={serviceCity.data.trustOpener}
  problem={serviceCity.data.problem}
  solution={serviceCity.data.solution}
  galleryImages={serviceCity.data.galleryImages}
  benefits={serviceCity.data.benefits || service.data.benefits}
  processSteps={serviceCity.data.processSteps || service.data.processSteps}
  proof={serviceCity.data.proof}
  savings={serviceCity.data.savings || service.data.savings}
  Content={Content}
  faqs={serviceFAQs}
  reviews={reviewsToShow}
  relatedServices={relatedServices}
  business={business}
/>
```

---

### Phase 7.6: Background Variants

**Goal:** Section-controlled backgrounds for visual rhythm.

#### 7.6.1 Variant Pattern

All section components receive a `variant` prop:

```typescript
interface Props {
  // ... existing props
  variant?: 'default' | 'muted' | 'primary';
}

const variantClasses = {
  default: 'bg-background',
  muted: 'bg-muted/30',
  primary: 'bg-primary/5',
};
```

#### 7.6.2 Section Background Assignment

| Section | Variant | Color |
|---------|---------|-------|
| Hero | default | White |
| TrustOpener | primary | Blue tint |
| Problem | muted | Light gray |
| Solution | default | White |
| Gallery | muted | Light gray |
| Content | default | White |
| Benefits | default | White |
| Process | muted | Light gray |
| Proof | default | White |
| Context | muted | Light gray |
| ServicesGrid | muted | Light gray |
| Savings | primary | Blue tint |
| FAQ | default | White |
| Testimonials | muted | Light gray |
| Related | default | White |
| CTA | primary | Blue tint |

---

### Phase 7.7: Verification & Cleanup

#### 7.7.1 Visual Testing

Use `/agent-browser` skill:

```
Test URLs:
- /services/furnace-installation (Service page)
- /services/furnace-installation-guelph-on (Service-city page)

Viewports:
- 375px (mobile)
- 768px (tablet)
- 1024px (desktop)
- 1440px (large desktop)
```

#### 7.7.2 Checklist

- [ ] Schema: IDENTICAL fields in both collections
- [ ] Layout: Single ServicePageLayout for both page types
- [ ] Sections: ALL 16 sections available on BOTH page types
- [ ] Typography: Playfair Display on all headings globally
- [ ] Typography: Inter on all body text globally
- [ ] Typography: Single font network request
- [ ] Spacing: Consistent py-16 md:py-20 lg:py-24
- [ ] Backgrounds: Alternating pattern working
- [ ] Conditional render: Missing data hides sections gracefully
- [ ] Build: `pnpm build` passes (573 pages)

#### 7.7.3 Performance Verification

| Metric | Before | After | Target |
|--------|--------|-------|--------|
| Font requests | 9 | 1 | 1 |
| Font payload | ~350KB | ~140KB | <150KB |
| Build time | baseline | same/faster | no regression |

#### 7.7.4 Cleanup

**Delete after verification:**
- `/src/components/sections/LocalProblemSection.astro`
- `/src/components/sections/LocalSolutionSection.astro`
- `/scripts/migrate-content-schema.ts` (after migration complete)

**Update documentation:**
- `CLAUDE.md` - Update component inventory
- `DESIGN-SYSTEM-CONSOLIDATION.md` - Mark as complete

---

## Files Summary

### Create (4)
| File | Purpose |
|------|---------|
| `/src/styles/typography.css` | Global font imports and heading styles |
| `/src/layouts/ServicePageLayout.astro` | Shared layout for both page types |
| `/scripts/migrate-content-schema.ts` | Content migration script |
| `/backups/content-migration-*` | Backup directory |

### Modify (16)
| File | Changes |
|------|---------|
| `/src/styles/globals.css` | Import typography.css |
| `/src/content/config.ts` | Unified schema for both collections |
| `/src/pages/services/[service].astro` | Use ServicePageLayout |
| `/src/pages/services/[serviceLocation].astro` | Use ServicePageLayout |
| `/src/components/sections/ProblemSection.astro` | Remove font import, rename prop, add variant |
| `/src/components/sections/SolutionSection.astro` | Remove font import, add cityName prop, add variant |
| `/src/components/sections/ServiceBenefitsSection.astro` | Remove inline style, add variant |
| `/src/components/sections/ServiceProcessSection.astro` | Add variant |
| `/src/components/sections/ServiceSavingsSection.astro` | Remove link tags, add variant |
| `/src/components/sections/TrustOpenerSection.astro` | Remove font import, add variant (after rename) |
| `/src/components/sections/ServiceGallerySection.astro` | Remove font import, add variant (after rename) |
| `/src/components/sections/ProofSection.astro` | Add variant (after rename) |
| `/src/components/sections/ContextSection.astro` | Add variant (after rename) |
| `/src/components/sections/LocationServicesGrid.astro` | Remove font import, add variant |
| 23 service content files | Rename fields |
| 550 service-city content files | Rename fields |

### Delete (2)
| File | Reason |
|------|--------|
| `/src/components/sections/LocalProblemSection.astro` | Duplicate of ProblemSection |
| `/src/components/sections/LocalSolutionSection.astro` | Merged into SolutionSection |

### Rename (4)
| Current | New |
|---------|-----|
| `LocalTrustOpener.astro` | `TrustOpenerSection.astro` |
| `LocalGallerySection.astro` | `ServiceGallerySection.astro` |
| `LocalProofSection.astro` | `ProofSection.astro` |
| `LocalContextSection.astro` | `ContextSection.astro` |

---

## Success Criteria

| Criteria | Measurement |
|----------|-------------|
| Schema | IDENTICAL fields in both collections |
| Layout | Single ServicePageLayout for both page types |
| Sections | ALL 16 sections available on BOTH page types |
| Typography | Single global font import (1 request) |
| Performance | ~90% reduction in font requests (9 → 1) |
| Build | `pnpm build` passes (573 pages) |
| Visual | No regressions on service or service-city pages |

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Build breaks during migration | Migrate in small batches, commit frequently |
| Import breakage on rename | Atomic commits (rename + import update together) |
| Visual regression | Use agent-browser for verification |
| Content data loss | Backup all content before migration |
| Schema validation errors | Test schema changes with single file first |

---

## Phase 7.8: Content Generation

**Goal:** Generate unique SEO content for all empty fields in 550 service-city files.

### The Problem

Service-city pages (550 files) have **empty fields** that render no content:

| Field | Current State | Target |
|-------|--------------|--------|
| `trustOpener` | ❌ 0 files | ✅ Unique city trust statement |
| `problem.headline` | ❌ 0 files | ✅ City-specific problem framing |
| `problem.description` | ❌ 0 files | ✅ City-specific pain points |
| `problem.issues` | ❌ 0 files | ✅ 3-4 city-relevant issues |
| `solution.headline` | ❌ 0 files | ✅ City-specific solution |
| `solution.description` | ❌ 0 files | ✅ Local expertise positioning |
| `solution.differentiators` | ❌ 0 files | ✅ City-relevant credentials |
| `benefits` | ❌ 0 files | ✅ 3-4 city-specific benefits |
| `savings` | ❌ 0 files | ✅ Local rebates & financing |
| `galleryImages` | ❌ 0 files | Fallback to parent service |

### Content Generation Strategy

**Batching:** By City (25 batches)
- Each batch: 1 city × 22 services = 22 content files
- Total: 25 cities × 22 services = 550 service-city files

**Skill Pipeline per City Batch:**

```
/orchestrator
    → /keyword-research (target keywords for city + service combos)
    → /positioning-angles (unique angles per city market)
    → /brand-voice (consistent B.A.P voice)
    → /seo-content (generate field content)
    → /direct-response-copy (trustOpener, CTAs)
```

### City Batch Order (25 Cities)

| Priority | Cities | Rationale |
|----------|--------|-----------|
| High | Guelph, Kitchener, Cambridge, Waterloo | Core service area |
| High | Hamilton, Burlington, Oakville | High-value markets |
| Medium | Milton, Georgetown, Brampton, Mississauga | Growing suburbs |
| Medium | Newmarket, Aurora, Richmond Hill | North GTA |
| Standard | All remaining cities | Complete coverage |

### Content Fields Specification

#### `trustOpener` (string)
**Purpose:** City-specific trust statement
**Skill:** `/brand-voice` → `/direct-response-copy`
**Example:**
```yaml
trustOpener: |
  For over 30 years, Guelph homeowners in the Ward and
  Riverside neighbourhoods have trusted B.A.P for premium
  furnace installations. Our TSSA-licensed team understands
  the unique heating needs of Guelph's Victorian-era homes.
```

#### `problem` (object)
**Purpose:** City-specific pain points
**Skills:** `/keyword-research` → `/positioning-angles` → `/seo-content`
**Example:**
```yaml
problem:
  headline: "The Hidden Cost of an Aging Furnace in Guelph"
  description: |
    Guelph homeowners face unique heating challenges. Older homes
    in the Ward neighbourhood often have undersized ductwork, while
    newer builds in the south end need systems sized for open concepts.
  issues:
    - "Rising heating bills in poorly insulated Victorian homes"
    - "Uneven temperatures between floors in century-old properties"
    - "Frequent breakdowns during Guelph's harsh winters"
```

#### `solution` (object)
**Purpose:** B.A.P's city-specific approach
**Skills:** `/seo-content`
**Example:**
```yaml
solution:
  headline: "Professional Furnace Installation for Guelph Homes"
  description: |
    Our Guelph-based installation team specializes in matching
    the right system to your home's age and layout. We handle
    permit applications with the City of Guelph directly.
  differentiators:
    - "Guelph building code experts since 1994"
    - "Same-day response for Guelph & surrounding areas"
    - "Local manufacturer partnerships for warranty service"
```

#### `benefits` (array)
**Purpose:** City-relevant value propositions
**Skills:** `/positioning-angles` → `/seo-content`
**Example:**
```yaml
benefits:
  - title: "Local Expertise"
    description: "30+ years serving Guelph's unique housing stock"
    icon: "map-pin"
  - title: "Energy Savings"
    description: "Up to 40% reduction in heating costs"
    icon: "piggy-bank"
  - title: "Same-Day Service"
    description: "Rapid response for Guelph homeowners"
    icon: "clock"
```

#### `savings` (object)
**Purpose:** Local rebates and financing
**Skills:** Research + `/seo-content`
**Example:**
```yaml
savings:
  headline: "Maximize Your Savings in Guelph"
  description: |
    Guelph homeowners can access multiple rebate programs.
    Our team handles all paperwork for Enbridge and federal rebates.
  bullets:
    - "Up to $7,100 in federal Greener Homes rebates"
    - "Enbridge Home Efficiency rebate up to $5,000"
    - "City of Guelph Community Energy Initiative support"
  rebateInfo: "We handle all rebate applications for you"
  financingNote: "0% financing for 60 months OAC"
```

#### `galleryImages` (Fallback Pattern)
**Decision:** Service-city pages inherit parent service's gallery images
**Implementation:** In ServicePageLayout:
```astro
galleryImages={serviceCity.data.galleryImages || service.data.galleryImages}
```

### 7.8.1 Phase 7A: Infrastructure First

Execute phases 7.1–7.7 before content generation:

```bash
/prd → create PRD for infrastructure phases
/ralph → convert to prd.json
pnpm ralph:20
```

**Deliverables:**
- [ ] Global typography system
- [ ] Unified schema
- [ ] Field renames complete
- [ ] Components consolidated
- [ ] ServicePageLayout created
- [ ] Build passes (573 pages)

### 7.8.2 Phase 7B: Content Generation

Execute content generation by city batch:

```bash
/prd → create PRD for content generation (per city)
/ralph → convert to prd.json
pnpm ralph:20 (per city batch)
```

**User Stories per City Batch:**

| Story | Description |
|-------|-------------|
| US-001 | Keyword research for [City] + all services |
| US-002 | Positioning angles for [City] market |
| US-003 | Generate trustOpener for all [City] services |
| US-004 | Generate problem content for all [City] services |
| US-005 | Generate solution content for all [City] services |
| US-006 | Generate benefits for all [City] services |
| US-007 | Generate savings content for all [City] services |
| US-008 | Verify build + visual test for [City] pages |

### 7.8.3 Content Quality Requirements

| Requirement | Standard |
|-------------|----------|
| Uniqueness | NO city-swapping (each city gets unique content) |
| Voice | Consistent B.A.P brand voice via `/brand-voice` |
| SEO | Target keywords from `/keyword-research` |
| Length | trustOpener: 2-3 sentences, problem/solution: 3-5 sentences |
| Validation | `pnpm build` passes after each batch |

### 7.8.4 Risk Mitigation for Content

| Risk | Mitigation |
|------|------------|
| Content quality inconsistency | Use `/brand-voice` profile consistently |
| City-swapping (duplicate content) | `/seo-content` generates unique per city |
| Build breaks from invalid YAML | Validate with `pnpm build` per batch |
| Scope creep | Strict batch boundaries (1 city at a time) |

---

## Execution via Ralph

Per CLAUDE.md requirements, execute through Ralph with user stories.

**Phase 7A (Infrastructure):** Single PRD with ~15-20 user stories
**Phase 7B (Content):** 25 PRDs (one per city batch) with ~8 user stories each

**Recommended PRD structure:** See `prd.json.example` for format.

---

## Updated Success Criteria

### Infrastructure (Phase 7A)
| Criteria | Measurement |
|----------|-------------|
| Schema | IDENTICAL fields in both collections |
| Layout | Single ServicePageLayout for both page types |
| Sections | ALL 16 sections available on BOTH page types |
| Typography | Single global font import (1 request) |
| Performance | ~90% reduction in font requests (9 → 1) |
| Build | `pnpm build` passes (573 pages) |
| Visual | No regressions on service or service-city pages |

### Content (Phase 7B)
| Criteria | Measurement |
|----------|-------------|
| trustOpener | All 550 service-city files populated |
| problem | All 550 service-city files populated |
| solution | All 550 service-city files populated |
| benefits | All 550 service-city files populated |
| savings | All 550 service-city files populated |
| Uniqueness | NO city-swapping (verified via `/web-design-guidelines`) |
| Build | `pnpm build` passes (573 pages) |

---

**Document Status:** Ready for Implementation
**Created:** January 22, 2026
**Updated:** January 22, 2026 (Gap Analysis + Content Generation Added)
**Author:** Claude + User Collaboration
