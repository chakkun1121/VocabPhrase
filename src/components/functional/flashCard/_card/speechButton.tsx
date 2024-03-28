import { useSpeech } from "@/common/hooks/useSpeech";
import SpeechButton from "@/components/ui-parts/speechButton";
import { useHotkeys } from "react-hotkeys-hook";

export default function Speech({
  text,
  lang = "en",
}: {
  text: string;
  lang?: string;
}) {
  const { isSpeaking, speech, stop } = useSpeech(text, lang);

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
