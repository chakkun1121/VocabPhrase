import { MetadataRoute } from "next";
import { getFileMetadata } from "./(home)/help/getFileMetadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const helpPages = (await getFileMetadata())
    .map((page) => page.fileName)
    .flat();
  return [
    {
      url: "https://vocab-phrase.vercel.app/",
      priority: 1,
      lastModified: new Date(),
    },
    helpPages.map((page) => ({
      url: `https://vocab-phrase.vercel.app/help/${page}`,
      priority: 0.5,
      lastModified: new Date(),
    })),
  ].flat();
}
