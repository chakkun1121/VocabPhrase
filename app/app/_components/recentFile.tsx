"use client";
import Link from "next/link";
import { IoMdOpen } from "react-icons/io";
import { FaGoogleDrive, FaPlus } from "react-icons/fa";
import { GoUpload } from "react-icons/go";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { customSession } from "../../../@types/customSession";
import { useRouter } from "next/navigation";
export default function RecentFile() {
  const { data: session }: { data: customSession | null } =
    useSession() as unknown as { data: customSession };
  const [recentFile, setRecentFile] = useState<
    { title: string; fileID: string }[]
  >([]);
  const token = session?.accessToken;
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const files = await fetch("/api/drive/listFiles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            q: "'appDataFolder' in parents",
          },
        })
          .then((res) => res.json())
          .catch((e) => {
            throw e;
          });
        setRecentFile(
          files.map((file: { name: string; id: string }) => ({
            title: file.name,
            fileID: file.id,
          }))
        );
      } catch (e) {
        console.error(e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function createFile() {
    try {
      const response = await fetch(
        "https://www.googleapis.com/drive/v3/files",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "newFile.vocabphrase",
            mimeType: "application/vocabphrase",
          }),
        }
      );
      console.log(response);
      const file = await response.json();
      console.log(file);
      router.push(`/app?fileID=${file?.id}`);
    } catch (e) {
      console.error(e);
    }
  }
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
          title="ファイルを新規作成する"
          onClick={createFile}
        >
          <FaPlus />
          新規作成
        </button>
        <button
          className="w-full rounded-full bg-Pizazz-400 hover:bg-Pizazz-300 py-4 text-white flex items-center justify-center gap-2"
          title="google driveからファイルを開く"
        >
          <FaGoogleDrive />
          ファイルを開く
        </button>
        <button
          className="w-full rounded-full bg-gray-300 hover:bg-gray-400 py-4 flex items-center justify-center gap-2"
          title="ローカルファイルをアップロードする"
        >
          <GoUpload />
          アップロード
        </button>
      </div>
    </div>
  );
}
