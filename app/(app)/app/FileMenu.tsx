"use client";

import { customSession } from "@/@types/customSession";
import { fileType } from "@/@types/fileType";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { uuidv7 as createUUID } from "uuidv7";
import EditMenu from "./EditMenu";
import { PiCardsThin } from "react-icons/pi";
import { IoPrintOutline } from "react-icons/io5";
import {
  getFileContent,
  getFileInfo,
  updateFileInfo,
  uploadFile,
} from "@/googledrive";
import { FaPlus } from "react-icons/fa";
import { useHotkeys } from "react-hotkeys-hook";
import { IoSaveOutline } from "react-icons/io5";
import { sendGAEvent } from "@next/third-parties/google";
import { useDocumentTitle } from "@uidotdev/usehooks";

export function FileMenu({ fileID }: { fileID: string }) {
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
    <div className="">
      <nav className="sticky">
        <div className="flex justify-between items-center bg-gray-100 p-4">
          <div className="flex gap-4">
            <div className="flex gap-4">
              <button
                className="flex items-center gap-2 p-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => {
                  setFileContent({
                    ...fileContent,
                    content: [
                      ...(fileContent?.content as fileType["content"]),
                      { id: createUUID(), en: "", ja: "" },
                    ].filter((e) => e),
                  } as fileType);
                }}
              >
                <FaPlus />
                <span>追加</span>
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              className="flex items-center gap-2 p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:text-gray-800 font-semibold"
              disabled={saving}
              onClick={() => {
                sendGAEvent({
                  event: "clickSaveButton",
                  category: "file",
                });
                saveFileContent();
                saveFileInfo();
              }}
            >
              <IoSaveOutline />
              保存{saving && "中"}
            </button>
            <a
              className={`flex items-center gap-2 p-2 rounded bg-gray-200 hover:bg-gray-300 text-black hover:text-black visited:text-black text-button ${
                fileContent?.content?.length === 0 &&
                "pointer-events-none text-gray-600"
              }`}
              href={"/print?fileId=" + fileID}
              target="_blank"
              title={
                fileContent?.content?.length === 0
                  ? "コンテンツがない状態ではフラッシュカードを利用できません。"
                  : undefined
              }
            >
              <IoPrintOutline />
              印刷する
            </a>
            <a
              className={`flex items-center gap-2 p-2 rounded bg-gray-200 hover:bg-gray-300 text-black hover:text-black visited:text-black text-button ${
                fileContent?.content?.length === 0 &&
                "pointer-events-none text-gray-600"
              }`}
              href={"/flashCard?fileId=" + fileID}
              target="_blank"
              title={
                fileContent?.content?.length === 0
                  ? "コンテンツがない状態ではフラッシュカードを利用できません。"
                  : undefined
              }
            >
              <PiCardsThin />
              フラッシュカード
            </a>
          </div>
        </div>
      </nav>
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
    </div>
  );
}
