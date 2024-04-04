import { useSpeech } from "@/common/hooks/useSpeech";
import { Button } from "@/components/ui/button";
import { useHotkeys } from "react-hotkeys-hook";
import { AiOutlineSound } from "react-icons/ai";
import { FaStop } from "react-icons/fa";

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
    <Button
      onClick={isSpeaking ? stop : speech}
      title={isSpeaking ? "停止" : "再生"}
      className="aspect-square grid place-items-center h-full flex-none"
      variant="outline"
    >
      {isSpeaking ? <FaStop /> : <AiOutlineSound />}
    </Button>
  );
}
