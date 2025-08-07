#!/bin/bash

set -e

mkdir -p content
rsync -r template/content/. content/.