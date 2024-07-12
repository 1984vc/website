#!/bin/sh

# Build the project static root project
echo "Building the project..."
hugo

# Build the the nextjs submodule
echo "Building the nextjs submodule..."
cd startup-finance
yarn install --frozen-lockfile
BUILD_DIST="../public" yarn build
cd ..

echo "Done"
