import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { glob } from 'glob';

async function main() {
  const [inputDir, outputDir] = process.argv.slice(2);
  
  if (!inputDir || !outputDir) {
    console.error('Usage: node process-markdown.mjs <input-directory> <output-directory>');
    process.exit(1);
  }

  // Find all markdown files recursively
  const files = await glob('**/*.md', { cwd: inputDir });
  
  // Process each file
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const fileContent = await fs.readFile(inputPath, 'utf-8');
    
    // Parse front matter and content
    const { data: frontMatter, content } = matter(fileContent);
    
    // Process content
    const processedContent = processMarkdown(frontMatter, content);
    
    // Write to output if not null
    if (processedContent !== null) {
      const outputPath = path.join(outputDir, file);
      // Create output directory if it doesn't exist
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, processedContent);
      console.log(`Processed ${file} -> ${outputPath}`);
    }
  }
}

/**
 * Processes markdown content
 * @param {Object} frontMatter - Parsed front matter
 * @param {string} content - Markdown content
 * @returns {string|null} - Processed content or null to skip
 */
function processMarkdown(frontMatter, content) {
  // Check for Published or published key in front matter
  const isDraft = 
    (frontMatter.draft === true) || 
    (frontMatter.Draft === true);
  
  // Only return content if published
  return isDraft ? null : matter.stringify({ content, data: frontMatter });
}

main().catch(console.error);
