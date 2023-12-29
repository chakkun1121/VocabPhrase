"use client";
import { fileType } from "@/@types/fileType";
import { uuidv7 as createUUID } from "uuidv7";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  useEffect,
  useState,
} from "react";
import ImportForm from "./ImportForm";

export default function EditMenu({
  title,
  setTitle,
  fileContent,
  setFileContent,
}: {
  title: string;
  setTitle: (title: string) => void;
  fileContent: fileType;
  setFileContent: React.Dispatch<React.SetStateAction<fileType>>;
}) {
  const [isShowImportBox, setIsShowImportBox] = useState(false);
  return (
    <div className="flex flex-col h-full p-4 gap-4">
      <div className="flex-none">
        <input
          type="text"
          value={title}
          className="w-full p-4 rounded bg-gray-100 border border-gray-800"
          placeholder="ファイル名を入力してください"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-x-scroll flex flex-col gap-4 bg-gray-100 rounded p-2">
        {fileContent.content.map((field, index) => (
          <div
            key={field.id}
            className="flex gap-4 p-4 bg-gray-200 rounded items-center"
          >
            <div className="flex-none flex items-center">
              <p>{index + 1}</p>
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <input
                className="rounded p-2"
                placeholder="英文を入力"
                defaultValue={field.en}
                onChange={(e) =>
                  setFileContent({
                    ...fileContent,
                    content: fileContent.content.map((field, i) =>
                      i === index ? { ...field, en: e.target.value } : field
                    ),
                  })
                }
              />
              <input
                className="rounded p-2"
                placeholder="日本語訳を入力"
                defaultValue={field.ja}
                onChange={(e) =>
                  setFileContent({
                    ...fileContent,
                    content: fileContent.content.map((field, i) =>
                      i === index ? { ...field, ja: e.target.value } : field
                    ),
                  })
                }
              />
            </div>
            <div className="flex-none flex flex-col gap-4">
              <Button
                onClick={() =>
                  setFileContent({
                    ...fileContent,
                    content: fileContent.content.filter((_, i) => i !== index),
                  })
                }
                title="削除"
              >
                <MdDeleteOutline />
              </Button>
              {/* <Button>
                <LuGripVertical />
              </Button> */}
            </div>
          </div>
        ))}
        {fileContent.content.length === 0 && isShowImportBox && (
          <ImportForm
            close={() => setIsShowImportBox(false)}
            setFileContent={setFileContent}
            setTitle={setTitle}
          />
        )}
        {!isShowImportBox && (
          <div className="flex gap-4">
            {fileContent.content.length === 0 && (
              <button
                className="flex flex-none gap-4 p-4 bg-gray-200 hover:bg-gray-300 rounded-full items-center justify-center"
                onClick={() => setIsShowImportBox(true)}
              >
                インポート
              </button>
            )}
            <button
              className="flex flex-1 gap-4 p-4 bg-gray-200 hover:bg-gray-300 rounded-full items-center justify-center"
              onClick={() => {
                setFileContent({
                  ...fileContent,
                  content: [
                    ...fileContent.content,
                    { id: createUUID(), en: "", ja: "" },
                  ],
                });
              }}
              title="追加"
            >
              <FaPlus />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
function Button(
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  const { className, ...rest } = props;
  return (
    <button
      className={`bg-gray-300 hover:bg-gray-400 rounded-full p-2 ${className}`}
      {...rest}
    />
  );
}
