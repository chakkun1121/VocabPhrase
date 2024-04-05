import { fileType } from "@/types/fileType";
import { deleteFile, listFiles } from "@/googledrive";
import { sendGAEvent } from "@next/third-parties/google";
import { useRouter } from "next/navigation";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoSaveOutline, IoAddOutline } from "react-icons/io5";
import { uuidv7 as createUUID } from "uuidv7";
import { useToken } from "@/common/hooks/useToken";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function EditHeader({
  fileId,
  fileContent,
  setFileContent,
  saving,
  saveFileContent,
  saveFileInfo,
  readOnly,
  token,
}: {
  fileId: string;
  fileContent: fileType;
  setFileContent: React.Dispatch<React.SetStateAction<fileType>>;
  saving: boolean;
  saveFileContent: () => void;
  saveFileInfo: () => void;
  readOnly: boolean;
  token: string;
}) {
  const router = useRouter();
  return (
    <nav className="flex justify-between items-center p-4">
      <div className="flex gap-4">
        <div className="flex gap-4">
          {readOnly ? (
            <p className="text-gray-800">読み取り専用</p>
          ) : (
            <Button
              className="flex items-center gap-2"
              variant="outline"
              onClick={() => {
                setFileContent({
                  ...fileContent,
                  content: [
                    ...(fileContent?.content as fileType["content"]),
                    { id: createUUID(), en: "", ja: "" },
                  ].filter(e => e),
                } as fileType);
              }}
            >
              <IoAddOutline />
              <span className="hidden md:inline-block">追加</span>
            </Button>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        {!readOnly && (
          <>
            <Button
              className="flex items-center gap-2"
              disabled={saving}
              variant="outline"
              onClick={() => {
                sendGAEvent({
                  event: "clickSaveButton",
                  category: "file",
                });
                saveFileContent();
                saveFileInfo();
              }}
            >
              <IoSaveOutline />
              <span className="hidden md:inline-block">
                保存{saving && "中"}
              </span>
            </Button>
          </>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="p-0 aspect-square">
              <span className="sr-only">Open menu</span>
              <HiOutlineDotsVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel
              onClick={async () => {
                if (
                  window.confirm("フラッシュカードの履歴を本当に削除しますか?")
                ) {
                  const deleteFileId = await listFiles(
                    token,
                    "name='" + fileId + ".json'",
                    undefined,
                    undefined,
                    "spaces=appDataFolder"
                  ).then(r => r.files[0].id);
                  if (deleteFileId) await deleteFile(token, deleteFileId);
                  console.info("deleted");
                }
              }}
            >
              フラッシュカードの履歴を削除
            </DropdownMenuLabel>
            {!readOnly && (
              <DropdownMenuLabel
                onClick={() => {
                  window.confirm("復元できません。よろしいでしょうか?") &&
                    (async () => {
                      router.push("/app");
                      await deleteFile(token, fileId);
                    })();
                }}
              >
                ファイルを削除
              </DropdownMenuLabel>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
