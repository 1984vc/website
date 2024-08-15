#!/bin/sh

# Build the the nextjs submodule
echo "Building the nextjs submodule..."
cd startup-finance
yarn install --frozen-lockfile
yarn test
yarn build:hugo
cd ..

# Build the project static root project
echo "Building the project..."
hugo

echo "Done"
