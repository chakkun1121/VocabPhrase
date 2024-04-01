import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { cardResult } from "@/types/cardResult";
import { fileType } from "@/types/fileType";
import { flashCardMode } from "@/types/flashCardSettings";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";
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
    header: "No.",
  },
  {
    accessorKey: "question",
    header: "問題",
  },
  {
    accessorKey: "answer",
    header: "答え",
  },
  {
    accessorKey: "result",
    header: "正誤",
    cell: ({ row }) => (row.getValue("result") ? "○" : "×"),
  },
  {
    accessorKey: "achievement",
    header: "達成度",
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
  saveResults: () => void;
}) {
  useEffect(() => {
    /* achievementについて
    0: まだ一度もやっていない(ここで正解したら90へ)
    10 : 一回はやった(正解する事に+20)
    20~80: 正解する事に+20
    90: これが今のチェック状態(間違えたら-10)
    90以降は開けておく
    */
    // 今回分の結果を全体の結果とマージ
    setResults(prev => {
      return {
        ...prev,
        achievement: {
          ...prev.achievement,
          [mode]: {
            ...prev?.achievement?.[mode],
            ...Object.fromEntries(
              Object.entries(currentResult).map(([key, value]) => {
                const prevResult = prev?.achievement?.[mode]?.[key] || 0;
                if (prevResult === 0 && value) {
                  return [key, 90];
                }
                return [
                  key,
                  value
                    ? Math.min(prevResult + 20, 90)
                    : Math.max(prevResult - 10, 10),
                ];
              })
            ),
          },
        },
      };
    });
    saveResults();
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
          const data: ShowResult[] = Object.entries(currentResult).map(
            ([key, value], index) => {
              const currentContent = fileContent.content.find(
                content => content.id === key
              );
              return {
                id: key,
                index: index + 1,
                question:
                  mode == "en-ja" ? currentContent?.en : currentContent?.ja,
                answer:
                  mode == "en-ja" ? currentContent?.ja : currentContent?.en,
                result: value,
                achievement: results?.achievement?.[mode]?.[key] || 0,
              };
            }
          );
          console.log(data);
          return data;
        })()}
      />
    </div>
  );
}
