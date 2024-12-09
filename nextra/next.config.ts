import type { NextConfig } from "next";
import nextra from "nextra";


const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  // async rewrites() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/index.html',
  //     },
  //   ]
  // }
};

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
})
 
// Merge MDX config with Next.js config
export default withNextra(nextConfig)