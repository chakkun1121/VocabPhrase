import { Button } from "@/components/ui/button";
import { defaultLearnSettings, learnOptions, LearnSettings } from ".";
import React from "react";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormContent from "../../../common/formContent";
const formSchema = z.object({
  isAnswerWithKeyboard: z.boolean(),
  mode: z.enum(["ja-en", "en-ja"]),
});

export default function Home({
  setMode,
  setLearnSettings,
}: {
  setMode: (mode: "cards") => void;
  setLearnSettings: React.Dispatch<React.SetStateAction<LearnSettings>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultLearnSettings,
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const settings = values;
    setLearnSettings(settings);
    setMode("cards");
  }
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 p-4 w-full max-w-5xl mx-auto"
        onSubmit={form.handleSubmit(onSubmit)}>
        <div className="p-2 [&>*]:flex [&>*]:items-center grid gap-3 [&>*]:p-2 [&>*]:justify-between ">
          {learnOptions.map(option => (
            <FormContent option={option} form={form} key={option.name} />
          ))}
        </div>
        <Button type="submit" className="text-center w-full">
          Start
        </Button>
      </form>
    </Form>
  );
}
