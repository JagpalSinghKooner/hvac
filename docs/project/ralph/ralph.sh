#!/bin/bash

# Ralph: Autonomous AI Agent Loop
# Runs Claude Code repeatedly until all PRD items complete
# Based on https://github.com/snarktank/ralph

TOOL="claude"
MAX_ITERATIONS=10

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --tool)
            TOOL="$2"
            shift 2
            ;;
        *)
            if [[ $1 =~ ^[0-9]+$ ]]; then
                MAX_ITERATIONS=$1
            fi
            shift
            ;;
    esac
done

# Verify prerequisites
command -v jq >/dev/null 2>&1 || { echo "Error: jq is required. Install with: brew install jq"; exit 1; }
command -v claude >/dev/null 2>&1 || { echo "Error: Claude Code CLI required. Install with: npm install -g @anthropic-ai/claude-code"; exit 1; }

# Check prd.json exists
if [ ! -f "prd.json" ]; then
    echo "Error: prd.json not found in current directory."
    echo "Create one using: /ralph skill or copy from prd.json.example"
    exit 1
fi

# Get branch name from prd.json
BRANCH=$(jq -r '.branchName // "unknown"' prd.json 2>/dev/null || echo "unknown")
LAST_BRANCH_FILE="docs/project/ralph/.last-branch"

# Archive if branch changed
if [ -f "$LAST_BRANCH_FILE" ]; then
    LAST_BRANCH=$(cat "$LAST_BRANCH_FILE")
    if [ "$BRANCH" != "$LAST_BRANCH" ] && [ -f "prd.json" ]; then
        ARCHIVE_DIR="docs/project/ralph/archive/$(date +%Y-%m-%d)-$LAST_BRANCH"
        mkdir -p "$ARCHIVE_DIR"
        [ -f "prd.json" ] && cp prd.json "$ARCHIVE_DIR/"
        [ -f "docs/project/ralph/progress.txt" ] && cp docs/project/ralph/progress.txt "$ARCHIVE_DIR/"
        echo "Archived previous run to $ARCHIVE_DIR"
        # Reset progress for new branch
        echo "# Ralph Progress Log" > docs/project/ralph/progress.txt
        echo "Started: $(date)" >> docs/project/ralph/progress.txt
        echo "Branch: $BRANCH" >> docs/project/ralph/progress.txt
        echo "" >> docs/project/ralph/progress.txt
        echo "## Codebase Patterns" >> docs/project/ralph/progress.txt
        echo "(Patterns discovered during feature builds)" >> docs/project/ralph/progress.txt
        echo "" >> docs/project/ralph/progress.txt
        echo "---" >> docs/project/ralph/progress.txt
    fi
fi
echo "$BRANCH" > "$LAST_BRANCH_FILE"

# Initialize progress.txt if it doesn't exist
if [ ! -f "docs/project/ralph/progress.txt" ]; then
    echo "# Ralph Progress Log" > docs/project/ralph/progress.txt
    echo "Started: $(date)" >> docs/project/ralph/progress.txt
    echo "Branch: $BRANCH" >> docs/project/ralph/progress.txt
    echo "" >> docs/project/ralph/progress.txt
    echo "## Codebase Patterns" >> docs/project/ralph/progress.txt
    echo "(Patterns discovered during feature builds)" >> docs/project/ralph/progress.txt
    echo "" >> docs/project/ralph/progress.txt
    echo "---" >> docs/project/ralph/progress.txt
fi

echo ""
echo "🚀 Starting Ralph ($TOOL) - Max $MAX_ITERATIONS iterations"
echo "Branch: $BRANCH"
echo ""

# Main loop
for ((i=1; i<=MAX_ITERATIONS; i++)); do
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Iteration $i of $MAX_ITERATIONS"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    # Run Claude with explicit Ralph execution prompt
    RALPH_PROMPT="You are running inside Ralph's autonomous loop (iteration $i of $MAX_ITERATIONS).

EXECUTE THE RALPH LOOP NOW:

1. Read prd.json to find stories
2. Read docs/project/ralph/progress.txt for context
3. Find the FIRST story where passes: false
4. If no stories remain with passes: false, output <promise>COMPLETE</promise> and stop
5. Implement that story completely (create files, run pnpm build, verify)
6. Update prd.json to set passes: true for the completed story
7. Commit with: git add -A && git commit -m 'feat: [Story Title]'
8. Append notes to docs/project/ralph/progress.txt

DO NOT ask questions. DO NOT wait for input. EXECUTE NOW.

Project context:
$(cat CLAUDE.md)"

    OUTPUT=$(claude --dangerously-skip-permissions -p "$RALPH_PROMPT" 2>&1)

    echo "$OUTPUT"

    # Check for completion signal
    if echo "$OUTPUT" | grep -q "<promise>COMPLETE</promise>"; then
        echo ""
        echo "✅ All stories complete!"
        exit 0
    fi

    # Pause between iterations
    sleep 2
done

echo ""
echo "⚠️ Max iterations reached ($MAX_ITERATIONS). Check docs/project/ralph/progress.txt for status."
echo "To continue: pnpm ralph:20 (or increase iteration count)"
exit 1
