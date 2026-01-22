---
name: ralph
description: "Convert PRDs to prd.json format for Ralph autonomous execution. Use when you have a PRD and need to convert it. Triggers on: convert this prd, turn this into ralph format, create prd.json, ralph json, set up ralph."
---

# Ralph PRD Converter

Converts Product Requirements Documents into prd.json format for autonomous execution.

---

## The Job

Transform a PRD markdown file into structured JSON that Ralph can execute autonomously.

---

## Step 1: Read the PRD

Ask the user for the PRD file:
```
Which PRD should I convert? Give me the file path or paste the content.
```

Common locations:
- `tasks/prd-[feature].md`
- User may paste directly

---

## Step 2: Extract User Stories

For each requirement in the PRD, create a user story:

```json
{
  "id": "US-001",
  "title": "[Action-oriented title]",
  "description": "As a [role], I want [action] so that [benefit].",
  "acceptanceCriteria": [
    "Specific, verifiable criterion 1",
    "Specific, verifiable criterion 2",
    "pnpm build passes"
  ],
  "priority": 1,
  "passes": false,
  "notes": ""
}
```

---

## Step 2.5: Validate Skill Requirements (MANDATORY)

Before converting each story, verify skills are in acceptanceCriteria:

| Story Type | REQUIRED in acceptanceCriteria |
|------------|-------------------------------|
| UI/Component stories | `/frontend-design`, `/agent-browser` |
| React (.tsx) stories | `/vercel-react-best-practices` |
| Astro (.astro) stories | `/web-design-guidelines` |
| Content/Marketing stories | `/orchestrator` |

**If missing, ADD the skill requirement to acceptanceCriteria before output.**

Example — Story BEFORE validation:
```json
{
  "title": "Create Hero Section",
  "acceptanceCriteria": [
    "Create HeroSection.astro",
    "pnpm build passes"
  ]
}
```

Example — Story AFTER validation (skills added):
```json
{
  "title": "Create Hero Section",
  "acceptanceCriteria": [
    "Run /frontend-design skill (output: design spec)",
    "Create HeroSection.astro per design spec",
    "Run /web-design-guidelines review",
    "Run /agent-browser test (375px, 768px, 1024px)",
    "pnpm build passes"
  ]
}
```

**NEVER output prd.json without skill requirements in criteria.**

---

## Step 3: Size Check

Each story MUST be completable in ONE iteration (~one context window).

**Right-sized examples:**
- Add a database column + migration
- Create a single UI component
- Implement one server action
- Add a section to a page

**Too big (split these):**
- "Build entire dashboard" → Split into: schema, queries, components
- "Add authentication" → Split into: schema, middleware, UI, sessions
- "Implement all homepage sections" → One section per story

**Rule:** If you can't describe it in 2-3 sentences, it's too big.

---

## Step 4: Order by Dependencies

Stories execute in priority order. Set priority based on dependencies:

```
1. Schema/database changes (priority: 1)
2. Backend logic (priority: 2)
3. UI components (priority: 3)
4. Integration tests (priority: 4)
```

---

## Step 5: Add Quality Criteria

EVERY story must include:
```
"pnpm build passes"
```

UI stories must also include:
```
"Verify in browser at localhost:4321"
```

---

## Step 6: Generate prd.json

Create the complete JSON structure:

```json
{
  "project": "[Project Name]",
  "branchName": "[feature/branch-name]",
  "description": "[One-line description]",
  "userStories": [
    // All stories here
  ]
}
```

---

## Step 7: Save and Confirm

Save to `prd.json` in project root.

Show summary:
```
✅ prd.json created!

Project: [name]
Branch: [branch]
Stories: [count]

Story breakdown:
1. [US-001] [title] - Priority 1
2. [US-002] [title] - Priority 2
...

To run Ralph: pnpm ralph
```

---

## Checklist

- [ ] Each story completable in one iteration
- [ ] All stories have "pnpm build passes" criterion
- [ ] **SKILL REQUIREMENTS in acceptanceCriteria** (not just notes)
- [ ] UI stories have `/frontend-design` + `/agent-browser` in criteria
- [ ] .tsx stories have `/vercel-react-best-practices` in criteria
- [ ] .astro stories have `/web-design-guidelines` in criteria
- [ ] Marketing stories have `/orchestrator` in criteria
- [ ] Stories ordered by dependency (priority)
- [ ] Descriptions detailed enough for autonomous implementation
- [ ] Branch name matches actual git branch
