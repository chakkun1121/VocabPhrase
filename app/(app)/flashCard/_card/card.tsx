import { useEffect, useState } from "react";
import { fileType } from "@/@types/fileType";
import { flashCardSettings } from "@/@types/flashCardSettings";
import { IoChevronBackSharp } from "react-icons/io5";
import { useHotkeys } from "react-hotkeys-hook";
import { useSwipeable } from "react-swipeable";
import { CardMain } from "./main";
import { cardResult } from "@/@types/cardResult";

export default function FlashCard({
  fileContent,
  flashCardSettings,
  setMode,
  cardResult,
  setResults,
  setCurrentProblemIdList,
}: {
  fileContent: fileType;
  flashCardSettings: flashCardSettings;
  setMode: (mode: "home" | "cards" | "result") => void;
  cardResult: cardResult;
  setResults: React.Dispatch<React.SetStateAction<cardResult>>;
  setCurrentProblemIdList: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [questionList, setQuestionList] = useState<string[]>([]); // idの配列
  const [questionIndex, setQuestionIndex] = useState<number>(0); // 現在の問題のindex
  const [checked, setIsChecked] = useState<cardResult["check"]["en2ja"]>(
    cardResult.check?.[flashCardSettings.mode]
  );

  useEffect(() => {
    // 初期設定
    let idList = fileContent.content.map((c) => c.id);
    let questionList: string[] = [];
    if (flashCardSettings.removeChecked) {
      const checkedList = cardResult.check?.[flashCardSettings.mode]?.map(
        (v) => v.id
      );
      idList = idList.filter((id) => !checkedList?.includes(id));
    }
    if (flashCardSettings.isRandom) {
      const randomSectionList = idList.sort(() => Math.random() - 0.5);
      questionList = randomSectionList.slice(
        0,
        flashCardSettings.questionCount || idList.length
      );
      setQuestionList(questionList);
    } else {
      questionList = idList;
      setQuestionList(questionList);
    }
    setCurrentProblemIdList(questionList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fileContent.content,
    flashCardSettings.isRandom,
    flashCardSettings.questionCount,
    flashCardSettings.removeChecked,
  ]);
  function next() {
    if (questionIndex === questionList.length - 1) {
      finish();
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  }
  function back() {
    if (questionIndex === 0) {
    } else {
      setQuestionIndex(questionIndex - 1);
    }
  }
  function finish() {
    setMode("result");
    setResults((prev: cardResult) => ({
      ...prev,
      check: {
        ...prev.check,
        [flashCardSettings.mode]: checked,
      },
    }));
  }
  useHotkeys("right", next);
  useHotkeys("left", back);
  const handles = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => back(),
    // preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const currentQuestion = fileContent.content.find(
    (c) => c.id === questionList[questionIndex]
  );

  return (
    <div
      className="flex-1 flex flex-col p-4 w-full max-w-7xl mx-auto gap-4"
      {...handles}
    >
      {currentQuestion && (
        <CardMain
          currentQuestion={currentQuestion as fileType["content"][0]}
          key={currentQuestion?.id}
          isChecked={
            checked?.find((v) => v.id == currentQuestion.id)?.checked ?? false
          }
          setIsChecked={(isChecked: boolean) => {
            setIsChecked((prev) => [
              ...(prev?.filter((v) => v.id !== currentQuestion.id) ?? []),
              { id: currentQuestion?.id, checked: isChecked },
            ]);
          }}
          mode={flashCardSettings.mode}
          isAnswerWithKeyboard={flashCardSettings.isAnswerWithKeyboard}
        />
      )}
      <nav className="flex-none flex items-stretch gap-4">
        <button
          onClick={back}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 aspect-square"
          title="戻る"
        >
          <IoChevronBackSharp />
        </button>
        <div
          className="flex-1 border p-2 rounded flex items-center justify-center"
          style={{
            background: `linear-gradient(to right, #dbb946 ${
              ((questionIndex + 1) / questionList.length) * 100
            }%, #f4f8f9 ${((questionIndex + 1) / questionList.length) * 100}%)`,
          }}
        >
          <p className="text-center select-none">
            {questionIndex + 1}/{questionList.length}
          </p>
        </div>
        <button
          onClick={next}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 aspect-square"
          title="次へ"
        >
          <IoChevronBackSharp className="transform rotate-180" />
        </button>
      </nav>
    </div>
  );
}
