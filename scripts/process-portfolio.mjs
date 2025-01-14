import fs from 'fs/promises';

async function main() {
  const [rawPath, outputPath] = process.argv.slice(2);
  
  if (!rawPath || !outputPath) {
    console.error('Usage: node process_portfolio.mjs <raw-json-path> <output-json-path>');
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
      Story,
      SortOrderOverride: company.properties['Sort Order Override'].number
    };
  });

  // Sort companies: Sort Order Override first (if exists), then highlighted, then alphabetically
  Companies.sort((a, b) => {
    // If both have Sort Order Override, sort by that
    if (a.SortOrderOverride !== null && b.SortOrderOverride !== null) {
      return a.SortOrderOverride - b.SortOrderOverride;
    }
    // If only one has Sort Order Override, that one comes first
    if (a.SortOrderOverride !== null) return -1;
    if (b.SortOrderOverride !== null) return 1;
    
    // If neither has Sort Order Override, sort by highlighted then name
    if (a.Highlighted !== b.Highlighted) {
      return b.Highlighted - a.Highlighted;
    }
    return a.Name.localeCompare(b.Name);
  });

  // Remove SortOrderOverride from output
  const output = Companies.map(({SortOrderOverride, ...rest}) => rest);

  await fs.writeFile(outputPath, JSON.stringify(output, null, 2));
}

main().catch(console.error);
