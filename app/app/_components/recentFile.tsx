"use client";
import Link from "next/link";
import { IoMdOpen } from "react-icons/io";
import { FaGoogleDrive } from "react-icons/fa";
import { GoUpload } from "react-icons/go";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { customSession } from "../../../@types/customSession";
import { useRouter } from "next/navigation";
import { IoReload } from "react-icons/io5";
import LeftBarButtons from "./LeftBarButtons";
import { listFiles } from "@/googledrive";

export default function RecentFile({ hidden }: { hidden: boolean }) {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session }: { data: customSession | null } =
    useSession() as unknown as { data: customSession };
  const [recentFile, setRecentFile] = useState<
    { title: string; fileID: string }[]
  >([]);
  const token = session?.accessToken;
  async function getRecentFile() {
    setIsLoading(true);
    const files = await listFiles(token)
      .then((res) => res.files)
      .catch((e) => {
        throw e;
      });
    setRecentFile(
      files.map((file: { name: string; id: string }) => ({
        title: file.name,
        fileID: file.id,
      }))
    );
    setIsLoading(false);
  }
  useEffect(() => {
    (async () => {
      if (!token) return;
      await getRecentFile();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className={`flex flex-col h-full ${hidden && "hidden"}`}>
      <div className="flex-none flex items-center justify-between p-2">
        <p className="text-heading-S">最近使用したファイル</p>
        <button onClick={getRecentFile} title="更新">
          <IoReload />
        </button>
      </div>
      <div className="flex-1">
        {isLoading ? (
          <p className="text-center">loading...</p>
        ) : (
          <ul className="p-4 flex flex-col gap-4 overflow-y-scroll h-full">
            {recentFile ? (
              recentFile.map((file) => (
                <li key={file.fileID} className="list-none">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`./app?fileID=${file.fileID}`}
                      className="text-black hover:text-black visited:text-black flex-1 truncate"
                    >
                      {file.title.split(".").slice(0, -1).join(".")}
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
              ))
            ) : (
              <p className="text-center">ファイルが見つかりませんでした</p>
            )}
          </ul>
        )}
      </div>
      <LeftBarButtons />
    </div>
  );
}
