import { Button } from "@/components/ui/button";
import { fileType } from "@/types/fileType";
import { useState } from "react";
import { LearnSettings } from ".";
import { cn } from "@/lib/utils";
import { useHotkeys } from "react-hotkeys-hook";

export default function Problem({
  currentProblem,
  next,
  learnSettings,
}: {
  currentProblem: fileType["content"][0];
  next: (result: boolean) => void;
  learnSettings: LearnSettings;
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isRemembered, setIsRemembered] = useState<boolean | null>(null);
  useHotkeys("1", () => next(false), [next]);
  useHotkeys("2", () => next(true), [next]);
  useHotkeys("c", () => setIsRemembered(!isRemembered));
  useHotkeys("ArrowRight", () => next(isRemembered ? false : true));
  useHotkeys("d", () => next(isRemembered ? false : true));
  useHotkeys("space", () => setShowAnswer(true));
  return (
    <div className="flex items-center p-4 h-full">
      <div className="w-full max-w-7xl mx-auto space-y-24">
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
        <div className="flex gap-4">
          <Button
            onClick={() => next(false)}
            className={cn(
              "flex-1 p-6",
              isRemembered === false && "bg-accent text-accent-foreground"
            )}
            // variant={isRemembered ? "secondary" : "outline"}
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
    </div>
  );
}
