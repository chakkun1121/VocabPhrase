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

  // useDocumentTitle(
  //   title
  //     ? `${title
  //         .split(".")
  //         .slice(0, -1)
  //         .join(".")} | 編集ページ | vocabphrase | chakkun1121`
  //     : "アプリ | vocabphrase | chakkun1121 "
  // );
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  console.log("saved: ", saved);

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
      const content: fileType = JSON.parse(await getFileContent(token, fileId));
      console.log("content: ", content);
      form.setValue("title", removeExtension(title));
      form.setValue("mode", content.mode);
      form.setValue("content", content.content);
    })();
  }, [token, fileId]);
  function onSubmit(data: z.infer<typeof fileFormSchema>) {
    console.log("data: ", data);
  }
  // if (loading) return <Loading />;

  return (
    <main className="max-w-7xl p-2 mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={() => setSaved(false)}
          className="space-y-4"
        >
          <div className="flex">
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
  return (
    <Button
      onClick={async () => {
        setSaving(true);
        const content: fileType = {
          mode: form.getValues("mode") || null,
          content: form.getValues("content"),
        };
        await Promise.all([
          updateFileInfo(token, fileId, {
            name: form.getValues("title"),
          }),
          uploadFile(token, fileId, JSON.stringify(content)),
        ]);
        setSaving(false);
        setSaved(true);
      }}
      disabled={saving}
    >
      {saving && <Loader2 className="animate-spin" />}
      保存{saving && "中"}
    </Button>
  );
}
