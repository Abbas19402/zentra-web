#!/bin/bash

# A script to automate a modular folder structure for the Next.js App Router.
# Usage: ./setup-app-router.sh <ModuleName>
# Example: ./setup-app-router.sh Watch

# Check if a module name was provided (e.g., Watch, Auth, Upload)
if [ -z "$1" ]; then
  echo "❌ Error: No module name provided."
  echo "Usage: ./setup-app-router.sh <ModuleName>"
  exit 1
fi

# Convert module name to lowercase for the URL path
MODULE_NAME_PASCAL=$1
MODULE_NAME_LOWER=$(echo "$1" | tr '[:upper:]' '[:lower:]')

echo "🚀 Starting App Router project structure setup..."

# 1. Create shared directories
echo "-> Creating 'shared' and 'lib' directories..."
mkdir -p src/shared/components/ui src/shared/components/layout
mkdir -p src/shared/hooks src/shared/services src/shared/types
mkdir -p src/lib

# 2. Create the module structure inside 'app' using a route group
echo "-> Creating module: $MODULE_NAME_PASCAL..."
MODULE_PATH="src/app/(modules)/$MODULE_NAME_LOWER"
mkdir -p "$MODULE_PATH/components"
mkdir -p "$MODULE_PATH/services"
mkdir -p "$MODULE_PATH/types"

# 3. Create placeholder and core route files
echo "-> Adding placeholder and route files..."
touch src/shared/components/ui/.gitkeep
touch src/shared/components/layout/.gitkeep
touch src/shared/hooks/.gitkeep
touch src/shared/services/.gitkeep
touch src/shared/types/.gitkeep
touch src/lib/.gitkeep
touch "$MODULE_PATH/components/.gitkeep"
touch "$MODULE_PATH/services/.gitkeep"
touch "$MODULE_PATH/types/.gitkeep"

# Create the main page and layout file for the new route
touch "$MODULE_PATH/page.tsx"
touch "$MODULE_PATH/layout.tsx"

echo "✅ Done! Project structure for module '$MODULE_NAME_PASCAL' created at '$MODULE_PATH'."
echo "   URL will be: /$MODULE_NAME_LOWER"