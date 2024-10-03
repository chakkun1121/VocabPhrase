import { fileType } from "@/types/fileType";
import type { Result } from ".";
import { cardResult } from "@/types/cardResult";
import { updateResults } from "@/common/library/updateResults";
import { useEffect } from "react";
import { toast } from "sonner";
import { flashCardMode } from "@/types/flashCardSettings";
import { Button } from "@/components/ui/button";

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
        await saveResults(newResult);
        toast.success("結果を保存しました");
      } catch (e: any) {
        console.error(e);
        toast.error(`エラーが発生しました\n${e.message}`);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {Object.entries(currentResult).map(([id, { isCorrectOnce }]) => {
        const problem = fileContent.content.find(c => c.id === id);
        return (
          <div key={id}>
            <h1>{problem?.en}</h1>
            <p>{problem?.ja}</p>
            <p>{isCorrectOnce ? "覚えた" : "覚えていない"}</p>
          </div>
        );
      })}
      <Button onClick={next}>次のターン</Button>
    </div>
  );
}
