"use client";

import { useEffect, useState } from "react";
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

export default function Card({
  fileId,
  fileContent,
  fileLoading,
  setFileContent,
  fileError,
}: {
  fileId: string;
  fileContent?: fileType;
  fileLoading: boolean;
  setFileContent?: (content: fileType) => void;
  fileError?: Error | null;
}) {
  const [mode, setMode] = useState<"home" | "cards" | "result">("home");
  const [flashCardSettings, setFlashCardSettings] = useState<flashCardSettings>(
    {
      isRandom: false,
      mode: "ja-en",
      isAnswerWithKeyboard: false,
      removeChecked: true,
      efficiencyMode: false,
    }
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
