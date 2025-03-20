#!/usr/bin/env node

/**
 * Sidebar Configuration Validator
 * 
 * This script validates the sidebar.yaml configuration file to ensure:
 * - All URLs are properly formatted
 * - All URLs point to existing content files
 * 
 * Usage: node scripts/validate-sidebar.js
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Configuration
const SIDEBAR_CONFIG_PATH = path.join(__dirname, '..', 'data', 'sidebar.yaml');
const CONTENT_ROOT = path.join(__dirname, '..', 'content');

// Load the sidebar configuration
let sidebarConfig;
try {
  const fileContents = fs.readFileSync(SIDEBAR_CONFIG_PATH, 'utf8');
  sidebarConfig = yaml.load(fileContents);
} catch (e) {
  console.error('Error loading sidebar configuration:', e.message);
  process.exit(1);
}

// Track validation results
const results = {
  errors: [],
  warnings: [],
  validUrls: 0,
  totalUrls: 0
};

// Validate URLs in the sidebar configuration
function validateUrls(items, level = 0) {
  if (!items) return;
  
  for (const item of items) {
    // Check URL if present
    if (item.url) {
      results.totalUrls++;
      
      // Validate URL format
      if (!item.url.startsWith('/')) {
        results.errors.push(`Invalid URL format: ${item.url} - URLs must start with /`);
        continue;
      }
      
      // Convert URL to content file path
      let contentPath = item.url;
      if (contentPath.endsWith('/')) {
        contentPath = contentPath.slice(0, -1);
      }
      
      // Remove leading slash and add content root
      contentPath = contentPath.replace(/^\//, '');
      
      // Handle index pages
      let filePath;
      if (contentPath.endsWith('index')) {
        filePath = path.join(CONTENT_ROOT, contentPath + '.md');
      } else {
        // Check for both direct file and _index.md
        const directFilePath = path.join(CONTENT_ROOT, contentPath + '.md');
        const indexFilePath = path.join(CONTENT_ROOT, contentPath, '_index.md');
        
        if (fs.existsSync(directFilePath)) {
          filePath = directFilePath;
        } else if (fs.existsSync(indexFilePath)) {
          filePath = indexFilePath;
        } else {
          results.errors.push(`Content file not found for URL: ${item.url}`);
          continue;
        }
      }
      
      // Verify file exists
      if (!fs.existsSync(filePath)) {
        results.errors.push(`Content file not found: ${filePath} for URL: ${item.url}`);
      } else {
        results.validUrls++;
      }
    }
    
    // Recursively validate child items
    if (item.items) {
      validateUrls(item.items, level + 1);
    }
  }
}

// Start validation
console.log('Validating sidebar configuration...');
validateUrls(sidebarConfig.sidebar);

// Print results
console.log('\nValidation Results:');
console.log(`Total URLs: ${results.totalUrls}`);
console.log(`Valid URLs: ${results.validUrls}`);
console.log(`Errors: ${results.errors.length}`);

if (results.errors.length > 0) {
  console.log('\nErrors:');
  results.errors.forEach((error, index) => {
    console.log(`${index + 1}. ${error}`);
  });
}

if (results.warnings.length > 0) {
  console.log('\nWarnings:');
  results.warnings.forEach((warning, index) => {
    console.log(`${index + 1}. ${warning}`);
  });
}

if (results.errors.length === 0 && results.warnings.length === 0) {
  console.log('\nSidebar configuration is valid!');
}
