import { useEffect, useState } from "react";
import { fileType } from "@/types/fileType";
import { flashCardSettings } from "@/types/flashCardSettings";
import { cardResult } from "@/types/cardResult";
import { createProblemIdList } from "./createProblemIdList";

export function useCard({
  fileContent,
  flashCardSettings,
  setMode,
  cardResult,
}: {
  fileContent: fileType;
  flashCardSettings: flashCardSettings;
  setMode: (mode: "home" | "cards" | "result") => void;
  cardResult: cardResult;
}) {
  // 出題順
  const [currentProblemIdList, setCurrentProblemIdList] = useState<string[]>(
    []
  );
  const [questionIndex, setQuestionIndex] = useState(0);
  useEffect(() => {
    // 初期設定
    setCurrentProblemIdList(
      createProblemIdList(fileContent, flashCardSettings, cardResult)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileContent.content]);
  function next() {
    if (questionIndex === currentProblemIdList.length - 1) {
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
    // const results = {
    //   ...cardResult,
    //   achievement: {
    //     ...cardResult.achievement,
    //     [flashCardSettings.mode]: {
    //       ...cardResult.achievement[flashCardSettings.mode],
    //       ...currentResult,
    //     },
    //   },
    // };
    // setResults(results);
  }
  return {
    next,
    back,
    questionIndex,
    finish,
    currentProblemIdList,
  };
}
