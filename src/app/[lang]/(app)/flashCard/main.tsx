"use client";

import { useState } from "react";
import { flashCardSettings } from "@/types/flashCardSettings";
import FlashCard from "./_card/card";
import CardResult from "./cardResult";
import HeaderRight from "./HeaderRight";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useLeavePageConfirmation } from "../../../../common/hooks/useLeavePageConfirmation";
import FlashCardHome from "./flashCardHome";
import Header from "@/components/layouts/header";
import { useFile } from "@/googledrive/useFile";
import { removeExtension } from "../../../../common/library/removeExtension";
import { useResultFile } from "../../../../common/hooks/useFlashcardResultFile";
import { useToken } from "../../../../common/hooks/useToken";

export default function Card({ fileId }: { fileId: string }) {
  const [mode, setMode] = useState<"home" | "cards" | "result">("home");
  const [flashCardSettings, setFlashCardSettings] = useState<flashCardSettings>(
    {
      isRandom: false,
      mode: "ja-en",
      isAnswerWithKeyboard: false,
    }
  );
  const [currentProblemIdList, setCurrentProblemIdList] = useState<string[]>(
    []
  );
  const token = useToken();
  const { title, fileContent, loading: fileLoading } = useFile(token, fileId);
  const {
    results,
    setResults,
    savingResults,
    saveResults,
    loading: resultLoading,
  } = useResultFile(fileId, token);
  const loading = fileLoading || resultLoading;
  useLeavePageConfirmation(mode == "cards" || savingResults);
  useDocumentTitle(
    `${removeExtension(title)} | フラッシュカード | VocabPhrase | chakkun1121`
  );
  return (
    <>
      <Header
        rightContent={
          <>
            <p className="md:absolute mx-auto left-0 right-0 block w-max">
              {removeExtension(title)}
            </p>
            <HeaderRight />
          </>
        }
      />
      <main className="mt-20 h-full">
        {loading ? (
          <div className="h-full p-4">loading...</div>
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
                  setResults={setResults}
                  setCurrentProblemIdList={setCurrentProblemIdList}
                />
              )}
              {mode === "result" && (
                <CardResult
                  results={results}
                  fileContent={fileContent}
                  mode={flashCardSettings.mode}
                  currentProblemIdList={currentProblemIdList}
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
