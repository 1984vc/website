import { MDXRenderer } from 'notion-to-md/plugins/renderer';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

/**
 * Custom MDX Renderer for 1984 VC website
 * Extends the default MDX renderer with:
 * - URL transformation (absolute to relative)
 * - Hextra callout transformation
 * - Hash-based image downloading
 */
export class CustomRenderer extends MDXRenderer {
  private baseUrl?: string;
  private assetsPath?: string;
  private assetsBasePath?: string;

  constructor(config: { baseUrl?: string; assetsPath?: string; assetsBasePath?: string } = {}) {
    super();
    this.baseUrl = config.baseUrl;
    this.assetsPath = config.assetsPath;
    this.assetsBasePath = config.assetsBasePath;

    this.setupUrlTransformation();
    this.setupHextraCallouts();
    this.setupImageDownload();
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
   * Download images and save with SHA1 hash-based filenames
   * This maintains compatibility with existing content
   */
  private setupImageDownload(): void {
    if (!this.assetsPath) return;

    const assetsPath = this.assetsPath;
    const assetsBasePath = this.assetsBasePath || '';

    // Ensure the assets directory exists
    if (!fs.existsSync(assetsPath)) {
      fs.mkdirSync(assetsPath, { recursive: true });
    }

    this.createBlockTransformer('image', {
      transform: async ({ block }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const imageBlock = block as any;

        if (!imageBlock.image) return '';

        // Skip external images that aren't Notion-hosted
        if (imageBlock.image.external?.url && !imageBlock.image.file) {
          const externalUrl = imageBlock.image.external.url;
          const caption = imageBlock.image.caption && imageBlock.image.caption.length > 0 
            ? imageBlock.image.caption[0]?.plain_text 
            : '';
          return `![](${externalUrl})${caption ? ` *${caption}*` : ''}`;
        }

        // Get the image URL (either from file or external)
        const url = imageBlock.image.external?.url || imageBlock.image.file?.url;
        if (!url) return '';

        try {
          // Extract original filename and extension
          const originalName = path.basename(new URL(url).pathname);
          const ext = path.extname(originalName);

          // Download the image
          const response = await fetch(url);
          const arrayBuffer = await response.arrayBuffer();
          const fileBuffer = Buffer.from(arrayBuffer);

          // Create SHA1 hash of the image content
          const hash = crypto.createHash('sha1').update(fileBuffer).digest('hex');
          const fileName = hash + ext;

          // Define paths
          const localFilePath = path.join(assetsPath, fileName);
          const linkFilePath = path.join(assetsBasePath, fileName);

          // Save the file if it doesn't already exist
          console.log(`Saving image as ${localFilePath}`);
          if (!fs.existsSync(localFilePath)) {
            fs.writeFileSync(localFilePath, fileBuffer);
          }

          // Get caption if present
          const caption = imageBlock.image.caption && imageBlock.image.caption.length > 0 && imageBlock.image.caption[0]?.plain_text
            ? `*${imageBlock.image.caption[0].plain_text}*`
            : '';

          // Return markdown with hash-based filename
          return `![${fileName}](${linkFilePath})${caption ? ` ${caption}` : ''}`;
        } catch (error) {
          console.error(`Failed to download image from ${url}:`, error);
          return `![Error loading image](${url})`;
        }
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
