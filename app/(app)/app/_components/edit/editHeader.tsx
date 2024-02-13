import { fileType } from "@/@types/fileType";
import { sendGAEvent } from "@next/third-parties/google";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoSaveOutline, IoPrintOutline } from "react-icons/io5";
import { PiCardsThin } from "react-icons/pi";
import { uuidv7 as createUUID } from "uuidv7";

export default function EditHeader({
  fileID,
  fileContent,
  setFileContent,
  saving,
  saveFileContent,
  saveFileInfo,
}: {
  fileID: string;
  fileContent: fileType;
  setFileContent: React.Dispatch<React.SetStateAction<fileType>>;
  saving: boolean;
  saveFileContent: () => void;
  saveFileInfo: () => void;
}) {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <nav className="flex justify-between items-center bg-gray-100 p-4">
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
            <span className="hidden md:inline-block">追加</span>
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
          <span className="hidden md:inline-block">保存{saving && "中"}</span>
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
          <span className="hidden md:inline-block">印刷する</span>
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
          <span className="hidden md:inline-block">フラッシュカード</span>
        </a>
        <button
          className="flex items-center gap-2 p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:text-gray-800 font-semibold"
          onClick={() => setIsOpened(true)}
        >
          <HiOutlineDotsVertical />
        </button>
        {isOpened && (
          <>
            <div className="fixed bg-gray-200 z-20 [&>button]:block [&>button]:w-full right-0 top-32">
              <button className="hover:bg-gray-300 rounded p-2">
                フラッシュカードの履歴を削除
              </button>
              <button className="hover:bg-gray-300 rounded p-2">
                ファイルを削除
              </button>
            </div>
            <button
              onClick={() => setIsOpened(false)}
              className="w-screen h-screen absolute bg-opacity-0 inset-0 z-10 cursor-default"
            />
          </>
        )}
      </div>
    </nav>
  );
}
