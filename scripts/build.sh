#!/bin/sh

set -e

# Build the the nextjs submodule
echo "Building the nextjs submodule..."
cd startup-finance
yarn install --frozen-lockfile
yarn test
yarn build:hugo
cd ..

# Build the project static root project
echo "Building the project..."
rm -rf content && mkdir content
./scripts/content-copy.sh
hugo

echo "Done"
