"use client";

import { customSession } from "@/@types/customSession";
import { fileType } from "@/@types/fileType";
import {
  getFileInfo,
  getFileContent,
  listFiles,
  uploadFile,
} from "@/googledrive";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import FlashCardHome from "./flashCardHome";
import { flashCardSettings } from "@/@types/flashCardSettings";
import FlashCard from "./_card/card";
import CardResult from "./cardResult";
import HeaderRight from "./HeaderRight";
import { cardResult } from "@/@types/cardResult";

export default function Card({ fileId }: { fileId: string }) {
  const [fileContent, setFileContent] = useState<fileType | undefined>();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"home" | "cards" | "result">("home");
  const [resultFileID, setResultFileID] = useState<string | undefined>(); // resultsのファイルID
  const [results, setResults] = useState<cardResult>({
    fileInfo: { id: fileId },
    results: [],
  });
  const { data: session }: { data: customSession | null } =
    useSession() as unknown as { data: customSession };
  const [flashCardSettings, setFlashCardSettings] = useState<flashCardSettings>(
    {
      isRandom: false,
    }
  );
  const token = session?.accessToken;
  // 初期読み込み
  useEffect(() => {
    (async () => {
      if (!token) return;
      try {
        setTitle((await getFileInfo(token, fileId)).name);
        setFileContent(JSON.parse(await getFileContent(token, fileId)));
        const resultFile = await listFiles(
          token,
          "name='" + fileId + ".json'",
          undefined,
          undefined,
          "spaces=appDataFolder"
        ).then((r) => r.files[0]);
        if (resultFile) {
          setResultFileID(resultFile.id);
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
      if (!token) return;
      if (loading) return;
      if (resultFileID) {
        uploadFile(token, resultFileID, JSON.stringify(results));
      } else {
        setResultFileID(
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
    })();
  }, [fileId, loading, resultFileID, results, token]);
  const achievement = getAchievement(results, fileContent);
  if (loading)
    return <div className="flex flex-col gap-4 h-full p-4">loading...</div>;
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center md:justify-between justify-center p-4 bg-primary-200">
        <div className="hidden md:block">
          <h1>VocabPhrase</h1>
        </div>
        <p className="md:absolute mx-auto left-0 right-0 block w-max">
          {title.split(".").slice(0, -1).join(".")}
        </p>
        <HeaderRight />
      </header>
      {fileContent && achievement && (
        <>
          {mode === "home" && (
            <FlashCardHome
              fileContent={fileContent}
              setMode={setMode}
              flashCardSettings={flashCardSettings}
              setFlashCardSettings={setFlashCardSettings}
              achievement={achievement}
            />
          )}
          {mode === "cards" && (
            <FlashCard
              fileContent={fileContent}
              flashCardSettings={flashCardSettings}
              setMode={setMode}
              achievement={achievement}
              setResults={setResults}
            />
          )}
          {mode === "result" && (
            <CardResult results={results} fileContent={fileContent} />
          )}
        </>
      )}
    </div>
  );
}
export function getAchievement(
  results: cardResult,
  fileContent: fileType | undefined
): { id: string; achievement: boolean }[] | undefined {
  //
  // 設問ごとに一度でも正解したらtrueにする
  return fileContent?.content.map((c) => ({
    id: c.id,
    achievement: results.results.some((r) =>
      r.cardsResult.some((r) => r.id === c.id && r.result)
    ),
  }));
}
