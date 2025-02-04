#!/bin/sh
set -e

# Pull in the content to the repo
npm install
rm -rf ./tmp/content
npx @1984vc/notion-tools export hextra -o ./tmp/content --id 159829231d098087b96fd112a91c7430 --base-url "https://1984.vc"
npx @1984vc/notion-tools export json --id 155829231d0980779375ed60cc94a9de -o ./data/portco.json
rm -rf ./content/notion && mkdir -p ./content/notion
node ./scripts/process-markdown.mjs ./tmp/content ./content-src/notion
