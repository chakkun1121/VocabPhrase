import { Button } from "@/components/ui/button";
import { fileType } from "@/types/fileType";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { uuidv7 as createUUID } from "uuidv7";

export default function ImportDialog({ form }: { form: any }) {
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  function Import() {
    const temp = content.split(/[\n\t]/).filter(e => e);
    const fileContent: fileType["content"] = [];
    for (let i = 0; i < temp.length; i += 2) {
      fileContent.push({
        id: createUUID(),
        en: temp[i],
        ja: temp[i + 1],
      });
    }
    form.setValue("content", fileContent);
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={o => setOpen(o)}>
      <DialogTrigger asChild>
        <Button variant="outline">インポート</Button>
      </DialogTrigger>
      <DialogContent className="w-5/6 h-5/6 max-w-none flex flex-col">
        <DialogHeader>インポート</DialogHeader>
        <Textarea
          onChange={e => setContent(e.target.value)}
          className="w-full resize-none h-full flex-1"
          placeholder={`英文or単語,日本語訳の順に入力\nExcel,Googleスプレッドシートなどからコピペできます\n例) \n単語1\t日本語訳1\n単語2\t日本語訳2`}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">キャンセル</Button>
          </DialogClose>
          <Button onClick={Import}>インポート</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
