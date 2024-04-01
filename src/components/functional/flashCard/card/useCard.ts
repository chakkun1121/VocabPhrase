import { useEffect, useState } from "react";
import { fileType } from "@/types/fileType";
import { flashCardSettings } from "@/types/flashCardSettings";
import { cardResult } from "@/types/cardResult";

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
    const problemIdList = fileContent.content.map(c => c.id);
    // 1.範囲設定があれば配列を切る
    // if (flashCardSettings.range) {
    //   const [start, end] = flashCardSettings.range;
    //   problemIdList.splice(end);
    //   problemIdList.splice(0, start);
    // }
    // 2. ランダム設定の場合は混ぜる
    if (flashCardSettings.isRandom) {
      problemIdList.sort(() => Math.random() - 0.5);
    }
    // 3.achievementの値を小さい順に
    if (flashCardSettings.efficiencyMode) {
      problemIdList.sort(
        (a, b) =>
          (cardResult?.achievement?.[flashCardSettings.mode]?.[a] ?? 0) -
          (cardResult?.achievement?.[flashCardSettings.mode]?.[b] ?? 0)
      );
    }
    setCurrentProblemIdList(problemIdList);
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
