"use client";

import { useState } from "react";
import { flashCardSettings } from "@/types/flashCardSettings";
import FlashCard from "./card";
import CardResult from "./result";
import { useDocumentTitle } from "@uidotdev/usehooks";
import FlashCardHome from "./home/flashCardHome";
import { useFile } from "@/googledrive/useFile";
import { useResultFile } from "@/common/hooks/useFlashcardResultFile";
import { useToken } from "@/common/hooks/useToken";
import { removeExtension } from "@/common/library/removeExtension";
import { useLeavePageConfirmation } from "@/common/hooks/useLeavePageConfirmation";
import Loading from "@/components/ui-elements/loading";

export default function Card({ fileId }: { fileId: string }) {
  const [mode, setMode] = useState<"home" | "cards" | "result">("home");
  const [flashCardSettings, setFlashCardSettings] = useState<flashCardSettings>(
    {
      isRandom: false,
      mode: "ja-en",
      isAnswerWithKeyboard: false,
    }
  );

  const token = useToken();
  const {
    title,
    fileContent,
    loading: fileLoading,
    setFileContent,
  } = useFile(token, fileId);
  const {
    results,
    setResults,
    savingResults,
    saveResults,
    loading: resultLoading,
  } = useResultFile(fileId, token);
  const [currentResult, setCurrentResult] = useState<{
    [problemId: string]: boolean;
  }>({});
  const loading = fileLoading || resultLoading;
  useLeavePageConfirmation(mode == "cards" || savingResults);
  useDocumentTitle(
    `${removeExtension(title)} | フラッシュカード | VocabPhrase | chakkun1121`
  );
  return (
    <>
      <main className="h-full">
        {loading ? (
          <Loading />
        ) : (
          fileContent && (
            <>
              {mode === "home" && (
                <FlashCardHome
                  setMode={setMode}
                  setFlashCardSettings={setFlashCardSettings}
                />
              )}
              {mode === "cards" && (
                <FlashCard
                  fileContent={fileContent}
                  flashCardSettings={flashCardSettings}
                  setMode={setMode}
                  cardResult={results}
                  setCurrentResult={setCurrentResult}
                  setFileContent={setFileContent}
                />
              )}
              {mode === "result" && (
                <CardResult
                  results={results}
                  fileContent={fileContent}
                  mode={flashCardSettings.mode}
                  currentResult={currentResult}
                  setResults={setResults}
                  saveResults={saveResults}
                />
              )}
            </>
          )
        )}
      </main>
    </>
  );
}
