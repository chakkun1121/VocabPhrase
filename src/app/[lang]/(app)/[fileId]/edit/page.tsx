"use client";
import { useToken } from "@/common/hooks/useToken";
import { removeExtension } from "@/common/library/removeExtension";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  getFileContent,
  getFileInfo,
  updateFileInfo,
  uploadFile,
} from "@/googledrive";
import { fileType } from "@/types/fileType";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { uuidv7 as createUUID } from "uuidv7";
import { TrashIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import Loading from "@/components/ui-elements/loading";
import { useLeavePageConfirmation } from "@/common/hooks/useLeavePageConfirmation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useHotkeys } from "react-hotkeys-hook";
const fileFormSchema = z.object({
  title: z.string(),
  mode: z.union([
    z.literal("words"),
    z.literal("phrases"),
    z.literal("sentences"),
    z.null(),
    z.undefined(),
  ]),
  content: z.array(
    z.object({
      id: z.string(),
      en: z.string(),
      ja: z.string(),
    })
  ),
});
export default function Page({
  params: { fileId, lang },
}: {
  params: { fileId: string; lang: string };
}) {
  const token = useToken();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  useLeavePageConfirmation(!saved && !saving);
  const form = useForm<z.infer<typeof fileFormSchema>>({
    resolver: zodResolver(fileFormSchema),
    defaultValues: {
      title: "",
      mode: null,
      content: [],
    },
  });
  useEffect(() => {
    (async () => {
      if (!token) return;
      const fileInfo = await getFileInfo(token, fileId);
      const title = fileInfo.name;
      if (!title) throw new Error("file is not found");
      const file: fileType = JSON.parse(
        (await getFileContent(token, fileId)) || "{}"
      );
      form.setValue("title", removeExtension(title));
      form.setValue("mode", file?.mode);
      form.setValue("content", file?.content || []);
      setLoading(false);
    })();
  }, [token, fileId]);
  function onSubmit(data: z.infer<typeof fileFormSchema>) {}
  if (loading) return <Loading />;
  return (
    <main className="max-w-7xl p-2 mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={() => setSaved(false)}
          className="space-y-4"
        >
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                  >
                    <FormControl className="flex-none w-48">
                      <SelectTrigger>
                        <SelectValue placeholder="モードを選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="words">単語 </SelectItem>
                      <SelectItem value="phrases">フレーズ</SelectItem>
                      <SelectItem value="sentences">文章</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {!form.watch("content").length && <ImportDialog form={form} />}
            <SaveButton
              token={token}
              fileId={fileId}
              form={form}
              setSaved={setSaved}
              setSaving={setSaving}
              saving={saving}
            />
          </div>
          <section className="space-y-4">
            {form.watch("content")?.map((item, index) => (
              <div key={item.id} className="flex items-center">
                <p className="flex-none p-2">{index + 1}</p>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name={`content.${index}.en`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="en" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`content.${index}.ja`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="ja" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  onClick={() =>
                    form.setValue(
                      "content",
                      form.getValues("content").filter((_, i) => i !== index)
                    )
                  }
                  variant="ghost"
                >
                  <TrashIcon />
                </Button>
              </div>
            ))}
            <Button
              onClick={() => {
                form.setValue("content", [
                  ...form.getValues("content"),
                  { id: createUUID(), en: "", ja: "" },
                ]);
              }}
            >
              Add
            </Button>
          </section>
        </form>
      </Form>
    </main>
  );
}
function SaveButton({
  token,
  fileId,
  form,
  setSaved,
  setSaving,
  saving,
}: {
  token: string;
  fileId: string;
  form: any;
  setSaved: (saved: boolean) => void;
  setSaving: (saving: boolean) => void;
  saving: boolean;
}) {
  async function save() {
    setSaving(true);
    const content: fileType = {
      mode: form.getValues("mode") || null,
      content: form.getValues("content"),
    };
    await Promise.all([
      updateFileInfo(token, fileId, {
        name: form.getValues("title") + ".vocabphrase",
      }),
      uploadFile(token, fileId, JSON.stringify(content)),
    ]);
    setSaving(false);
    setSaved(true);
  }
  useHotkeys("ctrl+s", save, {
    enableOnFormTags: true,
    enableOnContentEditable: true,
    preventDefault: true,
  });
  return (
    <Button onClick={save} disabled={saving}>
      {saving && <Loader2 className="animate-spin" />}
      保存{saving && "中"}
    </Button>
  );
}
function ImportDialog({ form }: { form: any }) {
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
          <Button onClick={Import}>インポート</Button>
          <DialogClose asChild>
            <Button>キャンセル</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
