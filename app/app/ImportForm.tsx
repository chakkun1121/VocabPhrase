"use client";
import { fileType } from "@/@types/fileType";
import { uuidv7 as createUUID } from "uuidv7";
import { useState } from "react";

export default function ImportForm({
  close,
  setFileContent,
}: {
  close: () => void;
  setFileContent: (fileContent: fileType) => void;
}) {
  const [formContent, setFormContent] = useState("");
  function importFromBox() {
    const content = formContent.split("\n").map((line) => {
      if (line === "") return;
      const [en, ja] = line.split("\t");
      return { id: createUUID(), en, ja };
    }) as fileType["content"];
    setFileContent({ content });
    setFormContent("");
    close();
  }
  return (
    <div className="w-full p-4 rounded bg-gray-200">
      <p>Excel,Googleスプレッドシートなどからコピペできます</p>
      <textarea
        className="rounded bg-gray-200  h-48 border border-gray-800 w-full p-4 resize-none"
        style={{ tabSize: 4 }}
        placeholder={`英文or単語,日本語訳の順に入力\n例) \n単語1\t日本語訳1\n単語2\t日本語訳2`}
        onChange={(e) => setFormContent(e.target.value)}
      />
      <div className="flex gap-4">
        <button
          className="flex-none rounded-full bg-gray-300 hover:bg-gray-400 p-4"
          onClick={close}
        >
          キャンセル
        </button>
        <button
          className="flex-1 rounded-full bg-gray-300 hover:bg-gray-400 p-4"
          onClick={importFromBox}
        >
          インポート
        </button>
      </div>
    </div>
  );
}
