"use client";

import { customSession } from "@/@types/customSession";
import { fileType } from "@/@types/fileType";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { uuidv7 as createUUID } from "uuidv7";
import EditMenu from "./EditMenu";
import { PiCardsThin } from "react-icons/pi";

import {
  getFileContent,
  getFileInfo,
  updateFileInfo,
  uploadFile,
} from "@/googledrive";
import { FaPlus } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";

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
    <div className="">
      <nav className="sticky">
        <div className="flex justify-between items-center bg-gray-100 p-4">
          <div className="flex gap-4">
            <div className="flex gap-4">
              <button
                className="flex items-center gap-2 p-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => {
                  setFileContent({
                    content: [
                      ...fileContent.content,
                      { id: createUUID(), en: "", ja: "" },
                    ],
                  });
                }}
              >
                <FaPlus />
                <span>追加</span>
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <a
              className="flex items-center gap-2 p-2 rounded bg-gray-200 hover:bg-gray-300 text-black hover:text-black visited:text-black"
              href={"/flashCard?fileId=" + fileID}
              target="_blank"
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
        fileContent={fileContent}
        setFileContent={setFileContent}
      />
    </div>
  );
}
