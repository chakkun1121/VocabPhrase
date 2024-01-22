"use client";

import { customSession } from "@/@types/customSession";
import { fileType } from "@/@types/fileType";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import EditMenu from "./EditMenu";
import {
  getFileContent,
  getFileInfo,
  updateFileInfo,
  uploadFile,
} from "@/googledrive";
import { useHotkeys } from "react-hotkeys-hook";
import { useDocumentTitle } from "@uidotdev/usehooks";
import EditHeader from "./editHeader";

export default function FileMenu({ fileID }: { fileID: string }) {
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
  const { data: session }: { data: customSession | null } =
    useSession() as unknown as { data: customSession };
  const token = session?.accessToken;
  useEffect(() => {
    (async () => {
      if (!token) return;
      try {
        const title = (await getFileInfo(token, fileID)).name;
        if (!title) throw new Error("file is not found");
        const fileContent =
          JSON.parse(await getFileContent(token, fileID)) ||
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
  }, [token, fileID]);
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
    await updateFileInfo(token, fileID, {
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
    await uploadFile(token, fileID, JSON.stringify(fileContent));
    if (shouldSaveFileContent) saveFileContent();
    setSaving(false);
    setFileContentSaving(false);
    setShouldSaveFileContent(false);
  }
  useEffect(() => {
    if (serverFileContent === fileContent) return;
    saveFileContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileID, fileContent, token]);
  useEffect(() => {
    if (serverTitle === title) return;
    saveFileInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileID, title, token]);
  useHotkeys(
    "ctrl+s",
    () => {
      saveFileContent();
      saveFileInfo();
    },
    {
      enableOnFormTags: ["INPUT", "TEXTAREA", "SELECT"],
      preventDefault: true,
    }
  );
  useDocumentTitle(
    title
      ? `${title
          .split(".")
          .slice(0, -1)
          .join(".")} | 編集ページ | vocabphrase | chakkun1121`
      : "アプリ | vocabphrase | chakkun1121 "
  );
  if (loading) return <div className="text-center p-4">loading...</div>;
  if (!loading && !fileContent)
    return (
      <div className="text-center p-4">ファイルが見つかりませんでした。</div>
    );
  return (
    <>
      <EditHeader
        fileID={fileID}
        fileContent={fileContent as fileType}
        setFileContent={
          setFileContent as React.Dispatch<React.SetStateAction<fileType>>
        }
        saving={saving}
        saveFileContent={saveFileContent}
        saveFileInfo={saveFileInfo}
      />
      <EditMenu
        key={fileID}
        title={title.split(".").slice(0, -1).join(".")}
        setTitle={(newTitle) => {
          setTitle(newTitle + ".vocabphrase");
        }}
        fileContent={fileContent as fileType}
        setFileContent={
          setFileContent as React.Dispatch<React.SetStateAction<fileType>>
        }
      />
    </>
  );
}
