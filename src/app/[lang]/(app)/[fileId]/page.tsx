"use client";

import { useToken } from "@/common/hooks/useToken";
import Loading from "@/components/ui-elements/loading";
import { Button } from "@/components/ui/button";
import { useFile } from "@/googledrive/useFile";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
  useEffect(() => {
    if (loading) return;
    if (!loading && error) {
      notFound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, fileContent]);
  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);
  if (loading) return <Loading />;
  return (
    <main className="p-2 mx-auto max-w-7xl select-text">
      <h2 className="text-2xl my-2">{title.replace(/\.vocabphrase$/, "")}</h2>
      <nav>
        <Link href={`./${fileId}/flashCard`} target="_blank">
          フラッシュカード
        </Link>
      </nav>
      {fileContent?.content?.map(content => (
        <div key={content.id}>
          <p lang="en">{content.en}</p>
          <p lang="ja">{content.ja}</p>
        </div>
      ))}
    </main>
  );
}
