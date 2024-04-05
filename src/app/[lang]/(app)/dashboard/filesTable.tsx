"use client";

import { useToken } from "@/common/hooks/useToken";
import { deleteFile, listFiles } from "@/googledrive";
import { useState, useEffect } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";
import { MdOutlineModeEdit } from "react-icons/md";
import { PiCardsLight } from "react-icons/pi";
import Error from "@/app/error";
import { RiSpeakLine } from "react-icons/ri";

type TableInfo = {
  fileId: string;
  title: string;
  lastModified?: Date;
};

export default function FilesTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [recentFile, setRecentFile] = useState<TableInfo[]>([]);
  const [error, setError] = useState<any>(undefined);
  const token = useToken();
  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);
  const columns: ColumnDef<TableInfo>[] = [
    {
      id: "title",
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          タイトル
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      id: "lastModified",
      accessorKey: "lastModified",
      header: "最終更新日",
      cell: ({ row }) => row.original.lastModified?.toLocaleDateString(),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <nav className="flex items-center justify-end">
          <Button asChild variant="ghost" className="p-0">
            <Link
              href={`./${row.original.fileId}/edit`}
              className="aspect-square"
            >
              <MdOutlineModeEdit title="編集" />
            </Link>
          </Button>
          <Button asChild variant="ghost" className="p-0">
            <Link
              href={`./${row.original.fileId}/flashCard`}
              className="aspect-square"
            >
              <PiCardsLight title="フラッシュカード" />
            </Link>
          </Button>
          <Button asChild variant="ghost" className="p-0">
            <Link
              href={`./${row.original.fileId}/speaking`}
              className="aspect-square"
            >
              <RiSpeakLine title="スピーキング練習" />
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 data-[state=open]:bg-muted aspect-square"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel asChild>
                <Link href={`/${row.original.fileId}/edit`} className="block">
                  編集
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuLabel asChild>
                <Link
                  href={`./${row.original.fileId}/flashCard`}
                  className="block"
                >
                  フラッシュカード
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuLabel asChild>
                <Link
                  href={`./${row.original.fileId}/speaking`}
                  className="block"
                >
                  スピーキング練習
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel
                onClick={() => {
                  window.confirm("復元できません。よろしいでしょうか?") &&
                    (async () => {
                      await deleteFile(token, row.original.fileId);
                      getRecentFile();
                    })();
                }}
              >
                削除
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      ),
    },
  ];
  async function getRecentFile() {
    try {
      setIsLoading(true);
      const files = await listFiles(token, "trashed=false")
        .then(res => res.files)
        .catch(e => {
          throw e;
        });
      console.log(files);
      setRecentFile(
        files
          .filter((file: { name: string }) =>
            file.name.endsWith(".vocabphrase")
          )
          .map((file: { name: string; id: string }) => ({
            title: file.name.replace(/\.vocabphrase$/, ""),
            fileId: file.id,
          }))
      );
      setIsLoading(false);
    } catch (e) {
      setError(e);
    }
  }
  useEffect(() => {
    (async () => {
      if (!token) return;
      await getRecentFile();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  if (error) return <Error error={error} />;
  if (isLoading) return <div>Loading...</div>;
  return <DataTable columns={columns} data={recentFile} />;
}
