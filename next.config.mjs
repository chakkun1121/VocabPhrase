import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";
import nextPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withPWA = nextPWA({
  dest: "public",
});

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

// Merge MDX config with Next.js config
export default withMDX(withPWA(nextConfig));
