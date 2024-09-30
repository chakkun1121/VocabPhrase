"use client";

import React, { useEffect, useState } from "react";
import { flashCardSettings } from "@/types/flashCardSettings";
import FlashCard from "./card";
import CardResult from "./result";
import FlashCardHome from "./home/flashCardHome";
import { useResultFile } from "@/common/hooks/useFlashcardResultFile";
import { useToken } from "@/common/hooks/useToken";
import { useLeavePageConfirmation } from "@/common/hooks/useLeavePageConfirmation";
import Loading from "@/components/ui-elements/loading";
import { fileType } from "@/types/fileType";
import { toast } from "sonner";
import Error from "@/app/error";
import { cn } from "@/lib/utils";
import { cardResult } from "@/types/cardResult";

export default function Card({
  fileId,
  fileContent,
  fileLoading,
  setFileContent,
  fileError,
  className,
}: {
  fileId: string;
  fileContent?: fileType;
  fileLoading: boolean;
  setFileContent?: (content: fileType) => void;
  fileError?: Error | null;
  className?: string;
}) {
  const [mode, setMode] = useState<"home" | "cards" | "result">("home");
  const [flashCardSettings, setFlashCardSettings] = useState<flashCardSettings>(
    defaultFlashCardSettings
  );
  const token = useToken();
  const {
    results,
    setResults,
    savingResults,
    saveResults,
    loading: resultLoading,
    error: resultError,
  } = useResultFile(fileId, token);
  const [currentResult, setCurrentResult] = useState<{
    [problemId: string]: boolean;
  }>({});
  useConvertChecks({
    results,
    setResults,
    resultLoading,
    saveResults,
  });
  const loading = fileLoading || resultLoading;
  useLeavePageConfirmation(mode == "cards" || savingResults);
  useEffect(() => {
    if (fileError) {
      toast.error(fileError.message);
    }
    if (resultError) {
      toast.error(resultError.message);
    }
  }, [fileError, resultError]);

  if (fileError || resultError)
    return <Error error={fileError || resultError} />;
  return (
    <>
      <main className={cn("h-full", className)}>
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
                  currentResult={currentResult}
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
export const defaultFlashCardSettings: flashCardSettings = {
  isRandom: true,
  mode: "ja-en",
  isAnswerWithKeyboard: false,
  efficiencyMode: true,
};
export function useConvertChecks({
  results,
  setResults,
  resultLoading,
  saveResults,
}: {
  results: cardResult;
  setResults: React.Dispatch<React.SetStateAction<cardResult>>;
  resultLoading: boolean;
  saveResults: (results: cardResult) => void;
}) {
  useEffect(() => {
    // resultsのcheckは達成率80として保存
    if (results && results.check) {
      const newResults = { ...results };
      newResults.achievement = newResults.achievement || {};
      if (!newResults.check) return;
      function setAchievement(mode: "en-ja" | "ja-en") {
        if (!newResults.check?.[mode]) return;
        newResults.achievement![mode] = {};
        newResults.check[mode]?.forEach(id => {
          newResults.achievement![mode]![id] = 80;
        });
      }
      setAchievement("en-ja");
      setAchievement("ja-en");
      // checkを削除
      delete newResults.check;
      console.log("newResults: ", newResults);
      setResults(newResults);
      saveResults(newResults);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultLoading]);
}
