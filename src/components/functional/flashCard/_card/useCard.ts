import { useEffect, useState } from "react";
import { fileType } from "@/types/fileType";
import { flashCardSettings } from "@/types/flashCardSettings";
import { cardResult } from "@/types/cardResult";

export function useCard({
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
  return {
    next,
    back,
    questionList,
    questionIndex,
    checked,
    setIsChecked,
    finish,
  };
}
