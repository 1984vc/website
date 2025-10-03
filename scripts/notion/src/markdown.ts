import { Client, isFullPage } from '@notionhq/client';
import { NotionConverter } from 'notion-to-md';
import { mkdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { stringify } from 'yaml'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints.js';
import { CustomRenderer } from './custom-renderer.js';

interface ExportOptions {
  database: string;
  output: string;
  notionToken: string;
  includeJson?: boolean;
  noFrontmatter?: boolean;
  extension?: string;
  skipMeta?: boolean;
  useHextraTransformers?: boolean;
  authors: Record<string, {
    name: string,
    link: string,
    image: string,
  }>
}

interface PageExport {
  title: string;
  content: string;
  metadata: {
    notionId: string;
    createdAt: string;
    lastEditedAt: string;
    weight: number;
  };
  outputPath: string;
}

interface ExportProgress {
  type: 'start' | 'page' | 'meta' | 'json' | 'complete';
  totalPages?: number;
  currentPage?: number;
  pageId?: string;
  outputPath?: string;
  directory?: string;
  error?: string;
}

interface TitleProperty {
  type: 'title';
  title: Array<{
    plain_text: string;
  }>;
}

interface RichTextProperty {
  type: 'rich_text';
  rich_text: Array<{
    plain_text: string;
  }>;
}

interface NumberProperty {
  type: 'number';
  number: number;
}

interface SelectProperty {
  type: 'select';
  select: {
    name: string;
  } | null;
}

interface MultiSelectProperty {
  type: 'multi_select';
  multi_select: Array<{
    name: string;
  }>;
}

interface DateProperty {
  type: 'date';
  date: {
    start: string;
  } | null;
}

interface CheckboxProperty {
  type: 'checkbox';
  checkbox: boolean;
}

interface UrlProperty {
  type: 'url';
  url: string | null;
}

interface EmailProperty {
  type: 'email';
  email: string | null;
}

interface PhoneNumberProperty {
  type: 'phone_number';
  phone_number: string | null;
}

interface FormulaProperty {
  type: 'formula';
  formula: {
    type: 'string' | 'number';
    string?: string;
    number?: number;
  };
}

interface RelationProperty {
  type: 'relation';
  relation: Array<{
    id: string;
  }>;
}

interface RollupProperty {
  type: 'rollup';
  rollup: {
    type: 'array';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    array: Array<any>;
  };
}

interface CreatedTimeProperty {
  type: 'created_time';
  created_time: string;
}

interface LastEditedTimeProperty {
  type: 'last_edited_time';
  last_edited_time: string;
}

interface CreatedByProperty {
  type: 'created_by';
  created_by: {
    id: string;
  };
}

interface LastEditedByProperty {
  type: 'last_edited_by';
  last_edited_by: {
    id: string;
  };
}

interface PeopleProperty {
  type: 'people';
  people: Array<{
    object: 'user';
    id: string;
  }>;
}

type NotionProperty = TitleProperty | RichTextProperty | NumberProperty | SelectProperty | MultiSelectProperty | DateProperty | CheckboxProperty | UrlProperty | EmailProperty | PhoneNumberProperty | FormulaProperty | RelationProperty | RollupProperty | CreatedTimeProperty | LastEditedTimeProperty | CreatedByProperty | LastEditedByProperty | PeopleProperty;

export class NotionMarkdownExporter {
  private notion: Client;
  private n2m: NotionConverter;
  private pagePathCache: Map<string, string>;
  private baseUrl?: string;
  private assetsPath?: string;
  private assetsBasePath?: string;

  constructor(options: { notionToken: string; baseUrl?: string; assetsPath?: string; assetsBasePath?: string, transformers?: (n2m: NotionConverter) => void; }) {
    this.notion = new Client({ auth: options.notionToken });
    
    // Create custom renderer with URL transformation and Hextra callouts
    const customRenderer = new CustomRenderer({ baseUrl: options.baseUrl });
    
    // Initialize converter with custom renderer
    this.n2m = new NotionConverter(this.notion).withRenderer(customRenderer);
    
    this.pagePathCache = new Map();
    this.baseUrl = options.baseUrl;
    this.assetsPath = options.assetsPath;
    this.assetsBasePath = options.assetsBasePath;

    // Use v4's built-in media handling if assetsPath is provided
    if (this.assetsPath) {
      this.n2m = this.n2m.downloadMediaTo({
        outputDir: this.assetsPath,
        transformPath: (localPath) => {
          const fileName = require('path').basename(localPath);
          return this.assetsBasePath ? require('path').join(this.assetsBasePath, fileName) : fileName;
        }
      });
    }

    if (options.transformers) {
      options.transformers(this.n2m);
    }
  }

  private normalizeQuotes(content: string): string {
    return content.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, '\'');
  }

  private async getPageTitle(pageInfo: PageObjectResponse): Promise<string> {
    const properties = pageInfo.properties as Record<string, NotionProperty>;
    const titleProp = Object.values(properties).find(
      (prop): prop is TitleProperty => prop.type === 'title'
    );

    return titleProp?.title?.[0]?.plain_text || 'untitled';
  }

  private async getOutputPath(pageInfo: PageObjectResponse, baseOutputDir: string, title: string, options: ExportOptions): Promise<string> {
    const properties = pageInfo.properties as Record<string, NotionProperty>;
    const pathProp = (properties['path'] || properties['Path']) as RichTextProperty | undefined;

    if (pathProp?.type === 'rich_text' && pathProp.rich_text[0]?.plain_text) {
      const customPath = pathProp.rich_text[0].plain_text;
      const pathParts = customPath.split('/');
      const extension = options.extension || '.mdx';
      const filename = `${pathParts.pop()}${extension}`;
      const directories = pathParts.join('/');
      return join(baseOutputDir, directories, filename);
    }

    const extension = options.extension || '.mdx';
    const filename = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}${extension}`;
    return join(baseOutputDir, filename);
  }

  private async convertPageToMarkdown(pageId: string): Promise<string> {
    const result = await this.n2m.convert(pageId);
    return this.normalizeQuotes(result.content);
  }

  private async processPage(page: PageObjectResponse, baseOutputDir: string, options: ExportOptions): Promise<PageExport> {
    const pageInfo = await this.notion.pages.retrieve({ page_id: page.id });

    if (!isFullPage(pageInfo)) {
      throw new Error('Retrieved incomplete page object');
    }

    const properties = pageInfo.properties as Record<string, NotionProperty>;
    const weightProp = (properties['weight'] || properties['Weight']) as NumberProperty | undefined;
    const weight = weightProp?.type === 'number' ? weightProp.number : 0;

    const title = await this.getPageTitle(pageInfo);
    const markdown = await this.convertPageToMarkdown(page.id);
    const outputPath = await this.getOutputPath(pageInfo, baseOutputDir, title, options);

    return {
      title,
      content: markdown,
      metadata: {
        notionId: page.id,
        createdAt: pageInfo.created_time,
        lastEditedAt: pageInfo.last_edited_time,
        weight
      },
      outputPath,
    };
  }

  private async exportDatabaseJson(database: string, output: string): Promise<void> {
    const response = await this.notion.databases.query({
      database_id: database
    });

    const pages = [];
    for (const page of response.results) {
      const pageInfo = await this.notion.pages.retrieve({ page_id: page.id });
      const blocks = await this.notion.blocks.children.list({ block_id: page.id });
      pages.push({
        page: pageInfo,
        blocks: blocks.results
      });
    }

    const jsonPath = join(output, 'index.json');
    await writeFile(jsonPath, JSON.stringify({ pages }, null, 2), 'utf8');
  }

  public async *exportDatabase(options: ExportOptions): AsyncGenerator<ExportProgress> {

    await mkdir(options.output, { recursive: true });

    const response = await this.notion.databases.query({
      database_id: options.database
    });

    yield {
      type: 'start',
      totalPages: response.results.length
    };

    for (const [index, page] of response.results.entries()) {
      try {
        if (!isFullPage(page)) {
          throw new Error('Received partial page object');
        }

        const exportedPage = await this.processPage(page, options.output, options);
        const dirPath = dirname(exportedPage.outputPath);
        await mkdir(dirPath, { recursive: true });

        let content = exportedPage.content;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const frontmatter: Record<string, any> = {
          title: exportedPage.title,
          notionId: exportedPage.metadata.notionId,
          createdAt: exportedPage.metadata.createdAt,
          lastEditedAt: exportedPage.metadata.lastEditedAt,
          weight: exportedPage.metadata.weight
        };

        // Add all page properties
        const properties = page.properties as Record<string, NotionProperty>;
        for (const [key, prop] of Object.entries(properties)) {
          switch (prop.type) {
            case 'title':
              frontmatter[key] = prop.title?.[0]?.plain_text || '';
              break;
            case 'rich_text':
              frontmatter[key] = prop.rich_text?.[0]?.plain_text || '';
              break;
            case 'number':
              frontmatter[key] = prop.number;
              break;
            case 'select':
              frontmatter[key] = prop.select?.name || '';
              break;
            case 'multi_select':
              frontmatter[key] = prop.multi_select?.map(s => s.name) || [];
              break;
            case 'date':
              frontmatter[key] = prop.date?.start || '';
              break;
            case 'checkbox':
              frontmatter[key] = prop.checkbox;
              break;
            case 'url':
              frontmatter[key] = prop.url || '';
              break;
            case 'email':
              frontmatter[key] = prop.email || '';
              break;
            case 'phone_number':
              frontmatter[key] = prop.phone_number || '';
              break;
            case 'formula':
              frontmatter[key] = prop.formula?.string || prop.formula?.number || '';
              break;
            case 'relation':
              frontmatter[key] = prop.relation?.map(r => r.id) || [];
              break;
            case 'rollup':
              frontmatter[key] = prop.rollup?.array || [];
              break;
            case 'created_time':
              frontmatter[key] = prop.created_time;
              break;
            case 'last_edited_time':
              frontmatter[key] = prop.last_edited_time;
              break;
            case 'created_by':
              frontmatter[key] = prop.created_by?.id || '';
              break;
            case 'last_edited_by':
              frontmatter[key] = prop.last_edited_by?.id || '';
              break;
            case 'people':
              frontmatter[key] = prop.people?.map(p => p.id) || [];
              break;
            default:
              frontmatter[key] = '';
          }
        }

          // Convert to YAML front-matter
          delete frontmatter.path
          delete frontmatter.lastEditedAt
          
          // Handle authors field - expects array of author names
          const authorNames = frontmatter.authors as any[] || []

        frontmatter['authors'] = authorNames
          .map(authorName => {
            const author = options.authors[authorName];
            if (author) {
              return {
                name: author.name,
                link: author.link,
                image: author.image
              };
            }
            return undefined;
          })
          .filter(author => author !== undefined)



          const yaml = stringify(frontmatter)

          content = `---
${yaml}
---

${content}`;

        await writeFile(exportedPage.outputPath, content, 'utf8');


        yield {
          type: 'page',
          currentPage: index + 1,
          totalPages: response.results.length,
          pageId: page.id,
          outputPath: exportedPage.outputPath
        };

      } catch (error) {
        yield {
          type: 'page',
          currentPage: index + 1,
          totalPages: response.results.length,
          pageId: page.id,
          error: error instanceof Error ? error.message : String(error)
        };
      }
    }

    if (options.includeJson) {
      await this.exportDatabaseJson(options.database, options.output);
      yield {
        type: 'json'
      };
    }

    yield { type: 'complete' };
  }
}
