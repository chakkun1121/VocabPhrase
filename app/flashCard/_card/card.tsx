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
  achievement,
  setResults,
}: {
  fileContent: fileType;
  flashCardSettings: flashCardSettings;
  setMode: (mode: "home" | "cards" | "result") => void;
  achievement: { id: string; achievement: boolean }[];
  setResults: React.Dispatch<React.SetStateAction<cardResult>>;
}) {
  const [questionList, setQuestionList] = useState<string[]>([]); // idの配列
  const [questionIndex, setQuestionIndex] = useState<number>(0); // 現在の問題のindex
  const [currentResult, setCurrentResult] = useState<
    cardResult["results"][0]["cardsResult"]
  >([]); // とき終わった問題の結果を入れる
  const [isRightCurrent, setIsRightCurrent] = useState<boolean>(false); // 現在の問題が正解かどうか
  
  useEffect(() => {
    // 初期設定
    let idList = fileContent.content.map((c) => c.id);
    if (flashCardSettings.removeChecked) {
      const checkedList = achievement
        .filter((a) => a.achievement)
        .map((a) => a.id);
      idList = idList.filter((id) => !checkedList.includes(id));
      
      
    }
    if (flashCardSettings.isRandom) {
      const randomSectionList = idList.sort(() => Math.random() - 0.5);
      setQuestionList(
        randomSectionList.slice(
          0,
          flashCardSettings.questionCount || idList.length
        )
      );
    } else {
      setQuestionList(idList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fileContent.content,
    flashCardSettings.isRandom,
    flashCardSettings.questionCount,
    flashCardSettings.removeChecked,
  ]);
  function next() {
    //  結果に今のIDの問題がなければ追加
    if (!currentResult.find((c) => c.id === questionList[questionIndex])) {
      setCurrentResult((prev) => [
        ...prev,
        { id: questionList[questionIndex], result: false },
      ]);
    }
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
      results: [
        { date: new Date().toISOString(), cardsResult: currentResult },
        ...prev.results,
      ],
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
  ) as fileType["content"][0];

  return (
    <div
      className="flex-1 flex flex-col p-4 w-full max-w-7xl mx-auto gap-4"
      {...handles}
    >
      <CardMain
        currentQuestion={currentQuestion as fileType["content"][0]}
        key={currentQuestion?.id}
        isChecked={
          currentResult.find((c) => c.id === currentQuestion?.id)?.result ??
          achievement.find((a) => a.id === currentQuestion?.id)?.achievement ??
          false
        }
        setIsChecked={(isChecked: boolean) => {
          const newResult = currentResult.filter(
            (c) => c.id !== currentQuestion?.id
          );
          setCurrentResult(() => [
            ...newResult,
            { id: currentQuestion?.id, result: isChecked },
          ]);
        }}
      />
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
