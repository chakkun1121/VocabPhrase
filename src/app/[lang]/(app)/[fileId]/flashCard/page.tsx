"use client";
import { useToken } from "@/common/hooks/useToken";
import { removeExtension } from "@/common/library/removeExtension";
import Card from "@/components/functional/flashCard";
import { useFile } from "@/googledrive/useFile";
import { useDocumentTitle } from "@uidotdev/usehooks";

export default function FlashCard({
  params: { fileId },
}: {
  params: { fileId: string };
}) {
  const token = useToken();
  const { title, fileContent, loading, error } = useFile(token, fileId);
  useDocumentTitle(
    `${removeExtension(title)} | フラッシュカード | VocabPhrase | chakkun1121`
  );
  return (
    <Card
      fileId={fileId}
      key={fileId}
      fileContent={fileContent}
      fileLoading={loading}
      fileError={error}
    />
  );
}
