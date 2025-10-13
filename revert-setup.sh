#!/bin/bash

# A script to revert the changes made by setup-app-router.sh.
# WARNING: This will permanently delete directories and files.
# Usage: ./revert-app-router.sh <ModuleName> [--all]
# Example: ./revert-app-router.sh Watch

# Check if a module name was provided
if [ -z "$1" ]; then
  echo "❌ Error: No module name provided."
  echo "Usage: ./revert-app-router.sh <ModuleName> [--all]"
  exit 1
fi

MODULE_NAME_LOWER=$(echo "$1" | tr '[:upper:]' '[:lower:]')
MODULE_PATH="src/app/(modules)/$MODULE_NAME_LOWER"
SHARED_PATH="src/shared"
LIB_PATH="src/lib"

echo "⚠️ WARNING: This script will permanently delete directories."
echo "   - Module Path: $MODULE_PATH"
if [ "$2" == "--all" ]; then
  echo "   - Shared Path: $SHARED_PATH"
  echo "   - Lib Path: $LIB_PATH"
fi
read -p "Are you sure you want to continue? [y/N] " response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
  echo "🔥 Reverting changes..."

  # Delete the specific module directory
  if [ -d "$MODULE_PATH" ]; then
    rm -rf "$MODULE_PATH"
    echo "-> Deleted module: $MODULE_PATH"
  else
    echo "-> Module path '$MODULE_PATH' not found. Skipping."
  fi

  # If --all flag is provided, delete shared and lib directories
  if [ "$2" == "--all" ]; then
    if [ -d "$SHARED_PATH" ]; then
      rm -rf "$SHARED_PATH"
      echo "-> Deleted directory: $SHARED_PATH"
    fi
    if [ -d "$LIB_PATH" ]; then
      rm -rf "$LIB_PATH"
      echo "-> Deleted directory: $LIB_PATH"
    fi
  fi

  echo "✅ Done. Reversion complete."
else
  echo "🚫 Operation cancelled."
fi