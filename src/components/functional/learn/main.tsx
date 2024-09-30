import { fileType } from "@/types/fileType";
import { LearnSettings } from ".";
import { cardResult } from "@/types/cardResult";

export default function Main({
  fileContent,
  setMode,
  learnSettings,
  cardResult,
}: {
  fileContent: fileType;
  setMode: (mode: "result") => void;
  learnSettings: LearnSettings;
  cardResult: cardResult;
}) {
  return null;
}
