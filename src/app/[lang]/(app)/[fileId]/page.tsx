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
import Error from "@/app/error";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PiCardsThin } from "react-icons/pi";
import FlashCard from "@/components/functional/flashCard/card";
import Card from "@/components/functional/flashCard";
const columns: ColumnDef<fileType["content"][number]>[] = [
  {
    accessorKey: "index",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
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
  const { loading, error, title, fileContent, readOnly } = useFile(
    token,
    fileId
  );
  useDocumentTitle(`${removeExtension(title)}  | vocabphrase | chakkun1121`);
  if (error) return <Error error={error} />;
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
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                disabled={fileContent?.content?.length == 0}
              >
                <PiCardsThin />
                <span className="hidden md:inline-block">フラッシュカード</span>
              </Button>
            </DialogTrigger>
            <DialogContent
              className="w-5/6 h-5/6 max-w-none flex flex-col"
              onEscapeKeyDown={e => e.preventDefault()}
              onPointerDownOutside={e => e.preventDefault()}
            >
              <DialogHeader className="flex-none">
                <DialogTitle>フラッシュカード</DialogTitle>
              </DialogHeader>
              <Card
                className="flex-1"
                fileId={fileId}
                fileContent={fileContent}
                fileLoading={loading}
              />
            </DialogContent>
          </Dialog>
          <Button
            asChild
            variant="outline"
            disabled={fileContent?.content?.length == 0}
          >
            <a
              className="flex items-center gap-2"
              href={`./${fileId}/speaking`}
              title={
                fileContent?.content?.length === 0
                  ? "コンテンツがない状態ではスピーキング練習機能を利用できません。"
                  : undefined
              }
            >
              <RiSpeakLine />
              <span className="hidden md:inline-block">スピーキング練習</span>
            </a>
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
