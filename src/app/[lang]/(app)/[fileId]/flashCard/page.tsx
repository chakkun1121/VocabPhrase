"use client";
import { useResultFile } from "@/common/hooks/useFlashcardResultFile";
import { useToken } from "@/common/hooks/useToken";
import Loading from "@/components/ui-elements/loading";
import { useFile } from "@/googledrive/useFile";

export default function FlashCardPage({
  params: { lang, fileId },
}: {
  params: { lang: string; fileId: string };
}) {
  const token = useToken();
  const {
    title,
    fileContent,
    loading: fileLoading,
    error,
  } = useFile(token, fileId);
  const {
    results,
    setResults,
    savingResults,
    saveResults,
    loading: resultLoading,
  } = useResultFile(fileId, token);
  if (fileLoading || resultLoading) return <Loading />;
  if (error) throw error;
  return <div></div>;
}
