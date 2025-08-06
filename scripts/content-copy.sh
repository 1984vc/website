#!/bin/bash

set -e

rm -rf content && mkdir content
rsync -r --exclude 'notion' src/content/. content/.
rsync -r src/content/notion/. content/.