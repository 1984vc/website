import { dmnoNextConfigPlugin } from "@dmno/nextjs-integration";
import type { NextConfig } from "next";
import nextra from "nextra";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath: '/docs',
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
};

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
})
 
// Merge MDX config with Next.js config
export default dmnoNextConfigPlugin()(withNextra(nextConfig))
