import { FaStop } from "react-icons/fa";
import { AiOutlineSound } from "react-icons/ai";

export default function SpeechButton({
  isSpeaking,
  speech,
  className,
  disabled,
}: {
  isSpeaking?: boolean;
  speech?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={isSpeaking ? stop : speech}
      title={isSpeaking ? "停止" : "再生"}
      className={"aspect-square grid place-items-center " + className}
      disabled={disabled}
    >
      {isSpeaking ? <FaStop /> : <AiOutlineSound />}
    </button>
  );
}
