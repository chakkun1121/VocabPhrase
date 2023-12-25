import { useEffect, useState } from "react";
import { fileType } from "@/@types/fileType";
import { flashCardSettings } from "@/@types/flashCardSettings";
import { IoChevronBackSharp } from "react-icons/io5";
import { useHotkeys } from "react-hotkeys-hook";
import { FaStop } from "react-icons/fa";
import { AiOutlineSound } from "react-icons/ai";
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
  useHotkeys("right", next);
  useHotkeys("left", back);

  const currentQuestion = fileContent.content.find(
    (c) => c.id === questionList[questionIndex]
  );
  return (
    <div className="flex-1 flex flex-col p-4 w-full max-w-7xl mx-auto gap-4">
      <CardMain
        currentQuestion={currentQuestion as fileType["content"][0]}
        key={currentQuestion?.id}
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
function CardMain({
  currentQuestion,
}: {
  currentQuestion: fileType["content"][0];
}) {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  useHotkeys("space", () => setIsShowAnswer(true));
  return (
    <div className="flex-1 w-full flex flex-col gap-4 justify-center  ">
      <div className="mx-auto bg-gray-100 rounded w-full grid gap-4 p-4">
        <p className="text-heading-S p-4 bg-gray-200 rounded">
          {currentQuestion?.ja}
        </p>
        <div className="flex items-center gap-4">
          {isShowAnswer ? (
            <p className="text-heading-S p-4 bg-gray-200 rounded flex-1">
              {currentQuestion?.en}
            </p>
          ) : (
            <button
              className="text-heading-S w-full text-center bg-gray-200 rounded hover:bg-gray-300 p-4 flex-1"
              onClick={() => setIsShowAnswer(true)}
            >
              答えを見る
            </button>
          )}
          <SpeechButton text={currentQuestion?.en} />
        </div>
      </div>
    </div>
  );
}
function SpeechButton({ text, lang = "en" }: { text: string; lang?: string }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  function speech() {
    stop();
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
    utterance.onend = () => setIsSpeaking(false);
  }
  function stop() {
    setIsSpeaking(false);
    speechSynthesis.cancel();
  }
  useHotkeys("s,r", () => {
    isSpeaking ? stop() : speech();
  });
  return (
    <button
      onClick={isSpeaking ? stop : speech}
      title={isSpeaking ? "停止" : "再生"}
      className="rounded-full aspect-square  bg-gray-200 hover:bg-gray-300 p-4 w-16 h-16 grid place-items-center"
    >
      {isSpeaking ? <FaStop /> : <AiOutlineSound />}
    </button>
  );
}
