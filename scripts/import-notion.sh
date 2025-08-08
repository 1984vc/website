#!/bin/sh
set -e

# Pull in the content to the repo
rm -rf ./content && mkdir -p ./content
cd scripts/notion
pnpm run cli export hextra -o ../../content --id 159829231d098087b96fd112a91c7430 --assets-path ../../static/notion_assets --assets-path-base "/notion_assets" --base-url "https://1984.vc"
pnpm run cli export json --id 155829231d0980779375ed60cc94a9de -o ../../data/portco.json
cd ../..
pnpm exec tsx scripts/update-founders-handbook.ts
