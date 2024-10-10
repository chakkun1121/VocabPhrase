"use client";
import { useToken } from "@/common/hooks/useToken";
import { Button } from "@/components/ui/button";
import { listFiles, deleteFile } from "@/googledrive";
import { useFile } from "@/googledrive/useFile";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import router from "next/router";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoPrintOutline } from "react-icons/io5";
import { RiSpeakLine } from "react-icons/ri";
import { fileType } from "@/types/fileType";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { removeExtension } from "@/common/library/removeExtension";
import Loading from "@/components/ui-elements/loading";
import { useDocumentTitle } from "@uidotdev/usehooks";
import Link from "next/link";
import { PiCardsThin } from "react-icons/pi";
const columns: ColumnDef<fileType["content"][number]>[] = [
  {
    accessorKey: "index",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          No.
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "en",
    header: "英文",
  },
  {
    accessorKey: "ja",
    header: "日本語訳",
  },
];
export default function Page({
  params: { lang, fileId },
}: {
  params: { lang: string; fileId: string };
}) {
  const token = useToken();
  const { loading, title, fileContent, readOnly } = useFile(token, fileId);
  useDocumentTitle(`${removeExtension(title)}  | vocabphrase | chakkun1121`);
  if (loading) return <Loading />;
  return (
    <main className="max-w-7xl p-2 mx-auto">
      <nav className="flex justify-between">
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link className="flex items-center gap-2" href={`./${fileId}/edit`}>
              <IoPrintOutline />
              <span className="hidden md:inline-block">編集</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            disabled={fileContent?.content?.length == 0}
            asChild>
            <Link
              href={`./${fileId}/flashcard`}
              className="flex items-center gap-2"
            />
            <PiCardsThin />
            <span className="hidden md:inline-block">フラッシュカード</span>
          </Button>
          <Button
            asChild
            variant="outline"
            disabled={fileContent?.content?.length == 0}>
            <Link
              className="flex items-center gap-2"
              href={`./${fileId}/speaking`}
              title={
                fileContent?.content?.length === 0
                  ? "コンテンツがない状態ではスピーキング練習機能を利用できません。"
                  : undefined
              }>
              <RiSpeakLine />
              <span className="hidden md:inline-block">スピーキング練習</span>
            </Link>
          </Button>
        </div>
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
              }}>
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
                }}>
                ファイルを削除
              </DropdownMenuLabel>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <h2 className="text-2xl text-center px-2">{removeExtension(title)}</h2>
      <DataTable
        columns={columns}
        data={
          fileContent?.content?.map((c, i) => {
            return {
              ...c,
              index: i + 1,
            };
          }) || []
        }
      />
    </main>
  );
}
