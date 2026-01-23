# Phase 9: Pre-Ralph Content Preparation

> **Purpose:** Create content assets before running Ralph loop so Ralph can focus purely on code.
> **Run this in a fresh context window before executing Phase 9 PRD.**

---

## Context

Phase 9 Homepage Redesign requires content that Ralph shouldn't generate during the code loop:
1. Ontario rebate program research (factual data)
2. City installation statistics (population-based estimates)
3. Homepage marketing copy (requires `/direct-response-copy` skill)

---

## Task 1: Rebate Research

**Output:** `docs/reference/rebate-deadlines.md`

**Action:** Web search for current Ontario HVAC rebate programs:

### Programs to Research

1. **Enbridge Home Efficiency Rebate Plus (HER+)**
   - Current rebate amounts for furnaces, heat pumps, water heaters
   - Application deadlines
   - Eligibility requirements
   - URL: enbridge.com/rebates

2. **Canada Greener Homes Grant**
   - Status (active/ended/renewed)
   - If active: amounts, deadlines, process
   - Successor programs if ended

3. **Ontario Electricity Rebate / Clean Home Heating Initiative**
   - Heat pump incentives
   - Deadlines

### Output Format

```markdown
# Ontario HVAC Rebate Programs Reference

Last Updated: [DATE]

## Active Programs

### Enbridge HER+
- **Status:** Active
- **Deadline:** [DATE]
- **Amounts:**
  - Furnace: $X
  - Heat Pump: $X
  - Water Heater: $X
- **Link:** [URL]

### [Other Programs...]

## Recently Ended Programs
[List any that ended, for context]

## Key Dates for Homepage
- Next major deadline: [DATE]
- Rebate badge text suggestion: "Up to $X in rebates available"
```

---

## Task 2: City Installation Statistics

**Output:** Add to `src/content/business/profile.yaml` under new `city_stats` key

**Action:** Calculate installation estimates for 25 cities based on population

### Population Data Needed

| City | Region | Est. Population |
|------|--------|-----------------|
| Guelph | Wellington | ~145,000 |
| Fergus | Wellington | ~22,000 |
| Elora | Wellington | ~8,000 |
| Rockwood | Wellington | ~5,000 |
| Erin | Wellington | ~12,000 |
| Eden Mills | Wellington | ~500 |
| Kitchener | Waterloo | ~270,000 |
| Waterloo | Waterloo | ~140,000 |
| Cambridge | Waterloo | ~140,000 |
| Breslau | Waterloo | ~8,000 |
| Elmira | Waterloo | ~12,000 |
| Milton | Halton | ~140,000 |
| Halton Hills | Halton | ~65,000 |
| Georgetown | Halton | ~45,000 |
| Burlington | Halton | ~195,000 |
| Acton | Halton | ~10,000 |
| Oakville | Halton | ~215,000 |
| Caledon | Peel | ~80,000 |
| Bolton | Peel | ~35,000 |
| Hamilton | Hamilton & Brant | ~580,000 |
| Brantford | Hamilton & Brant | ~105,000 |
| Jerseyville | Hamilton & Brant | ~1,500 |
| Orangeville | Dufferin | ~32,000 |
| Shelburne | Dufferin | ~10,000 |
| Grand Valley | Dufferin | ~3,500 |

### Calculation Formula

```
installations = floor(population / 1000) * [factor]

Where factor:
- Large city (>100k): 2-3 installations per 1000 residents
- Medium city (20k-100k): 3-4 installations per 1000 residents
- Small town (<20k): 4-5 installations per 1000 residents

(Smaller areas = higher per-capita because B.A.P is well-known locally)
```

### Output Format (add to profile.yaml)

```yaml
city_stats:
  guelph: { population: 145000, installations_estimate: 400 }
  fergus: { population: 22000, installations_estimate: 85 }
  # ... etc for all 25 cities
```

---

## Task 3: Homepage Marketing Copy

**Skill Required:** `/direct-response-copy`

**Output:** `src/content/locations/ontario.md` (homepage content file)

### Orchestrator Handoff

```
## Context for /direct-response-copy

**Goal:** Write homepage section content for premium HVAC contractor
**Business:** B.A.P Heating & Cooling Services Ltd, Southern Ontario
**Target:** Affluent homeowners making $10K-$15K+ installation decisions

**Voice (from profile.yaml):**
- Professional and direct
- English (Canadian)
- Avoid: "cheap", "budget", "AI slop"
- NO emergency/urgency tactics
- NO "3 slots available" scarcity

**Positioning:**
- Premium installation focus (not repairs)
- Accountability and peace of mind
- "A wealthy homeowner chooses B.A.P because they don't want to manage
  decisions, risk, or follow-ups. They want a company with enough history
  and judgment to make the right call the first time."

**Single CTA:** Phone call only (+1 519-835-4858)
```

### Content Needed

#### 1. Hero Section
```yaml
hero:
  title: "[H1 with 'HVAC Contractor' for SEO]"
  subtitle: "[Supporting statement - accountability focus]"
  trustBadgeText: "[e.g., 'Rated 4.8 from 407 reviews']"
  rebateBadge:
    text: "[e.g., 'Up to $10,000 in rebates']"
    deadline: "[from rebate research]"
  answeringTeamText: "[e.g., 'Call to speak with our team']"
```

#### 2. Service Categories Section
```yaml
serviceCategories:
  eyebrow: "[e.g., 'Our Services']"
  headline: "[e.g., 'Complete HVAC Solutions']"
  subtext: "[1-2 sentences about service range]"
```

#### 3. Expert Consultation Section
```yaml
expertConsultation:
  eyebrow: "[e.g., 'No Pressure']"
  headline: "[e.g., 'Talk to an Expert, Not a Salesperson']"
  subtext: "[accountability messaging]"
  bullets:
    - "[benefit 1]"
    - "[benefit 2]"
    - "[benefit 3]"
    - "[benefit 4]"
```

#### 4. Why Choose Section
```yaml
whyChoose:
  eyebrow: "[e.g., 'Why B.A.P']"
  headline: "[differentiation headline]"
  subtext: "[trust/accountability focus]"
  fullServiceBullets:
    - "[capability 1]"
    - "[capability 2]"
    - "[capability 3]"
    - "[capability 4]"
  warrantyCard:
    headline: "10-Year Warranty"
    copy: "[warranty value proposition]"
```

#### 5. Project Gallery Section
```yaml
projectGallery:
  eyebrow: "[e.g., 'Our Work']"
  headline: "[e.g., 'Recent Installations']"
  subtext: "[quality/craftsmanship focus]"
```

#### 6. Financing Section
```yaml
financing:
  eyebrow: "[e.g., 'Flexible Payment']"
  headline: "[e.g., 'Financing That Works For You']"
  subtext: "[accessibility without cheapening]"
  rebateCard:
    utilityProvider: "Enbridge"
    rebateAmount: "[from research]"
    emphasis: "[key benefit]"
```

#### 7. Service Area Section
```yaml
serviceArea:
  eyebrow: "[e.g., 'Service Area']"
  headline: "[e.g., 'Serving Southern Ontario']"
  subtext: "[coverage statement]"
```

#### 8. FAQ Section (4-6 items)
```yaml
faq:
  eyebrow: "FAQs"
  headline: "[e.g., 'Common Questions']"
  subtext: "[helpful framing]"
  items:
    - question: "[installation-focused Q1]"
      answer: "[detailed A1]"
    - question: "[financing/rebate Q2]"
      answer: "[detailed A2]"
    - question: "[process Q3]"
      answer: "[detailed A3]"
    - question: "[warranty Q4]"
      answer: "[detailed A4]"
```

#### 9. Blog Preview Section
```yaml
blogPreview:
  eyebrow: "[e.g., 'From Our Blog']"
  headline: "[e.g., 'HVAC Insights']"
  subtext: "[educational framing]"
```

#### 10. Final CTA Section
```yaml
finalCta:
  eyebrow: "[e.g., 'Get Started']"
  headline: "[action-oriented, not urgent]"
  subtext: "[reassurance/trust]"
  bullets:
    - "[reason to call 1]"
    - "[reason to call 2]"
    - "[reason to call 3]"
    - "[reason to call 4]"
```

---

## Completion Checklist

- [ ] `docs/reference/rebate-deadlines.md` created with current program data
- [ ] `city_stats` added to `profile.yaml` for all 25 cities
- [ ] `src/content/locations/ontario.md` created with all section content
- [ ] All copy reviewed for:
  - [ ] No emergency/urgency language
  - [ ] No "cheap/budget" words
  - [ ] Premium positioning maintained
  - [ ] Phone CTA only (no forms/booking)
- [ ] `pnpm build` passes

---

## After Completion

Return to main Phase 9 implementation:

```bash
# In original context window
/prd skill   # Create Phase 9 PRD (code-only, content pre-created)
/ralph skill # Convert to prd.json
pnpm ralph:20
```
