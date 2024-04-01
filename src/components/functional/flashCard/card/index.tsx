import { fileType } from "@/types/fileType";
import { flashCardSettings } from "@/types/flashCardSettings";
import { useHotkeys } from "react-hotkeys-hook";
import { useSwipeable } from "react-swipeable";
import { CardMain } from "./main";
import { cardResult } from "@/types/cardResult";
import { useDisableSwiping } from "@/common/hooks/useDisableSwiping";
import { useCard } from "./useCard";
import ProgressBar from "@/components/ui-elements/ProgressBar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function FlashCard({
  fileContent,
  flashCardSettings,
  setMode,
  cardResult,
  setResults,
  setCurrentResult,
  setFileContent,
}: {
  fileContent: fileType;
  flashCardSettings: flashCardSettings;
  setMode: (mode: "home" | "cards" | "result") => void;
  cardResult: cardResult;
  setResults: React.Dispatch<React.SetStateAction<cardResult>>;
  setCurrentResult: React.Dispatch<
    React.SetStateAction<{ [problemId: string]: boolean }>
  >;
  setFileContent?: (fileContent: fileType) => void;
}) {
  useDisableSwiping();
  const { next, back, questionIndex, finish, currentProblemIdList } = useCard({
    fileContent,
    flashCardSettings,
    setMode,
    cardResult,
    setResults,
  });
  useHotkeys("right,d", next);
  useHotkeys("left,a", back);
  // const handles = useSwipeable({
  //   onSwipedLeft: () => next(),
  //   onSwipedRight: () => back(),
  //   // preventDefaultTouchmoveEvent: true,
  //   // trackMouse: true,
  // });
  const currentQuestion = fileContent.content.find(
    c => c.id === currentProblemIdList[questionIndex]
  );
  return (
    <>
      <Button
        onClick={() => window.confirm("終了しますか?") && finish()}
        className="fixed top-24 right-2"
      >
        終了する
      </Button>
      <div className="h-full p-4 w-full max-w-7xl mx-auto ">
        {currentQuestion && (
          <CardMain
            currentQuestion={currentQuestion}
            key={currentQuestion?.id}
            flashCardSettings={flashCardSettings}
            setCurrentResult={setCurrentResult}
          />
        )}
        <nav className="flex w-full max-w-7xl bottom-2 fixed p-4 right-0 left-0 mx-auto">
          <ProgressBar
            questionIndex={questionIndex}
            allQuestionCount={currentProblemIdList.length}
            next={next}
            back={back}
          />
        </nav>
      </div>
    </>
  );
}
