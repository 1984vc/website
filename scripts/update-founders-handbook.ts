#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';

interface FrontMatter {
  title: string;
  Category?: string;
  Icon?: string;
  'Sidebar Title'?: string;
  [key: string]: any;
}

interface TocItem {
  title: string;
  icon?: string;
  url: string;
}

interface TocSection {
  title: string;
  weight: number;
  items: TocItem[];
}

interface FoundersHandbookConfig {
  toc: TocSection[];
}

// Function to parse front matter from markdown content
function parseFrontMatter(content: string): FrontMatter | null {
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontMatterMatch) {
    return null;
  }

  try {
    return yaml.parse(frontMatterMatch[1]) as FrontMatter;
  } catch (error) {
    console.error('Error parsing front matter:', error);
    return null;
  }
}

// Function to recursively find all markdown files
function findMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to generate URL from file path
function generateUrl(filePath: string): string {
  // Remove content prefix and .md extension
  let url = filePath.replace(/^content\//, '').replace(/\.md$/, '');
  
  // Handle _index.md files
  if (url.endsWith('/_index')) {
    url = url.replace('/_index', '/');
  } else {
    url = url + '/';
  }
  
  // Ensure it starts with /docs/ but avoid double /docs/
  if (!url.startsWith('/')) {
    url = '/' + url;
  }
  if (!url.startsWith('/docs/')) {
    url = '/docs' + url;
  }
  
  return url;
}

// Function to convert icon name to match the format used in the existing YAML
function normalizeIcon(icon: string): string {
  if (!icon) return 'document-text';
  
  // Convert common icon names to match the existing format
  const iconMap: { [key: string]: string } = {
    'calculator': 'calculator',
    'presentation-line-chart': 'presentation-chart-line',
    'presentation-chart-line': 'presentation-chart-line',
    'currency-dollar': 'currency-dollar',
    'user-group': 'user-group',
    'logout': 'logout',
    'document-text': 'document-text',
    'emoji-sad': 'emoji-sad',
    'table': 'table'
  };
  
  return iconMap[icon] || icon || 'document-text';
}

// Main function
function main() {
  const contentSrcDir = 'content';
  const templatePath = 'template/foundersHandbook.template.yaml';
  const outputPath = 'data/foundersHandbook.yaml';

  console.log('🔍 Scanning for markdown files...');
  
  // Find all markdown files in template/content
  const markdownFiles = findMarkdownFiles(contentSrcDir);
  console.log(`Found ${markdownFiles.length} markdown files`);

  // Load the template
  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Template file not found: ${templatePath}`);
    process.exit(1);
  }

  const templateContent = fs.readFileSync(templatePath, 'utf8');
  const config: FoundersHandbookConfig = yaml.parse(templateContent);

  console.log('📝 Processing markdown files...');

  // Process each markdown file
  const categorizedItems: { [category: string]: TocItem[] } = {};

  for (const filePath of markdownFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const frontMatter = parseFrontMatter(content);

      if (!frontMatter || !frontMatter.Category) {
        continue; // Skip files without category
      }

      // Skip files marked as draft
      if (frontMatter.draft === true) {
        console.log(`  ⏭️  Skipping draft: ${frontMatter.title || filePath}`);
        continue;
      }

      // Skip _index.md files
      if (path.basename(filePath) === '_index.md') {
        console.log(`  ⏭️  Skipping index file: ${filePath}`);
        continue;
      }

      const category = frontMatter.Category;
      const sidebarTitle = frontMatter['Sidebar Title'];
      const title = (sidebarTitle && sidebarTitle.trim() !== '') ? sidebarTitle : frontMatter.title;
      const icon = normalizeIcon(frontMatter.Icon || '');
      const url = generateUrl(filePath);

      if (!categorizedItems[category]) {
        categorizedItems[category] = [];
      }

      categorizedItems[category].push({
        title,
        icon,
        url
      });

      console.log(`  ✅ ${title} → ${category}`);
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error);
    }
  }

  console.log('🔧 Merging items into template...');

  // Merge categorized items into the template
  for (const section of config.toc) {
    const sectionTitle = section.title;
    
    // Get existing items (like the Cap Table Worksheet app)
    const existingItems = section.items || [];
    
    // Update URLs of existing template items to remove /docs/content/ prefix
    for (const item of existingItems) {
      if (item.url && item.url.startsWith('/docs/content/')) {
        // Remove /docs/content/ prefix and replace with /docs/
        item.url = item.url.replace('/docs/content/', '/docs/');
      }
    }
    
    if (categorizedItems[sectionTitle]) {
      // Add new items from markdown files
      const newItems = categorizedItems[sectionTitle];
      
      // Combine and deduplicate based on title
      const allItems = [...existingItems];
      
      for (const newItem of newItems) {
        const existingIndex = allItems.findIndex(item => item.title === newItem.title);
        if (existingIndex >= 0) {
          // Update existing item
          allItems[existingIndex] = newItem;
        } else {
          // Add new item
          allItems.push(newItem);
        }
      }
      
      section.items = allItems;
      console.log(`  📂 ${sectionTitle}: ${allItems.length} items`);
    } else {
      // Even if no new items, update the section with corrected URLs
      section.items = existingItems;
      console.log(`  📂 ${sectionTitle}: ${existingItems.length} items (template only)`);
    }
  }

  console.log('🧹 Removing empty sections...');
  
  // Remove sections that have no items
  const sectionsBeforeFilter = config.toc.length;
  config.toc = config.toc.filter(section => {
    const hasItems = section.items && section.items.length > 0;
    if (!hasItems) {
      console.log(`  🗑️  Removing empty section: ${section.title}`);
    }
    return hasItems;
  });
  
  const sectionsAfterFilter = config.toc.length;
  console.log(`  Removed ${sectionsBeforeFilter - sectionsAfterFilter} empty sections`);

  console.log('📊 Sorting sections by weight...');
  
  // Sort sections by weight
  config.toc.sort((a, b) => a.weight - b.weight);

  // Write the updated configuration
  const updatedYaml = yaml.stringify(config, {
    indent: 2,
    lineWidth: 0,
    minContentWidth: 0
  });

  // Add the comment header back
  const finalContent = `# Custom sidebar configuration
# Icons can be found here: https://v1.heroicons.com/
${updatedYaml}`;

  fs.writeFileSync(outputPath, finalContent, 'utf8');

  console.log(`✅ Updated founders handbook saved to: ${outputPath}`);
  
  // Summary
  const totalItems = Object.values(categorizedItems).reduce((sum, items) => sum + items.length, 0);
  console.log(`\n📊 Summary:`);
  console.log(`  • Processed ${markdownFiles.length} markdown files`);
  console.log(`  • Found ${totalItems} items with categories`);
  console.log(`  • Updated ${Object.keys(categorizedItems).length} sections`);
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
