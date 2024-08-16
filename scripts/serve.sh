#!/bin/sh

# Build the the nextjs submodule
echo "Building the nextjs submodule..."
cd startup-finance
yarn install --frozen-lockfile
yarn build:hugo
cd ..

# Build the project static root project
echo "Serving the project..."
hugo serve -w

echo "Done"
