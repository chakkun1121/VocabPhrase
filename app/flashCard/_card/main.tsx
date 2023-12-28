import React, {
  ButtonHTMLAttributes,
  ClassAttributes,
  JSX,
  useState,
} from "react";
import { fileType } from "@/@types/fileType";
import { useHotkeys } from "react-hotkeys-hook";
import { SpeechButton } from "./speechButton";

export function CardMain({
  currentQuestion,
  currentAchievement,
  currentResult,
  setCurrentResult,
}: {
  currentQuestion: fileType["content"][0];
  currentAchievement: boolean;
  currentResult: boolean | undefined;
  setCurrentResult: (result: boolean) => void;
}) {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  useHotkeys("space", () => setIsShowAnswer(true));
  useHotkeys(
    "c",
    () => {
      setCurrentResult(!currentResult);
    },
    {
      enabled: isShowAnswer,
    }
  );
  return (
    <div className="flex-1 w-full flex flex-col gap-4 justify-center  ">
      <div className="mx-auto bg-gray-100 rounded w-full grid gap-4 p-4">
        <p className="md:text-heading-S p-4 bg-gray-200 rounded">
          {currentQuestion?.ja}
        </p>
        <div className="flex items-center gap-4">
          {isShowAnswer ? (
            <p className="md:text-heading-S p-4 bg-gray-200 rounded flex-1">
              {currentQuestion?.en}
            </p>
          ) : (
            <button
              className="md:text-heading-S w-full text-center bg-gray-200 rounded hover:bg-gray-300 p-4 flex-1"
              onClick={() => setIsShowAnswer(true)}
            >
              答えを見る
            </button>
          )}
          <CheckBox
            disabled={!isShowAnswer}
            checked={currentAchievement}
            onChange={(e) =>
              setCurrentResult((e.target as HTMLInputElement).checked)
            }
          />
          <SpeechButton text={currentQuestion?.en} />
        </div>
      </div>
    </div>
  );
}
function CheckBox(
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  const { className, ...rest } = props;
  return (
    <input
      type="checkbox"
      className={`${className} aspect-square bg-gray-200 hover:bg-gray-300 w-12 h-12 rounded-full border-none`}
      {...rest}
    />
  );
}
