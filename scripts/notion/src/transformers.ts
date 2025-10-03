import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints.js';
import { PageWithBlocks } from './json.js';

// NOTE: URL transformation and Hextra callouts are now implemented in custom-renderer.ts
// These legacy functions have been removed as they are no longer needed with v4's plugin architecture

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pageTransformer = (pageResponse: PageWithBlocks): any => {
  const page = pageResponse.page
  if ('properties' in page) {
    return {
      ...pageResponse,
      page: {
        ...pageResponse.page,
        properties: flattenProperties(page.properties),
      },
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const databaseTransformer = (response: QueryDatabaseResponse): any => {
  return response.results.map((page) => {
    if ('properties' in page) {
      return {
        ...page,
        properties: flattenProperties(page.properties),
      };
    }
    return page;
  });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const flattenProperties = (properties: Record<string, unknown>): Record<string, unknown> => {
  const simplifiedProperties: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(properties)) {
    if (value && typeof value === 'object') {
      const propertyType = (value as any).type;

      switch (propertyType) {
        case 'title':
          simplifiedProperties[key] = (value as any).title[0]?.plain_text || '';
          break;
        case 'rich_text':
          simplifiedProperties[key] = (value as any).rich_text.map((rt: any) => rt.plain_text).join('');
          break;
        case 'number':
          simplifiedProperties[key] = (value as any).number;
          break;
        case 'select':
          simplifiedProperties[key] = (value as any).select?.name || null;
          break;
        case 'multi_select':
          simplifiedProperties[key] = (value as any).multi_select.map((ms: any) => ms.name);
          break;
        case 'date':
          simplifiedProperties[key] = (value as any).date?.start || null;
          break;
        case 'checkbox':
          simplifiedProperties[key] = (value as any).checkbox;
          break;
        case 'url':
          simplifiedProperties[key] = (value as any).url || null;
          break;
        default:
          simplifiedProperties[key] = null;
          break;
      }
    } else {
      simplifiedProperties[key] = value;
    }
  }

  return simplifiedProperties;
}

// NOTE: Image downloading is now handled by v4's built-in downloadMediaTo() method in markdown.ts
// See: https://notionconvert.com/docs/v4/concepts/media-handler/
