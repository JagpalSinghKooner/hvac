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
LAST_BRANCH_FILE="scripts/ralph/.last-branch"

# Archive if branch changed
if [ -f "$LAST_BRANCH_FILE" ]; then
    LAST_BRANCH=$(cat "$LAST_BRANCH_FILE")
    if [ "$BRANCH" != "$LAST_BRANCH" ] && [ -f "prd.json" ]; then
        ARCHIVE_DIR="scripts/ralph/archive/$(date +%Y-%m-%d)-$LAST_BRANCH"
        mkdir -p "$ARCHIVE_DIR"
        [ -f "prd.json" ] && cp prd.json "$ARCHIVE_DIR/"
        [ -f "scripts/ralph/progress.txt" ] && cp scripts/ralph/progress.txt "$ARCHIVE_DIR/"
        echo "Archived previous run to $ARCHIVE_DIR"
        # Reset progress for new branch
        echo "# Ralph Progress Log" > scripts/ralph/progress.txt
        echo "Started: $(date)" >> scripts/ralph/progress.txt
        echo "Branch: $BRANCH" >> scripts/ralph/progress.txt
        echo "" >> scripts/ralph/progress.txt
        echo "## Codebase Patterns" >> scripts/ralph/progress.txt
        echo "(Patterns discovered during feature builds)" >> scripts/ralph/progress.txt
        echo "" >> scripts/ralph/progress.txt
        echo "---" >> scripts/ralph/progress.txt
    fi
fi
echo "$BRANCH" > "$LAST_BRANCH_FILE"

# Initialize progress.txt if it doesn't exist
if [ ! -f "scripts/ralph/progress.txt" ]; then
    echo "# Ralph Progress Log" > scripts/ralph/progress.txt
    echo "Started: $(date)" >> scripts/ralph/progress.txt
    echo "Branch: $BRANCH" >> scripts/ralph/progress.txt
    echo "" >> scripts/ralph/progress.txt
    echo "## Codebase Patterns" >> scripts/ralph/progress.txt
    echo "(Patterns discovered during feature builds)" >> scripts/ralph/progress.txt
    echo "" >> scripts/ralph/progress.txt
    echo "---" >> scripts/ralph/progress.txt
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

    # Run Claude with the CLAUDE.md prompt
    OUTPUT=$(claude --dangerously-skip-permissions -p "$(cat CLAUDE.md)" 2>&1)

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
echo "⚠️ Max iterations reached ($MAX_ITERATIONS). Check scripts/ralph/progress.txt for status."
echo "To continue: pnpm ralph:20 (or increase iteration count)"
exit 1
