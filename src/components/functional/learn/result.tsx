import { Button } from "@/components/ui/button";
// import { DataTable } from "@/components/ui/data-table";
import { cardResult } from "@/types/cardResult";
import { fileType } from "@/types/fileType";
import { flashCardMode } from "@/types/flashCardSettings";
// import { CaretSortIcon } from "@radix-ui/react-icons";
// import { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";
import { toast } from "sonner";
import type { Result } from ".";
import { updateResults } from "@/common/library/updateResults";
import { useHotkeys } from "react-hotkeys-hook";
import { ColumnDef } from "@tanstack/react-table";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { DataTable } from "@/components/ui/data-table";

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
export default function Result({
  fileContent,
  currentResult,
  results,
  setResults,
  mode,
  saveResults,
  next,
}: {
  fileContent: fileType;
  currentResult: Result;
  results: cardResult;
  setResults: React.Dispatch<React.SetStateAction<cardResult>>;
  mode: flashCardMode;
  saveResults: (newResult?: cardResult) => Promise<void>;
  next: () => void;
}) {
  useEffect(() => {
    (async () => {
      try {
        const newResult = updateResults(
          results,
          Object.fromEntries(
            Object.entries(currentResult).map(([key, v]) => [
              key,
              v.isCorrectOnce,
            ])
          ),
          mode
        );
        setResults(newResult);
        console.log("newResult: ", newResult);
        await saveResults(newResult);
        toast.success("結果を保存しました");
      } catch (e: any) {
        console.error(e);
        toast.error(`エラーが発生しました\n${e.message}`);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useHotkeys("*", next, [next]);
  return (
    <div className="max-w-7xl p-4 mx-auto w-full space-y-4">
      <Button onClick={next} className="w-full">
        次のターン(なにかのキーを押して続行)
      </Button>
      <DataTable
        columns={columns}
        data={(() => {
          const data: ShowResult[] = Object.entries(currentResult).map(
            ([id, { isCorrectOnce }], index) => {
              const problem = fileContent.content.find(c => c.id === id);
              return {
                id,
                index: index + 1,
                question: problem?.en,
                answer: problem?.ja,
                result: isCorrectOnce,
                achievement:
                  results.achievement?.[
                    mode as keyof typeof results.achievement
                  ]?.[id] || 0,
              };
            }
          );
          return data;
        })()}
      />
    </div>
  );
}
