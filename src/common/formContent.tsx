import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";

export default function FormContent({
  option,
  form,
}: {
  option: Option;
  form: UseFormReturn<any>;
}) {
  if (typeof option.default === "boolean")
    return (
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
    );
  if (option?.options && typeof option?.options !== undefined)
    return (
      <FormField
        control={form.control}
        name={option.name as any}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{option.title}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}>
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
    );
  return null;
}

export type Option =
  | {
      name: string;
      id: string;
      title: string;
      default: string;
      options?: {
        value: string;
        label: string;
        inputType?: string;
      }[];
    }
  | {
      name: string;
      id: string;
      title: string;
      default: boolean;
      options?: undefined;
    }
  | {
      name: string;
      id: string;
      title: string;
      default: number;
      options?: undefined;
    };
