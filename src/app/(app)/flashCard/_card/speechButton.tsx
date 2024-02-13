import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { FaStop } from "react-icons/fa";
import { AiOutlineSound } from "react-icons/ai";

export function SpeechButton({
  text,
  lang = "en",
}: {
  text: string;
  lang?: string;
}) {
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
