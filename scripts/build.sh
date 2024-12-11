#!/bin/sh

set -e

# Build the the nextjs submodule
echo "Building the nextjs submodule..."
cd docs
pnpm install --frozen-lockfile
pnpm test
pnpm build:hugo
cd ..

# Build the project static root project
echo "Building the project..."
hugo

echo "Done"
