# Documents — Source of Truth

## Purpose
This folder contains **authoritative, stable documentation** that defines what the project is and how it works.

Documents here are:
- Versioned and stable
- Referenced by roadmap tasks (never duplicated)
- Updated only when requirements or decisions change
- Independent of execution status

## Structure

### `/roadmap/`
Phase-by-phase execution guides with detailed starting prompts.

Contains:
- Individual phase files with complete context
- Component checklists for tracking progress
- Starting prompts ready to copy/paste
- Phase dependencies and prerequisites

### `/specs/`
Requirements, feature definitions, and specifications.

These define **what** must be built:
- Page types and content requirements
- SEO strategy and rules
- Business logic and behaviour
- User experience requirements

### `/decisions/`
Architectural Decision Records (ADRs) that capture **why** technical choices were made.

### `roadmap-phases`
The master phase definition document.

Describes the purpose, focus, and outcomes of each delivery phase. This is the authoritative reference for phase scope.

## Relationship to Roadmap
Documents in this folder are **inputs** to the roadmap.

Roadmap tasks reference these documents but do not redefine them.

If a task uncovers missing requirements:
1. Update the relevant document here
2. Reference the updated document from the task
3. Continue execution

## Rules
1. **No execution tracking** — This folder does not track progress or task status
2. **No duplication** — Never copy content from here into roadmap tasks
3. **Stable references** — Links to these documents should not break
4. **Single source of truth** — Each concept has one authoritative location

## See Also
- [Roadmap Phases Overview](./roadmap-phases) - High-level phase definitions
- [Roadmap Execution Guides](./roadmap/README.md) - Detailed phase prompts
- [Decision Recording Process](./decisions/README.md) - ADR process
