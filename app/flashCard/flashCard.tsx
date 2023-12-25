import { useEffect, useState } from "react";
import { fileType } from "@/@types/fileType";
import { flashCardSettings } from "@/@types/flashCardSettings";
export default function FlashCard({
  fileContent,
  flashCardSettings,
  setMode,
  setResult,
}: {
  fileContent: fileType;
  flashCardSettings: flashCardSettings;
  setMode: (mode: "home" | "cards" | "result") => void;
  setResult: Function;
}) {
  const [questionList, setQuestionList] = useState<string[]>([]); // idの配列
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  useEffect(() => {
    const idList = fileContent.content.map((c) => c.id);
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
  }, [
    fileContent.content,
    flashCardSettings.isRandom,
    flashCardSettings.questionCount,
  ]);
  function next() {
    if (questionIndex === questionList.length - 1) {
      setMode("result");
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  }
  function back() {
    if (questionIndex === 0) {
      console.error("戻れません");
    } else {
      setQuestionIndex(questionIndex - 1);
    }
  }
  const currentQuestion = fileContent.content.find(
    (c) => c.id === questionList[questionIndex]
  );
  return (
    <div className="flex-1 flex flex-col p-4 w-full max-w-7xl mx-auto gap-4">
      <CardMain
        currentQuestion={currentQuestion as fileType["content"][0]}
        key={currentQuestion?.id}
      />
      <nav className="flex-none flex items-center gap-4">
        <button onClick={back}>戻る</button>
        <div
          className="flex-1 border h-8"
          style={{
            background: `linear-gradient(to right, #dbb946 ${
              ((questionIndex + 1) / questionList.length) * 100
            }%, #f4f8f9 ${((questionIndex + 1) / questionList.length) * 100}%)`,
          }}
        >
          <p className="text-center">
            {questionIndex + 1}/{questionList.length}
          </p>
        </div>
        <button onClick={next}>次へ</button>
      </nav>
    </div>
  );
}
function CardMain({
  currentQuestion,
}: {
  currentQuestion: fileType["content"][0];
}) {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  return (
    <div className="flex-1 w-full flex flex-col gap-4 justify-center">
      <p className="text-heading-S p-4">{currentQuestion?.ja}</p>
      {isShowAnswer ? (
        <p className="text-heading-S p-4">{currentQuestion?.en}</p>
      ) : (
        <button
          className="text-heading-S w-full text-center bg-gray-100 rounded hover:bg-gray-200 p-4"
          onClick={() => setIsShowAnswer(true)}
        >
          答えを見る
        </button>
      )}
    </div>
  );
}
