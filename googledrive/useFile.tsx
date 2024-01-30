"use client";
import { fileType } from "@/@types/fileType";
import { useEffect, useState } from "react";
import {
  getFileContent,
  getFileInfo,
  updateFileInfo,
  uploadFile,
} from "@/googledrive";

export function useFile(token: string, fileId: string) {
  const [title, setTitle] = useState(""); //拡張子付き
  const [fileContent, setFileContent] = useState<fileType | undefined>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // 保存中はtrue
  const [titleSaving, setTitleSaving] = useState(false); // タイトル保存中はtrue
  const [fileContentSaving, setFileContentSaving] = useState(false); // ファイルコンテンツ保存中はtrue
  const [serverFileContent, setServerFileContent] = useState<
    fileType | undefined
  >(undefined);
  const [serverTitle, setServerTitle] = useState(undefined); //拡張子付き
  const [shouldSaveTitle, setShouldSaveTitle] = useState(false); // タイトルを保存する必要があるときはtrue
  const [shouldSaveFileContent, setShouldSaveFileContent] = useState(false); // ファイルコンテンツを保存する必要があるときはtrue
  useEffect(() => {
    (async () => {
      if (!token) return;
      try {
        const title = (await getFileInfo(token, fileId)).name;
        if (!title) throw new Error("file is not found");
        const fileContent =
          JSON.parse(await getFileContent(token, fileId)) ||
          ({ mode: null, content: [] } as fileType);
        console.log("fileFound");
        setTitle(title);
        setServerTitle(title);
        setFileContent(fileContent);
        setServerFileContent(fileContent);
      } catch (e: any) {
        // 空ファイルでは "SyntaxError: Unexpected end of JSON input" を吐くが問題なし
        if (e.message == "Unexpected end of JSON input") {
          setFileContent({ mode: null, content: [] } as fileType);
          return;
        }
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [token, fileId]);
  /**
   * タイトルを更新します
   * @returns
   */
  async function saveFileInfo() {
    if (!token) return;
    if (title === "") return;
    if (titleSaving) {
      setShouldSaveTitle(true);
      return;
    }
    setSaving(true);
    setTitleSaving(true);
    await updateFileInfo(token, fileId, {
      name: title,
    });
    if (shouldSaveTitle) saveFileContent();
    setSaving(false);
    setTitleSaving(false);
    setShouldSaveTitle(false);
  }
  /**
   * ファイル本体を更新します
   * @returns
   */
  async function saveFileContent() {
    if (!token) return;
    if (fileContent?.content?.length === 0) return;
    if (fileContentSaving) {
      setShouldSaveFileContent(true);
      return;
    }
    setSaving(true);
    setFileContentSaving(true);
    await uploadFile(token, fileId, JSON.stringify(fileContent));
    if (shouldSaveFileContent) saveFileContent();
    setSaving(false);
    setFileContentSaving(false);
    setShouldSaveFileContent(false);
  }
  useEffect(() => {
    if (serverFileContent === fileContent) return;
    saveFileContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileId, fileContent, token]);
  useEffect(() => {
    if (serverTitle === title) return;
    saveFileInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileId, title, token]);
  return {
    title,
    setTitle,
    fileContent,
    setFileContent,
    loading,
    saving,
    saveFileContent,
    saveFileInfo,
  };
}
