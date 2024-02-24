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
  } = useFileContent(token, fileId);
  const {
    title,
    setTitle,
    saveFileInfo,
    loading: fileInfoLoading,
    saving: fileInfoSaving,
  } = useFileInfo(token, fileId);
  const { readOnly } = useFilePermission(token, fileId);

  return {
    title,
    setTitle,
    fileContent,
    setFileContent,
    loading: fileInfoLoading || fileContentLoading,
    saving: fileInfoSaving || fileContentSaving,
    saveFileContent,
    saveFileInfo,
    readOnly,
  };
}
