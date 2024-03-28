"use client";
import { fileType } from "@/types/fileType";
import { uuidv7 as createUUID } from "uuidv7";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import ImportForm from "./ImportForm";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function EditMenu({
  title,
  setTitle,
  fileContent,
  setFileContent,
  readOnly,
}: {
  title: string;
  setTitle: (title: string) => void;
  fileContent: fileType;
  setFileContent: React.Dispatch<React.SetStateAction<fileType>>;
  readOnly: boolean;
}) {
  const [isShowImportBox, setIsShowImportBox] = useState(false);
  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="flex-none flex gap-4 p-2">
        <Input
          type="text"
          value={title}
          className="flex-1 p-4 rounded"
          placeholder="ファイル名を入力してください"
          onChange={e => setTitle(e.target.value)}
          disabled={readOnly}
        />
        <Select
          value={fileContent.mode ?? "none"}
          onValueChange={value => {
            setFileContent({
              ...fileContent,
              mode: value === "none" ? null : (value as fileType["mode"]),
            });
          }}
          disabled={readOnly}
        >
          <SelectTrigger className="flex-none p-4 rounded w-36">
            <SelectValue placeholder="モードを選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">モードを選択</SelectItem>
            <SelectItem value="words">単語</SelectItem>
            <SelectItem value="phrases">フレーズ</SelectItem>
            <SelectItem value="sentences">文章</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 flex flex-col gap-2 p-2">
        {fileContent.content.map((field, index) => (
          <div key={field.id} className="flex gap-4 p-4 rounded items-center">
            <div className="flex-none flex items-center">
              <p>{index + 1}</p>
            </div>
            <div
              className={
                "flex gap-4 flex-1 " +
                (fileContent.mode == "words" || fileContent.mode == "phrases"
                  ? "flex-wrap"
                  : "flex-col")
              }
            >
              <TextInput
                mode={fileContent.mode}
                field={field}
                index={index}
                fileContent={fileContent}
                setFileContent={setFileContent}
                readOnly={readOnly}
                lang="en"
              />
              <TextInput
                mode={fileContent.mode}
                field={field}
                index={index}
                fileContent={fileContent}
                setFileContent={setFileContent}
                readOnly={readOnly}
                lang="ja"
              />
            </div>
            {!readOnly && (
              <div className="flex-none flex flex-col gap-4">
                <Button
                  className="aspect-square p-0"
                  variant="outline"
                  onClick={() =>
                    setFileContent({
                      ...fileContent,
                      content: fileContent.content.filter(
                        (_, i) => i !== index
                      ),
                    })
                  }
                  title="削除"
                  disabled={readOnly}
                >
                  <MdDeleteOutline className="w-4 h-4" />
                </Button>
                {/* <Button>
                  <LuGripVertical />
                </Button> */}
              </div>
            )}
          </div>
        ))}
      </div>
      {!readOnly && (
        <div className="flex gap-4">
          {fileContent.content.length === 0 && !readOnly && (
            <ImportForm setFileContent={setFileContent} setTitle={setTitle} />
          )}
          <Button
            className="flex flex-1 gap-4 p-4 items-center justify-center"
            variant={fileContent.content.length === 0 ? "default" : "secondary"}
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
          </Button>
        </div>
      )}
    </div>
  );
}

function TextInput({
  mode,
  field,
  index,
  fileContent,
  setFileContent,
  readOnly,
  lang,
}: {
  mode: fileType["mode"];
  field: fileType["content"][0];
  index: number;
  fileContent: fileType;
  setFileContent: React.Dispatch<React.SetStateAction<fileType>>;
  readOnly: boolean;
  lang: "en" | "ja";
}) {
  return readOnly ? (
    <p
      lang={lang}
      className="select-text p-1 rounded text-gray-800 bg-gray-100"
    >
      {field[lang]}
    </p>
  ) : (
    <Input
      className={
        "rounded p-2 flex-1 min-w-12 " + (mode == "phrases" ? "min-w-64" : "")
      }
      placeholder={lang == "en" ? "英文を入力" : "日本語訳を入力"}
      defaultValue={field[lang]}
      onChange={e =>
        setFileContent({
          ...fileContent,
          content: fileContent.content.map((field, i) =>
            i === index ? { ...field, [lang]: e.target.value } : field
          ),
        })
      }
      disabled={readOnly}
    />
  );
}
