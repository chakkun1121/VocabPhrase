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

export function FileMenu({ fileID }: { fileID: string }) {
  const [contentController, setContentController] = useState(
    new AbortController()
  );
  const [titleController, setTitleController] = useState(new AbortController());
  const [title, setTitle] = useState(""); //拡張子付き
  const [fileContent, setFileContent] = useState<fileType>({ content: [] });
  const [loading, setLoading] = useState(true);
  const { data: session }: { data: customSession | null } =
    useSession() as unknown as { data: customSession };
  const token = session?.accessToken;
  useEffect(() => {
    (async () => {
      if (!token) return;
      try {
        setTitle((await getFileInfo(token, fileID)).name);
        setFileContent(JSON.parse(await getFileContent(token, fileID)));
        setLoading(false);
      } catch (e) {
        // 空ファイルでは "SyntaxError: Unexpected end of JSON input" を吐くが問題なし
        console.error(e);
        setFileContent({ content: [] });
        setLoading(false);
      }
    })();
  }, [token, fileID]);
  useEffect(() => {
    (async () => {
      if (!token) return;
      if (title === "") return;
      titleController.abort(
        "ファイル名を正しく保存するためにキャンセルしました"
      );
      const newController = new AbortController();
      setTitleController(newController);
      const newFileInfo = await updateFileInfo(
        token,
        fileID,
        {
          name: title,
        },
        newController.signal
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileID, title, token]);
  useEffect(() => {
    (async () => {
      if (!token) return;
      if (fileContent?.content?.length === 0) return;
      contentController.abort(
        "ファイル内容を正しく保存するためにキャンセルしました"
      );
      const newController = new AbortController();
      setContentController(newController);
      const newFileContent = await uploadFile(
        token,
        fileID,
        JSON.stringify(fileContent),
        newController.signal
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileID, fileContent, token]);
  if (loading) return <div className="text-center p-4">loading...</div>;
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
