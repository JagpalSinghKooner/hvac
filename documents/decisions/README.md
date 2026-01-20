# Architectural Decision Records (ADRs)

## Purpose
This folder captures **architectural and technical decisions** made throughout the project.

Decisions recorded here are:
- Stable and versioned
- Easy to reference and audit
- Numbered sequentially
- Never deleted (only superseded)

## When to Record a Decision
Create an ADR when:
- Choosing between technical approaches (framework, library, architecture pattern)
- Establishing conventions (naming, folder structure, routing rules)
- Making trade-offs that affect maintainability or scalability
- Solving a problem in a non-obvious way

Do **not** record:
- Routine implementation details
- Reversible choices with no long-term impact
- Decisions that are obvious given the technology stack

## Naming Convention
```
001-use-next-js-app-router.md
002-define-canonical-url-patterns.md
003-use-typescript-strict-mode.md
```

Format: `NNN-brief-decision-title.md`

## ADR Template Structure
Each ADR should include:

1. **Status** — Accepted | Superseded | Deprecated
2. **Context** — What problem are we solving?
3. **Decision** — What did we decide?
4. **Consequences** — What are the implications?

Keep ADRs short and focused. One decision per file.

## Referencing ADRs
When a roadmap task depends on or relates to an ADR, link to it:

```markdown
See [ADR-003: TypeScript Strict Mode](/documents/decisions/003-use-typescript-strict-mode.md)
```

## Superseding Decisions
If a decision is reversed:
1. Update the old ADR status to "Superseded by ADR-XXX"
2. Create a new ADR explaining the new decision
3. Do not delete the old ADR

## See Also
- [Source of Truth Documentation](/documents/README.md)
- [Roadmap Governance](/roadmap/README.md)
