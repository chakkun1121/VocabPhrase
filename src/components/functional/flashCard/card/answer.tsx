import { fileType } from "@/types/fileType";
import { useState } from "react";
import SpeechButton from "./speechButton";
import { useHotkeys } from "react-hotkeys-hook";
import { flashCardSettings } from "@/types/flashCardSettings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Answer({
  currentQuestion,
  flashCardSettings,
  setIsRight,
}: {
  currentQuestion: fileType["content"][0];
  flashCardSettings: flashCardSettings;
  setIsRight: (r: boolean) => void;
}) {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const [inputAnswer, setInputAnswer] = useState<string>(""); // キーボードで解答するときの入力値
  useHotkeys("space", () => setIsShowAnswer(true));
  function answer() {
    if (isShowAnswer || !flashCardSettings.isAnswerWithKeyboard) return;
    setIsShowAnswer(true);
    inputAnswer == currentQuestion?.ja ? setIsRight(true) : setIsRight(false);
  }
  useHotkeys("ctrl+enter", answer, {
    enabled: flashCardSettings.isAnswerWithKeyboard,
    enableOnFormTags: true,
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
      <div className="flex items-center gap-4 w-full">
        {isShowAnswer ? (
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
        ) : (
          <Button
            className="md:text-2xl w-full h-full text-center flex-1 p-4"
            onClick={() => setIsShowAnswer(true)}
          >
            {flashCardSettings.isAnswerWithKeyboard ? "解答する" : "答えを見る"}
          </Button>
        )}
        {flashCardSettings.mode == "ja-en" && (
          <SpeechButton text={currentQuestion?.en} />
        )}
      </div>
    </>
  );
}
