import { useEffect, useState } from "react";
import { fileType } from "@/types/fileType";
import { flashCardSettings } from "@/types/flashCardSettings";
import { useHotkeys } from "react-hotkeys-hook";
import { useSwipeable } from "react-swipeable";
import { CardMain } from "./main";
import { cardResult } from "@/types/cardResult";
import ProgressBar from "../../../../../components/ui-elements/ProgressBar";

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
  const [checked, setIsChecked] = useState<string[]>(
    cardResult.check?.[flashCardSettings.mode] ?? []
  );

  useEffect(() => {
    // 初期設定
    let idList = fileContent.content.map(c => c.id);
    let questionList: string[] = [];
    if (flashCardSettings.removeChecked) {
      idList = idList.filter(id => !checked?.includes(id));
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
    const results = {
      ...cardResult,
      check: { ...cardResult.check, [flashCardSettings.mode]: checked },
    };
    setResults(results);
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
    c => c.id === questionList[questionIndex]
  );
  return (
    <>
      <button
        onClick={() => window.confirm("中断しますか？") && finish()}
        className="bg-gray-100 hover:bg-red-200 fixed top-24 right-2 p-2 rounded"
      >
        中断する
      </button>
      <div className="h-full p-4 w-full max-w-7xl mx-auto " {...handles}>
        {currentQuestion && (
          <CardMain
            currentQuestion={currentQuestion as fileType["content"][0]}
            key={currentQuestion?.id}
            isChecked={!!checked?.find(v => v == currentQuestion.id) ?? false}
            setIsChecked={(isChecked: boolean) => {
              setIsChecked(prev => [
                ...prev.filter(v => v !== currentQuestion.id),
                ...(isChecked ? [currentQuestion.id] : []),
              ]);
            }}
            mode={flashCardSettings.mode}
            isAnswerWithKeyboard={flashCardSettings.isAnswerWithKeyboard}
          />
        )}
        <nav className="flex w-full max-w-7xl bottom-2 fixed p-4 right-0 left-0 mx-auto">
          <ProgressBar
            questionIndex={questionIndex}
            questionList={questionList}
            next={next}
            back={back}
          />
        </nav>
      </div>
    </>
  );
}
