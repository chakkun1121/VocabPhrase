import { flashCardSettings } from "@/types/flashCardSettings";
import { flashcardOptions } from "../flashcardOptions";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultFlashCardSettings } from "..";
import FormContent from "@/common/formContent";
import Link from "next/link";

const formSchema = z.object({
  isRandom: z.boolean(),
  isAnswerWithKeyboard: z.boolean(),
  mode: z.enum(["ja-en", "en-ja"]),
  efficiencyMode: z.boolean(),
});
export default function FlashCardHome({
  setMode,
  setFlashCardSettings,
}: {
  setMode: (mode: "cards") => void;
  setFlashCardSettings: React.Dispatch<React.SetStateAction<flashCardSettings>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFlashCardSettings,
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const settings = values;
    setFlashCardSettings(settings);
    setMode("cards");
  }
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 p-4 w-full max-w-5xl mx-auto"
        onSubmit={form.handleSubmit(onSubmit)}>
        <div className="p-2 [&>*]:flex [&>*]:items-center grid gap-3 [&>*]:p-2 [&>*]:justify-between ">
          {flashcardOptions.map(option => (
            <FormContent option={option} form={form} key={option.name} />
          ))}
        </div>
        <Button type="submit" className="text-center w-full">
          Start
        </Button>
        <Link prefetch={false} href="./learn">
          学習機能(Beta)
        </Link>
      </form>
    </Form>
  );
}
