#!/usr/bin/env bash
set -euo pipefail

# Ensure script runs from repo root (important for npx + pre-commit)
cd "$(git rev-parse --show-toplevel)"

COMMIT_MSG_FILE="$1"
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

# Extract type (feat, fix, etc.)
TYPE=$(echo "$BRANCH_NAME" | grep -oE '^(feat|fix|chore|refactor|docs|style|test|perf|build|ci|revert|hotfix|bugfix)' || true)

# Extract JIRA ticket (like IMS-123)
JIRA_TICKET=$(echo "$BRANCH_NAME" | grep -oE '[A-Z]{2,10}-[0-9]+' || true)

echo "-------------------------------------------"
echo "🔎 Detected branch: $BRANCH_NAME"
echo "📦 Type: ${TYPE:-<none>}"
echo "🎟️  JIRA Ticket: ${JIRA_TICKET:-<none>}"
echo "-------------------------------------------"

# Read current commit message
COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")

# Check if already prefixed
if grep -Eq '^[a-z]+\([A-Z]{2,10}-[0-9]+\):' "$COMMIT_MSG_FILE"; then
    echo "✅ Commit already prefixed correctly."
else
    if [[ -n "$TYPE" && -n "$JIRA_TICKET" ]]; then
        NEW_COMMIT_MSG="${TYPE}(${JIRA_TICKET}): ${COMMIT_MSG}"

        echo ""
        echo "Auto prefixing commit message with: '${TYPE}(${JIRA_TICKET}):' "
        echo ""

        echo "$NEW_COMMIT_MSG" > "$COMMIT_MSG_FILE"
        echo "✨ Auto-prefixed."

        echo ""
        echo "-------------------------------------------"
        echo "$NEW_COMMIT_MSG"
        echo "-------------------------------------------"
        echo ""

    else
        echo "⚠️ Missing type or JIRA ticket in branch name as well as from commit message."
        exit 1
    fi
fi

# Run commitlint validation with JIRA_TICKET environment
echo ""
echo "🧩 Running commitlint validation..."
JIRA_TICKET="$JIRA_TICKET" npx commitlint --edit "$COMMIT_MSG_FILE"
echo "✅ Commitlint check passed!"
