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
