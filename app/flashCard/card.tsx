"use client";

import { customSession } from "@/@types/customSession";
import { fileType } from "@/@types/fileType";
import { getFileInfo, getFileContent } from "@/googledrive";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import FlashCardHome from "./flashCardHome";
import { flashCardSettings } from "@/@types/flashCardSettings";
import FlashCard from "./flashCard";
import CardResult from "./cardResult";
import HeaderRight from "./HeaderRight";

export default function Card({ fileId }: { fileId: string }) {
  const [fileContent, setFileContent] = useState<fileType>({ content: [] });
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"home" | "cards" | "result">("home");
  const [result, setResult] = useState({});
  const { data: session }: { data: customSession | null } =
    useSession() as unknown as { data: customSession };
  const [flashCardSettings, setFlashCardSettings] = useState<flashCardSettings>(
    {
      isRandom: false,
      isAnswerWithKeyboard: false,
    }
  );
  const token = session?.accessToken;
  useEffect(() => {
    (async () => {
      if (!token) return;
      try {
        setTitle((await getFileInfo(token, fileId)).name);
        setFileContent(JSON.parse(await getFileContent(token, fileId)));
        setLoading(false);
      } catch (e: any) {
        // 空ファイルでは "SyntaxError: Unexpected end of JSON input" を吐くが問題なし
        if (e.message !== "Unexpected end of JSON input") console.error(e);
      }
    })();
  }, [token, fileId]);
  if (loading)
    return <div className="flex flex-col gap-4 h-full p-4">loading...</div>;
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 bg-primary-200">
        <div className="">
          <h1>VocabPhrase</h1>
        </div>
        <p className="absolute mx-auto left-0 right-0 block w-min">{title}</p>
        <HeaderRight />
      </header>
      {mode === "home" && (
        <FlashCardHome
          fileContent={fileContent}
          setMode={setMode}
          flashCardSettings={flashCardSettings}
          setFlashCardSettings={setFlashCardSettings}
        />
      )}
      {mode === "cards" && (
        <FlashCard
          fileContent={fileContent}
          flashCardSettings={flashCardSettings}
          setMode={setMode}
          setResult={setResult}
        />
      )}
      {mode === "result" && <CardResult result={result} />}
    </div>
  );
}
