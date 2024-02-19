import { useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";

export default function ProgressBar({
  questionIndex,
  questionList,
  next,
  back,
}: {
  questionIndex: number;
  questionList: string[];
  next: () => void;
  back: () => void;
}) {
  const [showMode, setShowMode] = useState<"progress" | "percent" | "rest">(
    "progress"
  );
  return (
    <>
      <button
        onClick={back}
        className="p-2 rounded-l-full bg-gray-100 hover:bg-gray-200 w-12 h-12 flex-none grid items-center justify-center"
        title="戻る"
      >
        <IoChevronBackSharp />
      </button>
      <div
        className="flex-1 h-12 flex items-center justify-center"
        style={{
          background: `linear-gradient(to right, #dbb946 ${
            ((questionIndex + 1) / questionList.length) * 100
          }%, #f4f8f9 ${((questionIndex + 1) / questionList.length) * 100}%)`,
        }}
      >
        <button
          className="text-center select-none"
          onClick={() =>
            setShowMode((showMode) =>
              showMode == "progress"
                ? "percent"
                : showMode == "percent"
                ? "rest"
                : "progress"
            )
          }
        >
          {showMode === "progress" &&
            `${questionIndex + 1}/${questionList.length}`}
          {showMode === "percent" &&
            `${Math.round(((questionIndex + 1) / questionList.length) * 100)}%`}
          {showMode === "rest" &&
            `残り${questionList.length - questionIndex - 1}問`}
        </button>
      </div>
      <button
        onClick={next}
        className="p-2 rounded-r-full bg-gray-100 hover:bg-gray-200 w-12 h-12 grid items-center justify-center flex-none"
        title="次へ"
      >
        <IoChevronBackSharp className="transform rotate-180" />
      </button>
    </>
  );
}
