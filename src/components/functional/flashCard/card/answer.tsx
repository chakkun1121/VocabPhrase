import { fileType } from "@/types/fileType";
import { useEffect, useState } from "react";
import SpeechButton from "./speechButton";
import { useHotkeys } from "react-hotkeys-hook";
import { flashCardSettings } from "@/types/flashCardSettings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Answer({
  currentQuestion,
  flashCardSettings,
  isRight,
  setIsRight,
}: {
  currentQuestion: fileType["content"][0];
  flashCardSettings: flashCardSettings;
  isRight: boolean;
  setIsRight: (r: boolean) => void;
}) {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const [inputAnswer, setInputAnswer] = useState<string>(""); // キーボードで解答するときの入力値
  useHotkeys("space", () => setIsShowAnswer(true));
  const answer =
    currentQuestion?.[flashCardSettings.mode == "ja-en" ? "en" : "ja"];
  function showAnswer() {
    if (isShowAnswer || !flashCardSettings.isAnswerWithKeyboard) return;
    setIsShowAnswer(true);
    setIsRight(inputAnswer === answer);
  }
  useHotkeys("ctrl+enter", showAnswer, {
    enabled: flashCardSettings.isAnswerWithKeyboard,
    enableOnFormTags: true,
  });
  useHotkeys("c", () => setIsRight(true), {
    enabled: isShowAnswer && !flashCardSettings.isAnswerWithKeyboard,
  });

  return (
    <>
      {flashCardSettings.isAnswerWithKeyboard && (
        <>
          {isShowAnswer ? (
            <div className="flex items-center gap-4 w-full">
              <p className="md:text-2xl p-4 flex-1 !select-text opacity-80">
                {inputAnswer}
              </p>
              <p className="md:text-2xl text-center p-4 flex-none !select-text">
                {inputAnswer == currentQuestion.en ? "◯" : "✕"}
              </p>
            </div>
          ) : (
            <Input
              type="text"
              className="md:text-2xl w-full p-4 h-auto"
              autoFocus
              value={inputAnswer}
              onChange={e => setInputAnswer(e.target.value)}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              disabled={isShowAnswer}
            />
          )}
        </>
      )}
      <div className="flex md:items-center gap-4 w-full flex-col md:flex-row">
        {isShowAnswer ? (
          <>
            <p
              className={cn(
                "md:text-2xl p-4 flex-1 !select-text",
                flashCardSettings.isAnswerWithKeyboard && "text-red-500"
              )}
            >
              {flashCardSettings.mode == "ja-en"
                ? currentQuestion?.en
                : currentQuestion?.ja}
            </p>
            <div className="flex-none flex md:text-2xl gap-0 content-center md:content-none">
              <div>
                <input
                  type="radio"
                  value="true"
                  id="correct-true"
                  className="sr-only peer"
                  name="correct"
                  onChange={() => setIsRight(true)}
                  checked={isRight}
                />
                <label
                  className="w-full h-full p-4 rounded border peer-checked:bg-green-300 block"
                  htmlFor="correct-true"
                >
                  ◯
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  value="false"
                  className="sr-only peer"
                  name="correct"
                  onChange={() => setIsRight(false)}
                  id="correct-false"
                  checked={!isRight}
                />
                <label
                  className="w-full h-full p-4 rounded border peer-checked:bg-green-300 block"
                  htmlFor="correct-false"
                >
                  ✕
                </label>
              </div>
              {flashCardSettings.mode == "ja-en" && (
                <SpeechButton text={currentQuestion?.en} />
              )}
            </div>
          </>
        ) : (
          <Button
            className="md:text-2xl w-full h-full text-center flex-1 p-4"
            onClick={() => setIsShowAnswer(true)}
          >
            {flashCardSettings.isAnswerWithKeyboard ? "解答する" : "答えを見る"}
          </Button>
        )}
      </div>
    </>
  );
}
