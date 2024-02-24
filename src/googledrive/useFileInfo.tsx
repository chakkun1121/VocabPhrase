"use client";
import { useEffect, useState } from "react";
import { getFileInfo, updateFileInfo } from "@/googledrive";

export function useFileInfo(token: string, fileId: string) {
  const [title, setTitle] = useState(""); //拡張子付き
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // 保存中はtrue
  const [serverTitle, setServerTitle] = useState(undefined); //拡張子付き
  useEffect(() => {
    (async () => {
      if (!token) return;
      const fileInfo = await getFileInfo(token, fileId);
      const title = fileInfo.name;
      if (!title) throw new Error("file is not found");
      setTitle(title);
      setServerTitle(title);
      setLoading(false);
    })();
  }, [token, fileId]);
  /**
   * タイトルを更新します
   * @returns
   */
  async function saveFileInfo(force = false) {
    if (!token) return;
    if (title === "") return;
    if (!force && saving) return;
    setSaving(true);
    const saveData = { name: title };
    await updateFileInfo(token, fileId, saveData);
    if (title !== saveData.name) saveFileInfo(true);
    setSaving(false);
  }
  useEffect(() => {
    if (serverTitle === title) return;
    saveFileInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileId, serverTitle, title, token]);
  return { title, setTitle, saveFileInfo, loading, saving };
}
