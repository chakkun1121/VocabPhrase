"use client";

import { customSession } from "@/@types/customSession";
import { fileType } from "@/@types/fileType";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import EditMenu from "./EditMenu";
import { getFileContent, getFileInfo, updateFileInfo, uploadFile } from "@/googledrive";

export function FileMenu({ fileID }: { fileID: string }) {
  const [title, setTitle] = useState(""); //拡張子付き
  const [fileContent, setFileContent] = useState<fileType>({ content: [] });
  const { data: session }: { data: customSession | null } =
    useSession() as unknown as { data: customSession };
  const token = session?.accessToken;
  useEffect(() => {
    (async () => {
      if (!token) return;
      try {
        setTitle((await getFileInfo(token, fileID)).name);
        setFileContent(JSON.parse(await getFileContent(token, fileID)));
      } catch (e) {
        // 空ファイルでは "SyntaxError: Unexpected end of JSON input" を吐くが問題なし
        console.error(e);
      }
    })();
  }, [token, fileID]);
  useEffect(() => {
    (async () => {
      if (!token) return;
      const newFileInfo = await updateFileInfo(token, fileID, {
        name: title,
      });
    })();
  }, [fileID, title, token]);
  useEffect(() => {
    (async () => {
      if (!token) return;
      const newFileContent = await uploadFile(
        token,
        fileID,
        JSON.stringify(fileContent)
      );
    })();
  }, [fileID, fileContent, token]);
  return (
    <EditMenu
      key={fileID}
      title={title.split(".").slice(0, -1).join(".")}
      setTitle={(newTitle) => {
        setTitle(newTitle + ".vocabphrase");
      }}
      fileContent={fileContent}
      setFileContent={setFileContent}
    />
  );
}

