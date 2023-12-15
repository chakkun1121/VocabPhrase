"use client";
import Link from "next/link";
import { IoMdOpen } from "react-icons/io";
import { FaGoogleDrive } from "react-icons/fa";
import { GoUpload } from "react-icons/go";

export default function RecentFile() {
  const recentFile: { title: string; fileID: string }[] = [
    {
      title: "test",
      fileID: "test",
    },
    {
      title: "test2-long-long-long-long-long-long-title",
      fileID: "test2",
    },
    {
      title: "test3",
      fileID: "test3",
    },
  ];
  return (
    <div className="flex flex-col h-full">
      <div className="flex-none">
        <p className="text-heading-S">最近使用したファイル</p>
      </div>
      <div className="flex-1">
        <ul className="p-4 flex flex-col gap-4 overflow-y-scroll h-full">
          {recentFile.map((file) => (
            <li key={file.fileID} className="list-none">
              <div className="flex items-center gap-2">
                <Link
                  href={`./app?fileID=${file.fileID}`}
                  className="text-black hover:text-black visited:text-black flex-1 truncate"
                >
                  {file.title}
                </Link>
                <Link
                  href={`./app?fileID=${file.fileID}`}
                  target="_blank"
                  aria-label="新しいタブで開く"
                  className="text-black hover:text-black visited:text-black flex-none"
                >
                  <IoMdOpen />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-none p-4 flex flex-col gap-4">
        <button
          className="w-full rounded-full bg-Pizazz-400 hover:bg-Pizazz-300 py-4 text-white flex items-center justify-center gap-2"
          title="google driveからファイルを開く"
        >
          <FaGoogleDrive />
          ファイルを開く
        </button>
        <button
          className="w-full rounded-full bg-gray-300 hover:bg-gray-400 py-4 flex items-center justify-center gap-2"
          title="google driveからファイルを開く"
        >
          <GoUpload />
          アップロード
        </button>
      </div>
    </div>
  );
}