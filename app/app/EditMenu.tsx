"use client";
import { fileType } from "@/@types/fileType";
import { useFieldArray, useForm } from "react-hook-form";
import { uuidv7 as createUUID } from "uuidv7";
import { MdDeleteOutline } from "react-icons/md";
import { LuGripVertical } from "react-icons/lu";
import { FaPlus } from "react-icons/fa";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export default function EditMenu({
  title,
  setTitle,
  fileContent,
  setFileContent,
}: {
  title: string;
  setTitle: (title: string) => void;
  fileContent: fileType;
  setFileContent: (fileContent: fileType) => void;
}) {
  const { control, register } = useForm({
    defaultValues: fileContent,
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "content", // unique name for your Field Array
    }
  );
  return (
    <div className="flex flex-col h-full p-4 gap-4">
      <div className="flex-none">
        <input
          type="text"
          defaultValue={title}
          className="w-full p-4 rounded bg-gray-100 border border-gray-800"
          placeholder="ファイル名を入力してください"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-x-scroll flex flex-col gap-4 bg-gray-100 rounded p-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex gap-4 p-4 bg-gray-200 rounded items-center"
          >
            <div className="flex flex-col gap-4 flex-1">
              <input
                className="rounded p-2"
                placeholder="英文を入力"
                {...register(`content.${index}.en`)}
              />
              <input
                className="rounded p-2"
                placeholder="日本語訳を入力"
                {...register(`content.${index}.ja`)}
              />
            </div>
            <div className="flex-none flex flex-col gap-4">
              <Button onClick={() => remove(index)}>
                <MdDeleteOutline />
              </Button>
              {/* <Button>
                <LuGripVertical />
              </Button> */}
            </div>
          </div>
        ))}
        <button
          className="flex gap-4 p-4 bg-gray-200 hover:bg-gray-300 rounded-full items-center justify-center"
          onClick={() => append({ en: "", ja: "", id: createUUID() })}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
function Button(
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  const { className, ...rest } = props;
  return (
    <button
      className={`bg-gray-300 hover:bg-gray-400 rounded-full p-2 ${className}`}
      {...rest}
    />
  );
}
