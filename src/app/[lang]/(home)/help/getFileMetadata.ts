import { promises as fsPromises } from "fs";
import path from "path";
export async function getFileMetadata(): Promise<
  { fileName: string; title: string; description: string }[]
> {
  const files = (
    await fsPromises.readdir(
      path.join(
        process.cwd(),
        "src",
        "app",
        "[lang]",
        "(home)",
        "(mdx_documents)",
        "help"
      )
    )
  ).filter((file) => !file.includes("."));
  files.sort(); //文字列のみなので比較関数は不要
  return await Promise.all(
    files.map(async (file) => {
      const { metadata } = await import(
        `@/app/[lang]/(home)/(mdx_documents)/help/${file}/page.mdx`
      );
      return { fileName: file, ...metadata };
    })
  );
}
