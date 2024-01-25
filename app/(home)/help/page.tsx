import { promises as fsPromises } from "fs";
import { Metadata } from "next";
import Link from "next/link";
import path from "path";
export default async function HelpTop() {
  const files = (
    await fsPromises.readdir(
      path.join(process.cwd(), "app", "(home)", "(mdx_documents)", "help")
    )
  ).filter((file) => !file.includes("."));
  files.sort(); //文字列のみなので比較関数は不要
  const metadatas: {
    title: string;
    description: string;
  }[] = await Promise.all(
    files.map(async (file) => {
      const { metadata } = await import(
        `@/app/(home)/(mdx_documents)/help/${file}/page.mdx`
      );
      return metadata;
    })
  );
  return (
    <section>
      <h2> ヘルプ記事一覧 </h2>
      <ul>
        {files.map((file: string, i: number) => (
          <li key={file}>
            <Link href={`/help/${file.replace(/\.mdx$/, "")}`}>
              {metadatas[i]?.title || ""}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
export const metadata: Metadata = {
  title: "ヘルプページトップ",
  description:
    "英文、英単語専用の単語帳アプリVocabPhraseのヘルプページトップです。",
  alternates: {
    canonical: "/help",
  },
  robots: {
    index: false,
    follow: true,
  },
};
