#!/bin/sh

set -e

# Build the the nextjs submodule
echo "Building the nextjs submodule..."
cd startup-finance
yarn install --frozen-lockfile
yarn test
yarn build:hugo
cd ..

# Move our snapshot content to the content directory
rm -rf ./content && mkdir ./content
cp -R src-content/static/. ./content
cp -R src-content/notion/. ./content

# Build the project static root project
echo "Building the project..."
hugo

echo "Done"
