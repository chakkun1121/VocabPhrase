import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://vocab-phrase.vercel.app/",
      priority: 1,
      lastModified: new Date(),
    },
  ];
}
