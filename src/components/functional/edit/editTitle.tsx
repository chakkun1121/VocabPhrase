"use client";
import { fileType } from "@/types/fileType";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditTitle({
  title,
  setTitle,
  readOnly,
  fileContent,
  setFileContent,
}: {
  title: string;
  setTitle: (title: string) => void;
  readOnly: boolean;
  fileContent: fileType;
  setFileContent: React.Dispatch<React.SetStateAction<fileType>>;
}) {
  return (
    <div className="flex-none flex gap-4 py-2">
      <Input
        type="text"
        value={title}
        className="flex-1 p-4 rounded"
        placeholder="ファイル名を入力してください"
        onChange={e => setTitle(e.target.value)}
        disabled={readOnly}
      />
      <Select
        value={fileContent.mode ?? "none"}
        onValueChange={value => {
          setFileContent({
            ...fileContent,
            mode: value === "none" ? null : (value as fileType["mode"]),
          });
        }}
        disabled={readOnly}
      >
        <SelectTrigger className="flex-none p-4 rounded w-36">
          <SelectValue placeholder="モードを選択" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">モードを選択</SelectItem>
          <SelectItem value="words">単語</SelectItem>
          <SelectItem value="phrases">フレーズ</SelectItem>
          <SelectItem value="sentences">文章</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
