import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";
import nextPWA from "next-pwa";
import withPlugins from "next-compose-plugins";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  redirects: async () => {
    return [
      {
        source: "/app",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
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
export default withPlugins([withMDX, withPWA], nextConfig);
