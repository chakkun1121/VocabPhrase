"use client";
import Link from "next/link";
import { IoMdOpen } from "react-icons/io";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { customSession } from "../../../../types/customSession";
import { IoReload } from "react-icons/io5";
import LeftBarButtons from "./LeftBarButtons";
import { deleteFile, listFiles } from "@/googledrive";
import { useRouter } from "next/navigation";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function RecentFile({ hidden }: { hidden: boolean }) {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session }: { data: customSession | null } =
    useSession() as unknown as { data: customSession };
  const [recentFile, setRecentFile] = useState<
    { title: string; fileId: string }[]
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
            fileId: file.id,
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
      <div className="flex-1 overflow-y-scroll">
        {error ? (
          <p className="text-center">
            エラーが発生しました。
            <Link href="/logout?redirectTo=/login?redirectTo=/app">
              再度ログイン
            </Link>
            してください。
          </p>
        ) : isLoading ? (
          <p className="text-center">loading...</p>
        ) : recentFile?.length ? (
          <ul className="p-4 flex flex-col gap-4 ">
            {recentFile.map((file) => (
              <File
                file={file}
                token={token}
                key={file.fileId}
                getRecentFile={getRecentFile}
              />
            ))}
          </ul>
        ) : (
          <p className="text-center">ファイルが見つかりませんでした</p>
        )}
      </div>
      <LeftBarButtons reload={getRecentFile} />
    </div>
  );
}
function File({
  file,
  token,
  getRecentFile,
}: {
  file: { title: string; fileId: string };
  token: string;
  getRecentFile: () => void;
}) {
  const router = useRouter();
  const [isOpened, setIsOpened] = useState(false);
  // useEffect(() => {
  //   function close() {
  //     if (isOpened) setIsOpened(false);
  //   }
  //   window.addEventListener("click", close);
  //   return () => {
  //     window.removeEventListener("click", close);
  //   };
  // }, [isOpened]);
  return (
    <li key={file.fileId} className="list-none">
      <div className="flex items-center gap-2">
        <Link
          href={`./app?fileId=${file.fileId}`}
          className="text-black hover:text-black visited:text-black flex-1 truncate"
        >
          {file.title.split(".").slice(0, -1).join(".")}
        </Link>
        <Link
          href={`./app?fileId=${file.fileId}`}
          target="_blank"
          aria-label="新しいタブで開く"
          className="text-black hover:text-black visited:text-black flex-none"
        >
          <IoMdOpen />
        </Link>
        <button className="flex-none" onClick={() => setIsOpened(true)}>
          <HiOutlineDotsVertical />
        </button>
        {isOpened && (
          <div className="fixed left-[calc(min(24rem,calc(theme(width.screen)-3rem))-theme(width.3))] bg-gray-100 rounded p-2 z-50">
            <button
              onClick={() => {
                setIsOpened(false);
                window.confirm("復元できません。よろしいでしょうか?") &&
                  (async () => {
                    router.push("/app");
                    await deleteFile(token, file.fileId);
                    getRecentFile();
                  })();
              }}
            >
              削除
            </button>
          </div>
        )}
      </div>
      {isOpened && (
        <button
          onClick={() => setIsOpened(false)}
          className="w-screen h-screen absolute bg-opacity-0 inset-0 z-40 cursor-default"
        />
      )}
    </li>
  );
}
