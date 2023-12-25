import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "/",
      priority: 1,
      lastModified: new Date(),
    },
  ];
}
