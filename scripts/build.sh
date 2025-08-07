#!/bin/sh

set -e

# Build the the nextjs submodule
echo "Building the nextjs submodule..."
cd startup-finance
pnpm install
pnpm test
pnpm build:hugo
cd ..

echo "Building the project..."
hugo

echo "Done"
