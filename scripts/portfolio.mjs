import fs from 'fs/promises';

async function main() {
  const [rawPath, outputPath] = process.argv.slice(2);
  
  if (!rawPath || !outputPath) {
    console.error('Usage: node portfolio.mjs <raw-json-path> <output-json-path>');
    process.exit(1);
  }

  // Read raw JSON
  const rawData = JSON.parse(await fs.readFile(rawPath, 'utf-8'));

  // Transform data
  const companies = rawData.results.map(company => {
    // Extract tags from Filters property
    const filterText = company.properties.Filters.rich_text[0]?.plain_text || '';
    const tags = filterText.split(' ').filter(tag => tag.length > 0);

    // Get stage if it exists
    const stage = company.properties.Stage.select?.name || null;

    // Get story if it exists
    const story = company.properties.Story.rich_text[0]?.plain_text || null;

    return {
      name: company.properties.Name.title[0].plain_text,
      url: company.properties.URL.url,
      description: company.properties.Description.rich_text[0]?.plain_text || '',
      tags,
      highlighted: company.properties.Highlighted.checkbox,
      stage,
      story
    };
  });

  // Sort companies: highlighted first, then alphabetically
  companies.sort((a, b) => {
    if (a.highlighted !== b.highlighted) {
      return b.highlighted - a.highlighted;
    }
    return a.name.localeCompare(b.name);
  });

  // Write transformed data
  const output = {
    companies
  };

  await fs.writeFile(outputPath, JSON.stringify(output, null, 2));
}

main().catch(console.error);
