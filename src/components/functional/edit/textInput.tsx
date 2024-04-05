"use client";
import { fileType } from "@/types/fileType";
import { Input } from "@/components/ui/input";

export default function TextInput({
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
