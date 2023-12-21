"use client";

import { customSession } from "@/@types/customSession";
import { fileType } from "@/@types/fileType";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import EditMenu from "./EditMenu";

export function FileMenu({ fileID }: { fileID: string }) {
  const [title, setTitle] = useState(""); //拡張子付き
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
        setTitle(fileInfo.name);
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
  useEffect(() => {
    (async () => {
      if (!token) return;
      const newFileInfo = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ name: title }),
        }
      ).then((res) => res.json());
      console.log("newFileInfo", newFileInfo);
    })();
  }, [fileID, title, token]);
  return (
    <EditMenu
      title={title.split(".").slice(0, -1).join(".")}
      setTitle={(newTitle) => {
        setTitle(newTitle + ".vocabphrase");
      }}
      fileContent={fileContent}
      setFileContent={setFileContent}
    />
  );
}
