import { useState } from "react";

export function useSpeech(text: string, lang = "en") {
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
  return { isSpeaking, speech, stop };
}
