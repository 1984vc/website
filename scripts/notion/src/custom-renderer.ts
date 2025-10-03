import { MDXRenderer } from 'notion-to-md/plugins/renderer';

/**
 * Custom MDX Renderer for 1984 VC website
 * Extends the default MDX renderer with:
 * - URL transformation (absolute to relative)
 * - Hextra callout transformation
 */
export class CustomRenderer extends MDXRenderer {
  private baseUrl?: string;

  constructor(config: { baseUrl?: string } = {}) {
    super();
    this.baseUrl = config.baseUrl;

    this.setupUrlTransformation();
    this.setupHextraCallouts();
  }

  /**
   * Transform absolute URLs to relative URLs when they match the base URL
   */
  private setupUrlTransformation(): void {
    if (!this.baseUrl) return;

    const baseUrl = this.baseUrl;

    // Override the link annotation transformer
    this.createAnnotationTransformer('link', {
      transform: async ({ text, link }) => {
        if (!link?.url) return text;

        let url = link.url;

        // Transform absolute URLs to relative if they match the base URL
        if (url.startsWith(baseUrl)) {
          // If URL matches baseUrl exactly, convert to root path
          if (url === baseUrl) {
            url = '/';
          } else {
            // Convert absolute URL to relative by removing baseUrl
            url = url.replace(baseUrl, '');
          }
        }

        return `[${text}](${url})`;
      }
    });
  }

  /**
   * Transform Notion callouts to Hugo/Hextra callout shortcodes
   */
  private setupHextraCallouts(): void {
    this.createBlockTransformer('callout', {
      transform: async ({ block, utils }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const calloutBlock = block as any;

        // Get the callout icon (emoji or default)
        const icon = calloutBlock.callout.icon?.emoji || '📄';

        // Map Notion colors to Hextra callout types
        const colorTypeMap: Record<string, string> = {
          red: 'error',
          red_background: 'error',
          orange: 'warning',
          orange_background: 'warning',
          default: 'info',
          blue: 'info',
          blue_background: 'info',
          green: 'info',
          green_background: 'info',
          yellow: 'info',
          yellow_background: 'info',
          pink: 'info',
          pink_background: 'info',
          purple: 'info',
          purple_background: 'info',
          brown: 'info',
          brown_background: 'info',
          gray: 'info',
          gray_background: 'info'
        };

        const calloutType = colorTypeMap[calloutBlock.callout.color] || 'info';

        // Process the callout's rich text content
        const content = await utils.transformRichText(calloutBlock.callout.rich_text);

        // Format for Hextra's Callout component
        return `{{< callout type="${calloutType}" emoji="${icon}" >}}\n${content}\n{{< /callout >}}\n\n`;
      }
    });
  }
}
