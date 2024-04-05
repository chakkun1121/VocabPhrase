"use client";
import { fileType } from "@/types/fileType";
import { uuidv7 as createUUID } from "uuidv7";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import ImportForm from "./ImportForm";
import { Button } from "@/components/ui/button";
import EditTitle from "./editTitle";
import { cn } from "@/lib/utils";
import TextInput from "./textInput";

export default function EditMenu({
  title,
  setTitle,
  fileContent,
  setFileContent,
  readOnly,
}: {
  title: string;
  setTitle: (title: string) => void;
  fileContent: fileType;
  setFileContent: React.Dispatch<React.SetStateAction<fileType>>;
  readOnly: boolean;
}) {
  return (
    <div className="flex flex-col p-4 gap-4">
      <EditTitle
        title={title}
        setTitle={setTitle}
        readOnly={readOnly}
        fileContent={fileContent}
        setFileContent={setFileContent}
      />
      <div className="flex-1 flex flex-col gap-2 p-2">
        {fileContent.content.map((field, index) => (
          <div key={field.id} className="flex gap-4 p-4 rounded items-center">
            <div className="flex-none flex items-center">
              <p>{index + 1}</p>
            </div>
            <div
              className={cn(
                "flex gap-4 flex-1",
                fileContent.mode == "words" || fileContent.mode == "phrases"
                  ? "flex-wrap"
                  : "flex-col"
              )}
            >
              <TextInput
                mode={fileContent.mode}
                field={field}
                index={index}
                fileContent={fileContent}
                setFileContent={setFileContent}
                readOnly={readOnly}
                lang="en"
              />
              <TextInput
                mode={fileContent.mode}
                field={field}
                index={index}
                fileContent={fileContent}
                setFileContent={setFileContent}
                readOnly={readOnly}
                lang="ja"
              />
            </div>
            {!readOnly && (
              <div className="flex-none flex flex-col gap-4">
                <Button
                  className="aspect-square p-0"
                  variant="outline"
                  onClick={() =>
                    setFileContent({
                      ...fileContent,
                      content: fileContent.content.filter(
                        (_, i) => i !== index
                      ),
                    })
                  }
                  title="削除"
                  disabled={readOnly}
                >
                  <MdDeleteOutline className="w-4 h-4" />
                </Button>
                {/* <Button>
                  <LuGripVertical />
                </Button> */}
              </div>
            )}
          </div>
        ))}
      </div>
      {!readOnly && (
        <div className="flex gap-4">
          {fileContent.content.length === 0 && !readOnly && (
            <ImportForm setFileContent={setFileContent} setTitle={setTitle} />
          )}
          <Button
            className="flex flex-1 gap-4 p-4 items-center justify-center"
            onClick={() => {
              setFileContent({
                ...fileContent,
                content: [
                  ...fileContent.content,
                  { id: createUUID(), en: "", ja: "" },
                ],
              });
            }}
            title="追加"
          >
            <FaPlus />
          </Button>
        </div>
      )}
    </div>
  );
}
