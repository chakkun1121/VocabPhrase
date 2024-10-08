import { Button } from "@/components/ui/button";
import { fileType } from "@/types/fileType";
import { useState } from "react";
import { LearnSettings, Result } from ".";
import { cn } from "@/lib/utils";
import { useHotkeys } from "react-hotkeys-hook";

export default function Problem({
  problemList,
  currentResult,
  currentProblem,
  next,
  learnSettings,
}: {
  problemList?: string[];
  currentResult: Result;
  currentProblem: fileType["content"][0];
  next: (result: boolean) => void;
  learnSettings: LearnSettings;
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isRemembered, setIsRemembered] = useState<boolean | null>(null);
  useHotkeys("1", () => next(false), { enabled: showAnswer }, [next]);
  useHotkeys("2", () => next(true), { enabled: showAnswer }, [next]);
  useHotkeys("c", () => setIsRemembered(!isRemembered), {
    enabled: showAnswer,
  });
  useHotkeys("ArrowRight", () => next(isRemembered ? false : true), {
    enabled: showAnswer,
  });
  useHotkeys("d", () => next(isRemembered ? false : true), {
    enabled: showAnswer,
  });
  useHotkeys("space", () => setShowAnswer(true));
  const remindingProblems = (problemList || []).filter(
    id => !currentResult[id]?.isFinished
  );
  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-24 h-full">
      <div className="relative w-fill h-4 rounded-full bg-primary-foreground">
        <div
          className="absolute inset-x-0 left-0 bg-primary rounded-full h-full"
          style={{
            width: `${100 - remindingProblems.length * 10}%`,
          }}
        />
      </div>
      <div className="space-y-4">
        <p className="text-2xl p-4 block w-full h-full">
          {learnSettings.mode == "ja-en"
            ? currentProblem?.ja
            : currentProblem?.en}
        </p>
        {showAnswer ? (
          <p className="text-2xl p-4 block w-full h-full">
            {learnSettings.mode == "ja-en"
              ? currentProblem?.en
              : currentProblem?.ja}
          </p>
        ) : (
          <Button
            className="text-2xl p-4 w-full h-full"
            onClick={() => setShowAnswer(true)}>
            答えを見る
          </Button>
        )}
      </div>
      <div className="flex fixed bottom-8 w-full max-w-7xl gap-4 mx-auto">
        <Button
          onClick={() => next(false)}
          className={cn(
            "flex-1 p-6",
            isRemembered === false && "bg-accent text-accent-foreground"
          )}
          variant="outline"
          disabled={!showAnswer}>
          覚えていない
        </Button>
        <Button
          onClick={() => next(true)}
          className={cn(
            "flex-1 p-6",
            isRemembered && "bg-accent text-accent-foreground"
          )}
          variant="outline"
          disabled={!showAnswer}>
          覚えた
        </Button>
      </div>
    </div>
  );
}
