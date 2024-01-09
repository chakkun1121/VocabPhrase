"use client";
import Link from "next/link";
import { IoMdOpen } from "react-icons/io";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { customSession } from "../../../@types/customSession";
import { IoReload } from "react-icons/io5";
import LeftBarButtons from "./LeftBarButtons";
import { deleteFile, listFiles } from "@/googledrive";
import { FaRegTrashAlt } from "react-icons/fa";

export default function RecentFile({ hidden }: { hidden: boolean }) {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session }: { data: customSession | null } =
    useSession() as unknown as { data: customSession };
  const [recentFile, setRecentFile] = useState<
    { title: string; fileID: string }[]
  >([]);
  const [error, setError] = useState<any>(undefined);
  const token = session?.accessToken;
  async function getRecentFile() {
    try {
      setIsLoading(true);
      const files = await listFiles(token, "trashed=false")
        .then((res) => res.files)
        .catch((e) => {
          throw e;
        });
      setRecentFile(
        files
          .map((file: { name: string; id: string }) => ({
            title: file.name,
            fileID: file.id,
          }))
          .filter((file: { title: string }) =>
            file.title.endsWith(".vocabphrase")
          )
      );
      setIsLoading(false);
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
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
        {error && (
          <p className="text-center">
            エラーが発生しました。
            <Link href="/logout?redirectTo=/login?redirectTo=/app">
              再度ログイン
            </Link>
            してください。
          </p>
        )}
        {isLoading ? (
          <p className="text-center">loading...</p>
        ) : (
          <ul className="p-4 flex flex-col gap-4 overflow-y-scroll h-full">
            {recentFile?.length ? (
              recentFile.map((file) => (
                <li key={file.fileID} className="list-none">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`./app?fileID=${file.fileID}`}
                      className="text-black hover:text-black visited:text-black flex-1 truncate"
                    >
                      {file.title.split(".").slice(0, -1).join(".")}
                    </Link>
                    <button
                      className="flex-none"
                      onClick={() =>
                        window.confirm("復元できません。よろしいでしょうか?") &&
                        deleteFile(token, file.fileID)
                      }
                    >
                      <FaRegTrashAlt />
                    </button>
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
