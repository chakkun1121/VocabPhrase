import { useState } from "react";

export function useSpeech(text: string, lang = "en") {
  const [isSpeaking, setIsSpeaking] = useState(false);
  async function speech() {
    stop();
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
    await new Promise(resolve => {
      utterance.onend = resolve;
    });
    setIsSpeaking(false);
  }
  function stop() {
    setIsSpeaking(false);
    speechSynthesis.cancel();
  }
  return { isSpeaking, speech, stop };
}
