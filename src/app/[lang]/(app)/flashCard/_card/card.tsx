import { fileType } from "@/types/fileType";
import { flashCardSettings } from "@/types/flashCardSettings";
import { useHotkeys } from "react-hotkeys-hook";
import { useSwipeable } from "react-swipeable";
import { CardMain } from "./main";
import { cardResult } from "@/types/cardResult";
import ProgressBar from "../../../../../components/ui-elements/ProgressBar";
import { useDisableSwiping } from "@/common/hooks/useDisableSwiping";
import { useCard } from "./useCard";

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
  useDisableSwiping();
  const {
    next,
    back,
    questionList,
    questionIndex,
    checked,
    setIsChecked,
    finish,
  } = useCard({
    fileContent,
    flashCardSettings,
    setMode,
    cardResult,
    setResults,
    setCurrentProblemIdList,
  });
  useHotkeys("right,d", next);
  useHotkeys("left,a", back);
  const handles = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => back(),
    // preventDefaultTouchmoveEvent: true,
    // trackMouse: true,
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
