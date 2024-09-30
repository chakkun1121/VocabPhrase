"use client";
import { useToken } from "@/common/hooks/useToken";
import { removeExtension } from "@/common/library/removeExtension";
import Learn from "@/components/functional/learn";
import { useFile } from "@/googledrive/useFile";
import { useDocumentTitle } from "@uidotdev/usehooks";

export default function Page({
  params: { fileId },
}: {
  params: { fileId: string };
}) {
  const token = useToken();
  const { title, fileContent, loading } = useFile(token, fileId);
  useDocumentTitle(
    `${removeExtension(title)} | 学習 | VocabPhrase | chakkun1121`
  );
  return (
    <Learn
      fileId={fileId}
      key={fileId}
      fileContent={fileContent}
      fileLoading={loading}
    />
  );
}
