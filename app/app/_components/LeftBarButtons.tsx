"use client";
import { FaPlus } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { customSession } from "../../../@types/customSession";
import { useRouter } from "next/navigation";
import { listFiles } from "@/googledrive";
import Header from "./header";

export default function LeftBarButtons() {
  const { data: session }: { data: customSession | null } =
    useSession() as unknown as { data: customSession };
  const token = session?.accessToken;
  const router = useRouter();
  async function createFile() {
    // TODO: 作成したファイルが左に追加されない問題をどうにかする
    try {
      let parentFolder = await listFiles(token)
        .then((res) => res.files)
        .then((files) => {
          return files.find(
            (file: { name: string }) => file.name === "VocabPhrase"
          );
        });
      if (!parentFolder) {
        parentFolder = await fetch(
          "https://www.googleapis.com/drive/v3/files",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "VocabPhrase",
              mimeType: "application/vnd.google-apps.folder",
            }),
          }
        ).then((res) => res.json());
      }
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
            parents: [parentFolder.id],
          }),
        }
      );
      const file = await response.json();
      router.push(`/app?fileID=${file?.id}`);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="flex-none p-4 flex flex-col gap-4">
      <button
        className="w-full rounded-full bg-Pizazz-400 hover:bg-Pizazz-300 py-4 text-white flex items-center justify-center gap-2"
        title="ファイルを新規作成する"
        onClick={createFile}
      >
        <FaPlus />
        新規作成
      </button>
      {/* <button
                className="w-full rounded-full bg-Pizazz-400 hover:bg-Pizazz-300 py-4 text-white flex items-center justify-center gap-2"
                title="google driveからファイルを開く"
              >
                <FaGoogleDrive />
                ファイルを開く
              </button> */}
      {/* <button
                className="w-full rounded-full bg-gray-300 hover:bg-gray-400 py-4 flex items-center justify-center gap-2"
                title="ローカルファイルをアップロードする"
              >
                <GoUpload />
                アップロード
              </button> */}
    </div>
  );
}
