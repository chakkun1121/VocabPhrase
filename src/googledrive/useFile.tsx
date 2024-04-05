"use client";
import { useFileInfo } from "./useFileInfo";
import { useFileContent } from "./useFileContent";
import { useFilePermission } from "./useFilePermission";

export function useFile(token: string, fileId: string) {
  const {
    fileContent,
    setFileContent,
    saveFileContent,
    loading: fileContentLoading,
    saving: fileContentSaving,
    saved: fileContentSaved,
  } = useFileContent(token, fileId);
  const {
    title,
    setTitle,
    saveFileInfo,
    loading: fileInfoLoading,
    saving: fileInfoSaving,
    saved: titleSaved,
  } = useFileInfo(token, fileId);
  const { readOnly } = useFilePermission(token, fileId);

  return {
    title,
    setTitle,
    fileContent,
    setFileContent,
    loading: fileInfoLoading || fileContentLoading,
    saving: fileInfoSaving || fileContentSaving,
    saved: fileContentSaved && titleSaved,
    saveFileContent,
    saveFileInfo,
    readOnly,
  };
}
