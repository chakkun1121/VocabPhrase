import React, { useState } from "react";
import { fileType } from "@/@types/fileType";
import { useHotkeys } from "react-hotkeys-hook";
import { SpeechButton } from "./speechButton";

export function CardMain({
  currentQuestion,
  isChecked,
  setIsChecked,
  mode,
}: {
  currentQuestion: fileType["content"][0];
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
  mode: "en2ja" | "ja2en";
}) {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  useHotkeys("space", () => setIsShowAnswer(true));
  useHotkeys("c", () => setIsChecked(!isChecked), {
    enabled: isShowAnswer,
  });
  return (
    <div className="flex-1 w-full flex flex-col gap-4 justify-center  ">
      <div className="mx-auto bg-gray-100 rounded w-full grid gap-4 p-4">
        <div className="flex items-center gap-4">
          <p className="md:text-heading-S p-4 bg-gray-200 rounded flex-1">
            {mode == "en2ja" ? currentQuestion?.ja : currentQuestion?.en}
          </p>
          {mode == "ja2en" && <SpeechButton text={currentQuestion?.en} />}
        </div>
        <div className="flex items-center gap-4">
          {isShowAnswer ? (
            <p className="md:text-heading-S p-4 bg-gray-200 rounded flex-1">
              {mode == "en2ja" ? currentQuestion?.en : currentQuestion?.ja}
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
            checked={isChecked}
            onChange={(e) =>
              setIsChecked((e.target as HTMLInputElement).checked)
            }
          />
          {mode == "en2ja" && <SpeechButton text={currentQuestion?.en} />}
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
