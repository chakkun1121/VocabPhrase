"use client";

import { customSession } from "@/@types/customSession";
import { fileType } from "@/@types/fileType";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function FileMenu({ fileID }: { fileID: string }) {
  const [title, setTitle] = useState<string>("");
  const [fileContent, setFileContent] = useState<fileType>({ content: [] });
  const { data: session }: { data: customSession | null } =
    useSession() as unknown as { data: customSession };
  const token = session?.accessToken;
  useEffect(() => {
    (async () => {
      if (!token) return;
      const fetchOptions = {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      };
      try {
        const fileInfo = await fetch(
          "https://www.googleapis.com/drive/v3/files/" + fileID,
          fetchOptions
        )
          .then((res) => res.json())
          .catch((e) => {
            throw e;
          });
        setTitle(fileInfo.name.split(".").slice(0, -1).join("."));
        const fileContent = await fetch(
          `https://www.googleapis.com/drive/v3/files/${fileID}?alt=media`,
          fetchOptions
        )
          .then((res) => {
            console.log(res);
            return res;
          })
          .then((res) => res.text())
          .then((res) => JSON.parse(res))
          .catch((e) => {
            throw e;
          });
        setFileContent(fileContent);
      } catch (e) {
        // 空ファイルでは "SyntaxError: Unexpected end of JSON input" を吐くが問題なし
        console.error(e);
      }
    })();
  }, [token, fileID]);

  return (
    <EditMenu
      title={title}
      setTitle={setTitle}
      fileContent={fileContent}
      setFileContent={setFileContent}
    />
  );
}
function EditMenu({
  title,
  setTitle,
  fileContent,
  setFileContent,
}: {
  title: string;
  setTitle: (title: string) => void;
  fileContent: fileType;
  setFileContent: (fileContent: fileType) => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-none">
        <input
          type="text"
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </div>
  );
}
