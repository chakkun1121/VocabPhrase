"use client";
import { FaGoogleDrive, FaPlus } from "react-icons/fa";
import { customSession } from "../../../../../types/customSession";
import { useRouter } from "next/navigation";
import { listFiles } from "@/googledrive";
import { sendGAEvent } from "@next/third-parties/google";
import { useState } from "react";
import Link from "next/link";
import { MdOutlineQuestionMark } from "react-icons/md";
import useDrivePicker from "react-google-drive-picker";
import { env } from "process";
import { useToken } from "@/common/hooks/useToken";

export default function LeftBarButtons({ reload }: { reload: () => void }) {
  const [isCreating, setIsCreating] = useState(false);
  const token = useToken();
  const router = useRouter();
  const [openPicker, authResponse] = useDrivePicker();

  async function createFile() {
    sendGAEvent({
      event: "createFile",
      category: "file",
    });
    setIsCreating(true);
    try {
      let parentFolder = await listFiles(token)
        .then(res => res.files)
        .then(files => {
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
        ).then(res => res.json());
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
      reload();
      const file = await response.json();
      router.push(`/app?fileId=${file?.id}`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCreating(false);
    }
  }
  function handleOpenPicker() {
    openPicker({
      clientId: env.GOOGLE_CLIENT_ID || "",
      developerKey: env.GOOGLE_DEVELOPER_KEY || "",
      token,
      viewId: "DOCS",
      showUploadView: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: data => {
        if (data.action === "cancel") {
          console.warn("User clicked cancel/close button");
          return;
        }
        if (data?.docs?.[0]?.name?.endsWith(".vocabphrase")) {
          router.push(`/app?fileId=${data.docs[0].id}`);
        }
      },
    });
  }
  return (
    <div className="flex-none p-4 flex flex-col gap-4">
      <Link
        href="/app"
        className="w-full rounded-full bg-gray-100 hover:bg-gray-200  py-4  flex items-center justify-center gap-2 text-black visited:text-black hover:text-black text-button"
      >
        <MdOutlineQuestionMark />
        使い方
      </Link>
      <button
        className="w-full rounded-full bg-Pizazz-400 hover:bg-Pizazz-300 disabled:bg-Pizazz-500 py-4 text-white flex items-center justify-center gap-2"
        title="ファイルを新規作成する"
        onClick={createFile}
        disabled={isCreating}
      >
        <FaPlus />
        新規作成
      </button>
      <button
        className="w-full rounded-full bg-Pizazz-400 hover:bg-Pizazz-300 py-4 text-white flex items-center justify-center gap-2"
        title="google driveからファイルを開く"
        onClick={handleOpenPicker}
      >
        <FaGoogleDrive />
        ファイルを開く
      </button>
    </div>
  );
}
