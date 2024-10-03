import { fileType } from "@/types/fileType";
import { LearnSettings, Result } from ".";
import { cardResult } from "@/types/cardResult";
import React, { useEffect, useState } from "react";
import { createProblemIdList } from "../flashCard/card/createProblemIdList";
import Problem from "./problem";

export default function Main({
  fileContent,
  setMode,
  learnSettings,
  cardResult,
  currentResult,
  setCurrentResult,
}: {
  fileContent: fileType;
  setMode: (mode: "result") => void;
  learnSettings: LearnSettings;
  cardResult: cardResult;
  currentResult: Result;
  setCurrentResult: React.Dispatch<React.SetStateAction<Result>>;
}) {
  const [problemList, setProblemList] = useState<string[]>(); //問題の配列
  const [currentProblemId, setCurrentProblemId] = useState<string>(); //現在の問題のID
  const currentProblem = fileContent.content.find(
    c => c.id === currentProblemId
  );

  useEffect(() => {
    const list = createProblemIdList(
      fileContent,
      { ...learnSettings, isRandom: true, efficiencyMode: true },
      cardResult
    ).slice(0, 10);
    setProblemList(list);
    setCurrentProblemId(random(list));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function next(result: boolean) {
    if (result) {
      if (!currentResult?.[currentProblemId!]?.isCorrectOnce) {
        setCurrentResult({
          ...currentResult,
          [currentProblemId!]: { isFinished: true, isCorrectOnce: true },
        });
      }
      setCurrentResult({
        ...currentResult,
        [currentProblemId!]: { isFinished: true, isCorrectOnce: false },
      });
    } else if (result === false) {
      setCurrentResult({
        ...currentResult,
        [currentProblemId!]: { isFinished: false, isCorrectOnce: false },
      });
    }
    const remindIds = problemList?.filter(
      id => !currentResult?.[id]?.isFinished
    );
    if (!remindIds || remindIds?.length === 0) {
      setMode("result");
    } else {
      setCurrentProblemId(random(remindIds));
    }
  }
  if (!currentProblem) return <div>loading...</div>;
  return (
    <Problem
      currentProblem={currentProblem}
      key={currentProblem?.id}
      next={next}
      learnSettings={learnSettings}
    />
  );
}
function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
