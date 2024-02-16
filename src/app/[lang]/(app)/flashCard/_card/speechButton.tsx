import SpeechButton from "@/components/ui-parts/speechButton";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export default function Speech({
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
    <SpeechButton
      isSpeaking={isSpeaking}
      speech={speech}
      className="rounded-full bg-gray-200 hover:bg-gray-300 w-16 h-16 p-4"
    />
  );
}
