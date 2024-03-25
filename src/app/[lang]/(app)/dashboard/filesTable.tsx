"use client";

import { useToken } from "@/common/hooks/useToken";
import { deleteFile, listFiles } from "@/googledrive";
import { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { IoMdOpen } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Button } from "@/components/ui/button";

export default function FilesTable() {
  const [isLoading, setIsLoading] = useState(true);

  const [recentFile, setRecentFile] = useState<
    { title: string; fileId: string }[]
  >([]);
  const [error, setError] = useState<any>(undefined);
  const token = useToken();
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
    }
  }
  useEffect(() => {
    (async () => {
      if (!token) return;
      await getRecentFile();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ファイル名</TableHead>
          <TableHead>最終更新日</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentFile.map(file => (
          <TableRow key={file.fileId}>
            <TableCell className="flex">
              <Link href={`/${file.fileId}`}>
                {file.title.replace(/\.vocabphrase$/, "")}
              </Link>
            </TableCell>
            <TableCell>2021-08-02</TableCell>
            <TableCell className="w-min">
              <Link href={`/${file.fileId}`} target="_blank">
                <IoMdOpen />
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <HiOutlineDotsVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel asChild>
                    <Link href={`/${file.fileId}`} className="block">
                      開く
                    </Link>
                  </DropdownMenuLabel>
                  <DropdownMenuLabel asChild>
                    <Link href={`/${file.fileId}/edit`} className="block">
                      編集
                    </Link>
                  </DropdownMenuLabel>
                  <DropdownMenuLabel
                    onClick={() => {
                      window.confirm("復元できません。よろしいでしょうか?") &&
                        (async () => {
                          await deleteFile(token, file.fileId);
                          getRecentFile();
                        })();
                    }}
                  >
                    削除
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
