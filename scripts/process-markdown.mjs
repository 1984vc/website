import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { glob } from 'glob';

const authors = {
  "e81a9c32-5ed4-4743-aca4-0e8a22c007f2": {
    name: "Ramy Adeeb",
    link: "https://linkedin.com/in/ramyadeeb",
    image: "/landing/people/Ramy.svg"
  },
  "cdef0605-eaff-416b-b254-8ed554e34d62": {
    name: "Mark Percival",
    link: "https://linkedin.com/in/markpercival",
    image: "/landing/people/Mark.svg"
  },
  "53293e17-8da4-49dc-abe9-8f4635948bfd": {
    name: "Farzad Soleimani",
    link: "https://linkedin.com/in/farzadsoleimani",
    image: "/landing/people/Farzad.svg"
  },
  "c147152b-1426-4fb8-b2ca-e548cf89c47f": {
    name: "Samit Kalra",
    link: "https://linkedin.com/in/samitkalra",
    image: "/landing/people/Samit.svg"
  },
}

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
    (frontMatter.Draft === true) || 
    (frontMatter.draft === true);
  
  // Create copy of front matter and remove path
  const filteredFrontMatter = { ...frontMatter };
  delete filteredFrontMatter.path;
  delete filteredFrontMatter.lastEditedAt;

  // Process authors if present
  if (Array.isArray(filteredFrontMatter.author)) {
    // Convert author UUIDs to array of author details
    const authorDetails = filteredFrontMatter.author
      .map(authorId => {
        const author = authors[authorId];
        if (author) {
          return {
            name: author.name,
            link: author.link,
            image: author.image
          };
        }
        return undefined;
      })
      .filter(author => author !== undefined);
    
    // Assign the array directly
    filteredFrontMatter.authors = authorDetails
    // Remove the original author field
    delete filteredFrontMatter.author;
  }
  
  // Only return content if published
  return isDraft ? null : matter.stringify({ content, data: filteredFrontMatter });
}

main().catch(console.error);
