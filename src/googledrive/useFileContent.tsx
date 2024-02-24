"use client";
import { fileType } from "@/types/fileType";
import { useEffect, useState } from "react";
import { getFileContent, uploadFile } from "@/googledrive";

export function useFileContent(token: string, fileId: string) {
  const [serverFileContent, setServerFileContent] = useState<
    fileType | undefined
  >(undefined);
  const [fileContent, setFileContent] = useState<fileType | undefined>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // 保存中はtrue
  useEffect(() => {
    (async () => {
      const fileContent = JSON.parse(
        (await getFileContent(token, fileId)) ||
          JSON.stringify({ mode: null, content: [] })
      );
      setFileContent(fileContent);
      setServerFileContent(fileContent);
      setLoading(false);
    })();
  }, [fileId, token]);
  /**
   * ファイル本体を更新します
   * @returns
   */
  async function saveFileContent(force = false) {
    if (!token) return;
    if (fileContent?.content?.length === 0) return;
    if (!force && saving) return;
    setSaving(true);
    const saveContent = fileContent;
    await uploadFile(token, fileId, JSON.stringify(saveContent));
    if (fileContent !== saveContent) saveFileContent(true);
    setSaving(false);
  }
  useEffect(() => {
    if (serverFileContent === fileContent) return;
    saveFileContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileId, fileContent, serverFileContent, token]);
  return { fileContent, setFileContent, saveFileContent, loading, saving };
}
