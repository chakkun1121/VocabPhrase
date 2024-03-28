"use client";
import { fileType } from "@/types/fileType";
import { uuidv7 as createUUID } from "uuidv7";
import React, { useState } from "react";
import { flashCardMode } from "@/types/flashCardSettings";
import { wayakuFile2file } from "@/common/library/wayaku";
import { csvToFileContent } from "@/common/library/csvToFileContent";
import { uploadFile } from "@/common/library/uploadFile";
import { removeExtension } from "@/common/library/removeExtension";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ImportForm({
  setFileContent,
  setTitle,
}: {
  setFileContent: React.Dispatch<React.SetStateAction<fileType>>;
  setTitle: (title: string) => void;
}) {
  const [formContent, setFormContent] = useState("");
  function importFromBox() {
    const temp = formContent.split(/[\n\t]/).filter(e => e);
    const content: fileType["content"] = [];
    for (let i = 0; i < temp.length; i += 2) {
      content.push({
        id: createUUID(),
        en: temp[i],
        ja: temp[i + 1],
      });
    }

    setFileContent(fileContent => ({ ...fileContent, content }));
    setFormContent("");
    close();
  }
  async function uploadWayakuFile() {
    const [title, content] = await wayakuFile2file();
    setFileContent(content);
    setTitle(title);
    close();
  }
  async function importFromCsv(mode?: flashCardMode) {
    /**
     * ファイル形式(ヘッダー行は基本的になしだが、含まれている場合はユーザーによって除去してもらう)
     * 1. |表|裏|
     * 2. |index|表|裏|
     * 3. |表|(表ヒント(最後にカッコの中に入れる))|裏|(裏ヒント)|
     * 4. |index|表|(表ヒント)|裏|(裏ヒント)|
     */
    const { content, fileName } = await uploadFile([
      {
        description: "csvファイル(anikilot形式)",
        accept: { "text/csv": [".csv"] },
      },
    ]);
    if (!content) return;
    const csv = content.split("\n").map(line => line.split(","));
    const fileContent = csvToFileContent(csv, mode);
    const title = removeExtension(fileName);
    setFileContent({ content: fileContent, mode: null });
    setTitle(title);
  }
  return (
    <Dialog>
      <DialogTrigger asChild className="flex-none">
        <Button>インポート</Button>
      </DialogTrigger>
      <DialogContent
        className="w-5/6 h-5/6 max-w-none flex flex-col"
        onEscapeKeyDown={e => e.preventDefault()}
        onPointerDownOutside={e => formContent && e.preventDefault()}
      >
        <DialogHeader className="flex-none">インポート</DialogHeader>
        <Textarea
          className="rounded w-full resize-none h-full flex-1"
          placeholder={`英文or単語,日本語訳の順に入力\nExcel,Googleスプレッドシートなどからコピペできます\n例) \n単語1\t日本語訳1\n単語2\t日本語訳2`}
          onChange={e => setFormContent(e.target.value)}
        />
        <DialogFooter className="flex gap-4 flex-none">
          <DialogClose asChild>
            <Button className="flex-none " onClick={close}>
              キャンセル
            </Button>
          </DialogClose>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex-none">
                その他ファイルからのインポート
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel onClick={uploadWayakuFile}>
                和訳ファイル(.wayaku)
              </DropdownMenuLabel>
              <DropdownMenuLabel onClick={() => importFromCsv()}>
                csvファイル(ankilot形式のもの)
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogClose asChild>
            <Button
              className="flex-1"
              onClick={importFromBox}
              disabled={!formContent}
            >
              インポート
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
