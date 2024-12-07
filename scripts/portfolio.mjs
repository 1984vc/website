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
  const Companies = rawData.results.map(company => {
    // Extract tags from Filters property
    const filterText = company.properties.Filters.rich_text[0]?.plain_text || '';
    const Tags = filterText.split(' ').filter(tag => tag.length > 0);

    // Get stage if it exists
    const Stage = company.properties.Stage.select?.name || null;

    // Get story if it exists
    const Story = company.properties.Story.rich_text[0]?.plain_text || null;

    return {
      Name: company.properties.Name.title[0].plain_text,
      URL: company.properties.URL.url,
      Description: company.properties.Description.rich_text[0]?.plain_text || '',
      Tags,
      Highlighted: company.properties.Highlighted.checkbox,
      Stage,
      Story
    };
  });

  // Sort companies: highlighted first, then alphabetically
  Companies.sort((a, b) => {
    if (a.Highlighted !== b.Highlighted) {
      return b.Highlighted - a.Highlighted;
    }
    return a.Name.localeCompare(b.Name);
  });

  // Write transformed data
  const output = [...Companies]

  await fs.writeFile(outputPath, JSON.stringify(output, null, 2));
}

main().catch(console.error);
