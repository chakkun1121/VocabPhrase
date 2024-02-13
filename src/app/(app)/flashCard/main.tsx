"use client";

import { customSession } from "@/types/customSession";
import { fileType } from "@/types/fileType";
import {
  getFileInfo,
  getFileContent,
  listFiles,
  uploadFile,
} from "@/googledrive";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { flashCardSettings } from "@/types/flashCardSettings";
import FlashCard from "./_card/card";
import CardResult from "./cardResult";
import HeaderRight from "./HeaderRight";
import { cardResult } from "@/types/cardResult";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useLeavePageConfirmation } from "../../../common/hooks/useLeavePageConfirmation";
import FlashCardHome from "./flashCardHome";

export default function Card({ fileId }: { fileId: string }) {
  const [fileContent, setFileContent] = useState<fileType | undefined>();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"home" | "cards" | "result">("home");
  const [resultfileId, setResultfileId] = useState<string | undefined>(); // resultsのファイルID
  const [results, setResults] = useState<cardResult>({
    fileInfo: { id: fileId },
    check: {
      ["en-ja"]: [],
      ["ja-en"]: [],
    },
    results: [],
  });
  const [savingResults, setSavingResults] = useState(false);
  useLeavePageConfirmation(savingResults);
  const { data: session }: { data: customSession | null } =
    useSession() as unknown as { data: customSession };
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
  const token = session?.accessToken;
  // 初期読み込み
  useEffect(() => {
    (async () => {
      if (!token) return;
      try {
        await Promise.all([
          setTitle((await getFileInfo(token, fileId)).name),
          setFileContent(JSON.parse(await getFileContent(token, fileId))),
        ]);
        const resultFile = await listFiles(
          token,
          "name='" + fileId + ".json'",
          undefined,
          undefined,
          "spaces=appDataFolder"
        ).then((r) => r.files[0]);
        if (resultFile) {
          setResultfileId(resultFile.id);
          setResults(JSON.parse(await getFileContent(token, resultFile.id)));
        }
        setLoading(false);
      } catch (e: any) {
        // 空ファイルでは "SyntaxError: Unexpected end of JSON input" を吐くが問題なし
        if (e.message !== "Unexpected end of JSON input") console.error(e);
      }
    })();
  }, [token, fileId]);
  useEffect(() => {
    (async () => {
      if (mode !== "result") return;
      setSavingResults(true);
      try {
        if (resultfileId) {
          await uploadFile(token, resultfileId, JSON.stringify(results));
        } else {
          setResultfileId(
            await fetch("https://www.googleapis.com/drive/v3/files", {
              method: "POST",
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: fileId + ".json",
                parents: ["appDataFolder"],
              }),
            })
              .then((r) => r.json())
              .then((r) => r.id)
          );
        }
        setSavingResults(false);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [fileId, mode, resultfileId, results, token]);
  useDocumentTitle(
    `${title
      .split(".")
      .slice(0, -1)
      .join(".")} | フラッシュカード | VocabPhrase | chakkun1121`
  );
  return (
    <>
      <header className="flex px-4 flex-none bg-primary-200 h-20 fixed top-0 z-10 left-0 right-0 justify-between items-center">
        <div className="hidden md:block">
          <h1>VocabPhrase</h1>
        </div>
        <p className="md:absolute mx-auto left-0 right-0 block w-max">
          {title.split(".").slice(0, -1).join(".")}
        </p>
        <HeaderRight mode={mode} setMode={setMode} />
      </header>
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
                  currentProblemIdList={currentProblemIdList}
                />
              )}
            </>
          )
        )}
      </main>
    </>
  );
}
