#!/bin/bash

set -e

rm -rf content && mkdir content
rsync -r --exclude 'notion' content-src/. content/.
rsync -r content-src/notion/. content/.