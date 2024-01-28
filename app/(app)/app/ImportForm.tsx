"use client";
import { fileType } from "@/@types/fileType";
import { uuidv7 as createUUID } from "uuidv7";
import React, { MouseEventHandler, useState } from "react";
import { wayakuFile2file } from "./_library/wayaku";
import { uploadFile } from "./_library/uploadFile";
import { csvToFileContent } from "./_library/csvToFileContent";
import { flashCardMode } from "@/@types/flashCardSettings";

export default function ImportForm({
  close,
  setFileContent,
  setTitle,
}: {
  close: () => void;
  setFileContent: React.Dispatch<React.SetStateAction<fileType>>;
  setTitle: (title: string) => void;
}) {
  const [formContent, setFormContent] = useState("");
  function importFromBox() {
    const content = formContent.split("\n").map((line) => {
      if (line === "") return;
      const [en, ja] = line.split("\t");
      return { id: createUUID(), en, ja };
    }) as fileType["content"];
    setFileContent((fileContent) => ({ ...fileContent, content }));
    setFormContent("");
    close();
  }
  async function uploadWayakuFile() {
    const [title, content] = await wayakuFile2file();
    setFileContent(content);
    setTitle(title);
    close();
  }
  async function importFromCsv(mode?: flashCardMode) {
    /**
     * ファイル形式(ヘッダー行は基本的になしだが、含まれている場合はユーザーによって除去してもらう)
     * 1. |表|裏|
     * 2. |index|表|裏|
     * 3. |表|(表ヒント(最後にカッコの中に入れる))|裏|(裏ヒント)|
     * 4. |index|表|(表ヒント)|裏|(裏ヒント)|
     */
    const { content, fileName } = await uploadFile([
      {
        description: "csvファイル(anikilot形式)",
        accept: { "text/csv": [".csv"] },
      },
    ]);
    if (!content) return;
    const csv = content.split("\n").map((line) => line.split(","));
    const fileContent = csvToFileContent(csv, mode);
    const title = fileName.split(".").slice(0, -1).join(".");
    setFileContent({ content: fileContent, mode: null });
    setTitle(title);
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
        <div className="flex-none  [&>ul]:hover:inline-block">
          <p className="block rounded-full bg-gray-300 hover:bg-gray-400 p-4">
            その他ファイルからのインポート
          </p>
          <ul className="absolute bg-gray-300 m-0 rounded-b hidden ">
            {[
              {
                name: "和訳ファイル(.wayaku)",
                onClick: uploadWayakuFile,
              },
              {
                name: "csvファイル(ankilot形式のもの)",
                onClick: () => importFromCsv(),
              },
            ].map(({ name, onClick }, i) => (
              <li className="list-none text-center relative " key={i}>
                <button
                  onClick={onClick}
                  className="rounded hover:bg-gray-400 p-4"
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="flex-1 rounded-full bg-gray-300 hover:bg-gray-400 p-4 disabled:bg-gray-400"
          onClick={importFromBox}
          disabled={!formContent}
        >
          インポート
        </button>
      </div>
    </div>
  );
}
