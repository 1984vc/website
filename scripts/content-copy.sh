#!/bin/bash

set -e

rsync -r --exclude 'notion' content-src/. content/.
rsync -r content-src/notion/. content/.