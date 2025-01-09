#!/bin/sh
set -e

# Pull in the content to the repo
npm install
npx @1984vc/notion-tools export hextra -o ./tmp/content/docs --id 159829231d098087b96fd112a91c7430 --base-path docs
npx @1984vc/notion-tools raw-json --id 155829231d0980779375ed60cc94a9de -o ./tmp/portfolio-raw.json
node ./scripts/process-portfolio.mjs ./tmp/portfolio-raw.json ./data/portfolio.json
rm -rf ./content/notion
node ./scripts/process-markdown.mjs ./tmp/content ./content/notion
