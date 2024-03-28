"use client";

import { fileType } from "@/types/fileType";
import React from "react";
import EditMenu from "./EditMenu";
import { useHotkeys } from "react-hotkeys-hook";
import { useDocumentTitle } from "@uidotdev/usehooks";
import EditHeader from "./editHeader";
import { useFile } from "@/googledrive/useFile";
import { removeExtension } from "@/common/library/removeExtension";
import { useToken } from "@/common/hooks/useToken";
export default function FileMenu({ fileId }: { fileId: string }) {
  const token = useToken();
  const {
    title,
    setTitle,
    fileContent,
    setFileContent,
    loading,
    saving,
    saveFileContent,
    saveFileInfo,
    readOnly,
  } = useFile(token, fileId);

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
        fileId={fileId}
        fileContent={fileContent as fileType}
        setFileContent={
          setFileContent as React.Dispatch<React.SetStateAction<fileType>>
        }
        saving={saving}
        saveFileContent={saveFileContent}
        saveFileInfo={saveFileInfo}
        readOnly={readOnly}
      />
      <EditMenu
        key={fileId}
        title={removeExtension(title)}
        setTitle={newTitle => {
          setTitle(newTitle + ".vocabphrase");
        }}
        fileContent={fileContent as fileType}
        setFileContent={
          setFileContent as React.Dispatch<React.SetStateAction<fileType>>
        }
        readOnly={readOnly}
      />
    </>
  );
}
