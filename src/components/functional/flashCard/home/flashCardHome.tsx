import { flashCardSettings } from "@/types/flashCardSettings";
import { flashcardOptions } from "../flashcardOptions";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  isRandom: z.boolean(),
  isAnswerWithKeyboard: z.boolean(),
  removeChecked: z.boolean(),
  mode: z.enum(["ja-en", "en-ja"]),
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
    defaultValues: {
      isRandom: false,
      mode: "ja-en",
      isAnswerWithKeyboard: false,
      removeChecked: true,
    },
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
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="p-2 [&>*]:flex [&>*]:items-center grid gap-3 [&>*]:p-2 [&>*]:justify-between ">
          {flashcardOptions.map(option => (
            <React.Fragment key={option.name}>
              {typeof option.default === "boolean" && (
                <FormField
                  control={form.control}
                  name={option.name}
                  render={({ field }) => (
                    <FormItem className="flex">
                      <FormLabel className="flex-1">{option.title}</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value as boolean}
                          onCheckedChange={field.onChange}
                          className="mr-2 flex-none"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              {option?.options && typeof option?.options !== undefined && (
                <FormField
                  control={form.control}
                  name={option.name as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{option.title}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          {option.options?.map(o => (
                            <FormItem key={o.value}>
                              <FormControl>
                                <RadioGroupItem value={o.value || ""} />
                              </FormControl>
                              <FormLabel>{o.label}</FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <Button type="submit" className="text-center w-full">
          Start
        </Button>
      </form>
    </Form>
  );
}
