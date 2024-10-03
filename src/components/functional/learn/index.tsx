"use client";

import React, { useEffect, useState } from "react";
import { flashCardMode } from "@/types/flashCardSettings";
import { useResultFile } from "@/common/hooks/useFlashcardResultFile";
import { useToken } from "@/common/hooks/useToken";
import { useLeavePageConfirmation } from "@/common/hooks/useLeavePageConfirmation";
import Loading from "@/components/ui-elements/loading";
import { fileType } from "@/types/fileType";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Home from "./home";
import { useConvertChecks } from "../flashCard";
import Main from "./main";
import Result from "./result";
import { Option } from "@/common/formContent";
import Error from "@/app/error";

export default function Learn({
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
  const [learnSettings, setLearnSettings] =
    useState<LearnSettings>(defaultLearnSettings);
  const token = useToken();
  const {
    results,
    setResults,
    savingResults,
    saveResults,
    loading: resultLoading,
    error: resultError,
  } = useResultFile(fileId, token);
  const [currentResult, setCurrentResult] = useState<Result>({});
  const [turn, setTurn] = useState(0);
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
  useConvertChecks({
    results,
    setResults,
    resultLoading,
    saveResults,
  });

  if (fileError || resultError)
    return <Error error={fileError || resultError} />;
  return (
    <>
      <main className={cn("h-full", className)}>
        {loading ? (
          <Loading />
        ) : (
          fileContent && (
            <React.Fragment key={turn}>
              {mode === "home" && (
                <Home setMode={setMode} setLearnSettings={setLearnSettings} />
              )}
              {mode === "cards" && (
                <Main
                  fileContent={fileContent}
                  learnSettings={learnSettings}
                  setMode={setMode}
                  cardResult={results}
                  currentResult={currentResult}
                  setCurrentResult={setCurrentResult}
                  // setFileContent={setFileContent}
                />
              )}
              {mode === "result" && (
                <Result
                  results={results}
                  fileContent={fileContent}
                  mode={learnSettings.mode}
                  currentResult={currentResult}
                  setResults={setResults}
                  saveResults={saveResults}
                  next={() => {
                    setCurrentResult({});
                    setTurn(turn + 1);
                    setMode("cards");
                  }}
                />
              )}
            </React.Fragment>
          )
        )}
      </main>
    </>
  );
}
export type Result = {
  [problemId: string]: {
    isFinished: boolean; // この問題を終了 = 一度以上正解したか
    isCorrectOnce: boolean; // 1度目で正解したかどうか
  };
};
export const defaultLearnSettings: LearnSettings = {
  mode: "ja-en",
  isAnswerWithKeyboard: false,
};
export type LearnSettings = {
  mode: flashCardMode;
  isAnswerWithKeyboard: boolean;
};

export const learnOptions: Option[] = [
  {
    name: "isAnswerWithKeyboard",
    id: "flashcard.isAnswerWithKeyboard",
    title: "キーボードで解答する",
    default: false,
  },
  {
    name: "mode",
    id: "flashcard.mode",
    title: "出題モード",
    default: "ja-en",
    options: [
      { value: "ja-en", label: "日本語→英語" },
      { value: "en-ja", label: "英語→日本語" },
    ],
  },
];
