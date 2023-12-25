"use client";
import { fileType } from "@/@types/fileType";
import { uuidv7 as createUUID } from "uuidv7";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { LuGripVertical } from "react-icons/lu";
import { ButtonHTMLAttributes, DetailedHTMLProps, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";

import ImportForm from "./ImportForm";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

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
  const [isShowImportBox, setIsShowImportBox] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = fileContent.content.findIndex((v) => v.id === active.id);
      const newIndex = fileContent.content.findIndex((v) => v.id === over.id);
      setFileContent({
        content: arrayMove(fileContent.content, oldIndex, newIndex),
      });
    }
  };
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={fileContent.content}>
            {fileContent.content.map((field, index) => (
              <Content
                key={field.id}
                field={field}
                index={index}
                fileContent={fileContent}
                setFileContent={setFileContent}
              />
            ))}
          </SortableContext>
        </DndContext>
        {fileContent.content.length === 0 && isShowImportBox && (
          <ImportForm
            close={() => setIsShowImportBox(false)}
            setFileContent={setFileContent}
          />
        )}
        {!isShowImportBox && (
          <div className="flex gap-4">
            {fileContent.content.length === 0 && (
              <button
                className="flex flex-none gap-4 p-4 bg-gray-200 hover:bg-gray-300 rounded-full items-center justify-center"
                onClick={() => setIsShowImportBox(true)}
              >
                インポート
              </button>
            )}
            <button
              className="flex flex-1 gap-4 p-4 bg-gray-200 hover:bg-gray-300 rounded-full items-center justify-center"
              onClick={() => {
                setFileContent({
                  content: [
                    ...fileContent.content,
                    { id: createUUID(), en: "", ja: "" },
                  ],
                });
              }}
              title="追加"
            >
              <FaPlus />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
function Content({
  field,
  index,
  fileContent,
  setFileContent,
}: {
  field: { id: UniqueIdentifier; en: string; ja: string };
  index: number;
  fileContent: fileType;
  setFileContent: (fileContent: fileType) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });
  return (
    <div
      className="flex gap-4 p-4 bg-gray-200 rounded items-center"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <div className="flex-none flex items-center">
        <p>{index + 1}</p>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <input
          className="rounded p-2"
          placeholder="英文を入力"
          defaultValue={field.en}
          onChange={(e) =>
            setFileContent({
              ...fileContent,
              content: fileContent.content.map((field, i) =>
                i === index ? { ...field, en: e.target.value } : field
              ),
            })
          }
        />
        <input
          className="rounded p-2"
          placeholder="日本語訳を入力"
          defaultValue={field.ja}
          onChange={(e) =>
            setFileContent({
              content: fileContent.content.map((field, i) =>
                i === index ? { ...field, ja: e.target.value } : field
              ),
            })
          }
        />
      </div>
      <div className="flex-none flex flex-col gap-4">
        <Button
          onClick={() =>
            setFileContent({
              content: fileContent.content.filter((_, i) => i !== index),
            })
          }
          title="削除"
        >
          <MdDeleteOutline />
        </Button>
        <Button>
          <LuGripVertical />
        </Button>
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
