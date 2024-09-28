import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { cardResult } from "@/types/cardResult";
import { fileType } from "@/types/fileType";
import { flashCardMode } from "@/types/flashCardSettings";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";
import { updateResults } from "../../../../common/library/updateResults";
import { toast } from "sonner";
type ShowResult = {
  id: string;
  index: number;
  question?: string;
  answer?: string;
  result: boolean;
  achievement: number;
};
const columns: ColumnDef<ShowResult>[] = [
  {
    accessorKey: "index",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          No.
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "question",
    header: "問題",
  },
  {
    accessorKey: "answer",
    header: "解答",
  },
  {
    accessorKey: "result",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          正誤
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) =>
      (() => {
        switch (row.getValue("result")) {
          case true:
            return "○";
          case false:
            return "✕";
          default:
            return "-";
        }
      })(),
  },
  {
    accessorKey: "achievement",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          達成度
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
export default function CardResult({
  fileContent,
  results,
  mode,
  currentResult,
  setResults,
  saveResults,
}: {
  fileContent: fileType;
  results: cardResult;
  mode: flashCardMode;
  currentResult: { [problemId: string]: boolean };
  setResults: React.Dispatch<React.SetStateAction<cardResult>>;
  saveResults: (newResult?: cardResult) => void;
}) {
  useEffect(() => {
    try {
      const newResult = updateResults(results, currentResult, mode);
      setResults(newResult);
      saveResults(newResult);
      toast.success("結果を保存しました");
    } catch (e: any) {
      console.error(e);
      toast.error(`エラーが発生しました\n${e.message}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="grid p-4 w-full max-w-7xl mx-auto gap-4">
      <nav className="flex-none flex gap-4">
        <Button onClick={() => window.location.reload()}>もう一度</Button>
      </nav>
      <DataTable
        columns={columns}
        data={(() => {
          const data: ShowResult[] = fileContent.content.map(
            (content, index) => {
              return {
                id: content.id,
                index: index + 1,
                question: mode == "en-ja" ? content.en : content.ja,
                answer: mode == "en-ja" ? content.ja : content.en,
                result: currentResult[content.id],
                achievement: results?.achievement?.[mode]?.[content.id] || 0,
              };
            }
            // Object.entries(currentResult).map(
            // ([key, value], index) => {
            //   const currentContent = fileContent.content.find(
            //     content => content.id === key
            //   );
            //   return {
            //     id: key,
            //     index: index + 1,
            //     question:
            //       mode == "en-ja" ? currentContent?.en : currentContent?.ja,
            //     answer:
            //       mode == "en-ja" ? currentContent?.ja : currentContent?.en,
            //     result: value,
            //     achievement: results?.achievement?.[mode]?.[key] || 0,
            //   };
            // }
          );

          return data;
        })()}
      />
    </div>
  );
}
