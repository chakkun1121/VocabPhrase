"use client";
import { fileType } from "@/@types/fileType";

export default function EditMenu({
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
    <div className="flex flex-col h-full p-4 gap-4">
      <div className="flex-none">
        <input
          type="text"
          defaultValue={title}
          className="w-full p-4 rounded bg-gray-100 border border-gray-800"
          placeholder="ファイル名を入力してください"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-x-scroll flex flex-col gap-4 bg-gray-100 rounded"></div>
    </div>
  );
}
