import { fileType } from "@/types/fileType";
import { SpeechButton } from "./speechButton";
import Answer from "./answer";
import { flashCardMode } from "@/types/flashCardSettings";

export function CardMain({
  currentQuestion,
  isChecked,
  setIsChecked,
  mode,
  isAnswerWithKeyboard,
}: {
  currentQuestion: fileType["content"][0];
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
  mode: flashCardMode;
  isAnswerWithKeyboard: boolean;
}) {
  return (
    <div className="w-full flex flex-col gap-4 justify-center fixed inset-0 m-auto p-4 max-w-7xl">
      <div className="mx-auto bg-gray-100 rounded w-full grid gap-4 p-4">
        <div className="flex items-center gap-4">
          <p className="md:text-heading-S p-4 bg-gray-200 rounded flex-1 !select-text">
            {mode == "ja-en" ? currentQuestion?.ja : currentQuestion?.en}
          </p>
          {mode == "en-ja" && <SpeechButton text={currentQuestion?.en} />}
        </div>
        <Answer
          mode={mode}
          currentQuestion={currentQuestion}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          isAnswerWithKeyboard={isAnswerWithKeyboard}
        />
      </div>
    </div>
  );
}
