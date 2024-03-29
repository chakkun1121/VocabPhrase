import { fileType } from "@/types/fileType";
import SpeechButton from "./speechButton";
import Answer from "./answer";
import { flashCardSettings } from "@/types/flashCardSettings";
import { set } from "zod";

export function CardMain({
  currentQuestion,
  flashCardSettings,
  setCurrentResult,
}: {
  currentQuestion: fileType["content"][0];
  flashCardSettings: flashCardSettings;
  setCurrentResult: React.Dispatch<
    React.SetStateAction<{ [problemId: string]: boolean }>
  >;
}) {
  function setIsRight(r: boolean) {
    setCurrentResult(prev => {
      return {
        ...prev,
        [currentQuestion.id]: r,
      };
    });
  }
  return (
    <div className="w-full flex flex-col gap-4 justify-center fixed inset-0 m-auto p-4 max-w-7xl">
      <div className="mx-auto w-full grid gap-4 p-4">
        <div className="flex items-center gap-4">
          <p className="md:text-2xl p-4 flex-1 !select-text">
            {flashCardSettings.mode == "ja-en"
              ? currentQuestion?.ja
              : currentQuestion?.en}
          </p>
          {flashCardSettings.mode == "en-ja" && (
            <SpeechButton text={currentQuestion?.en} />
          )}
        </div>
        <Answer
          currentQuestion={currentQuestion}
          flashCardSettings={flashCardSettings}
          setIsRight={setIsRight}
        />
      </div>
    </div>
  );
}
