#!/bin/bash

set -e

rm -rf content && mkdir content
rsync -r --exclude 'notion' data/content/. content/.
rsync -r data/content/notion/. content/.