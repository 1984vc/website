#!/bin/sh
set -e

# Pull in the content to the repo
cd scripts/notion
pnpm install
pnpm run cli export hextra -o ../../content-src/notion --id 159829231d098087b96fd112a91c7430 --assets-path ../../static/notion_assets --assets-path-base "/notion_assets" --base-url "https://1984.vc"
pnpm run cli export json --id 155829231d0980779375ed60cc94a9de -o ../../data/portco.json
rm -rf ./content/notion && mkdir -p ./content/notion
