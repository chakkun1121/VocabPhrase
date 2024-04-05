"use client";

import { fileType } from "@/types/fileType";
import React from "react";
import EditMenu from "./editMenu";
import { useHotkeys } from "react-hotkeys-hook";
import EditHeader from "./editHeader";
import { removeExtension } from "@/common/library/removeExtension";
import { useToken } from "@/common/hooks/useToken";
export default function FileMenu({
  fileId,
  title,
  setTitle,
  fileContent,
  setFileContent,
  loading,
  saving,
  saveFileContent,
  saveFileInfo,
  readOnly,
}: {
  fileId: string;
  title: string;
  fileContent: fileType | undefined;
  setFileContent: React.Dispatch<React.SetStateAction<fileType>>;
  loading: boolean;
  saving: boolean;
  saveFileContent: () => void;
  saveFileInfo: () => void;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  readOnly: boolean;
}) {
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
  const token = useToken();

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
        token={token}
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
