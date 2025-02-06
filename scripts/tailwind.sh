#!/bin/bash

set -e

pnpm exec tailwindcss -i layouts/styles/main.css -c tailwind.config.js -o assets/styles/compiled/main.css