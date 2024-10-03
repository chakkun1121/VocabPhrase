import { Button } from "@/components/ui/button";
import { fileType } from "@/types/fileType";
import { useState } from "react";
import { LearnSettings } from ".";

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
        <div className="flex gap-2">
          <Button
            onClick={() => next(false)}
            className="flex-1 p-4"
            variant="outline">
            覚えていない
          </Button>
          <Button
            onClick={() => next(true)}
            className="flex-1 p-4"
            variant="outline">
            覚えた
          </Button>
        </div>
      </div>
    </div>
  );
}
