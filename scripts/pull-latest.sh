#!/bin/sh
set -e

# Pull in the content to the repo
./scripts/import-notion.sh
./scripts/content-copy.sh
