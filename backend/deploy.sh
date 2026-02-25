#!/usr/bin/env bash
# ------------------------------------------------------------------------------
# deploy.sh — Build and package the backend for Lambda deployment
#
# Usage:
#   cd backend && bash deploy.sh          # Build only
#   cd backend && bash deploy.sh --apply  # Build + terraform apply
# ------------------------------------------------------------------------------
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR"
INFRA_DIR="$SCRIPT_DIR/../infrastructure"
ZIP_FILE="$BACKEND_DIR/deploy.zip"

echo "═══════════════════════════════════════════════════════════════════"
echo "  OT-Muse Backend — Lambda Deployment Builder"
echo "═══════════════════════════════════════════════════════════════════"

# ── Step 1: Install ALL dependencies (dev + prod) for compilation ────────────
echo ""
echo "→ Installing all dependencies (including dev for tsc)..."
cd "$BACKEND_DIR"
npm ci

# ── Step 2: Compile TypeScript ───────────────────────────────────────────────
echo ""
echo "→ Compiling TypeScript..."
npx tsc

# ── Step 3: Re-install production-only dependencies for packaging ────────────
echo ""
echo "→ Pruning to production dependencies only..."
npm ci --omit=dev

# ── Step 4: Package into zip ─────────────────────────────────────────────────
echo ""
echo "→ Creating deployment zip..."

# Remove old zip if present
rm -f "$ZIP_FILE"

# Create a clean staging directory
STAGING_DIR=$(mktemp -d)
trap "rm -rf $STAGING_DIR" EXIT

# Copy compiled JS output
cp -r "$BACKEND_DIR/dist/"* "$STAGING_DIR/"

# Copy production node_modules
cp -r "$BACKEND_DIR/node_modules" "$STAGING_DIR/node_modules"

# Create the zip from the staging directory
cd "$STAGING_DIR"
zip -r -q "$ZIP_FILE" .

ZIP_SIZE=$(du -sh "$ZIP_FILE" | cut -f1)
echo "✓ Created $ZIP_FILE ($ZIP_SIZE)"

# ── Step 5 (optional): Terraform apply ───────────────────────────────────────
if [[ "${1:-}" == "--apply" ]]; then
    echo ""
    echo "→ Running terraform apply..."
    cd "$INFRA_DIR"
    terraform init -upgrade
    terraform apply -auto-approve
    echo ""
    echo "✓ Deployment complete!"
    terraform output api_endpoint
fi

echo ""
echo "═══════════════════════════════════════════════════════════════════"
echo "  Done. To deploy, run:"
echo "    cd infrastructure && terraform apply"
echo "═══════════════════════════════════════════════════════════════════"
