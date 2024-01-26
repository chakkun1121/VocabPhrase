import { promises as fsPromises } from "fs";
import { Metadata } from "next";
import Link from "next/link";
import path from "path";
import { getFileMetadata } from "./getFileMetadata";
export default async function HelpTop() {
  const metadatas = await getFileMetadata();
  return (
    <section>
      <h2> ヘルプ記事一覧 </h2>
      <ul>
        {metadatas.map((metadata) => (
          <li key={metadata.fileName}>
            <Link href={`/help/${metadata.fileName}`}>{metadata.title}</Link>
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
