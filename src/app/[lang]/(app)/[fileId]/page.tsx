"use client";

import { useToken } from "@/common/hooks/useToken";
import { useFile } from "@/googledrive/useFile";
import { notFound, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FileTop({
  params: { fileId, lang },
}: {
  params: { fileId: string; lang: string };
}) {
  const token = useToken();
  const {
    title,
    setTitle,
    fileContent,
    setFileContent,
    loading,
    saving,
    saveFileContent,
    saveFileInfo,
    readOnly,
    error,
  } = useFile(token, fileId);
  const router = useRouter();
  useEffect(() => {
    if (loading) return;
    if (!loading && error) {
      notFound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, fileContent]);
  return (
    <main className="p-2 mx-auto max-w-7xl select-text">
      <h2 className="text-2xl my-2">{title.replace(/\.vocabphrase$/, "")}</h2>
      {fileContent?.content?.map(content => (
        <div key={content.id}>
          <p lang="en">{content.en}</p>
          <p lang="ja">{content.ja}</p>
        </div>
      ))}
    </main>
  );
}
