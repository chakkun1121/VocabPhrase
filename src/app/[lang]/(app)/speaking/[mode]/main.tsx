"use client";

import { useFile } from "@/googledrive/useFile";
import { customSession } from "@/types/customSession";
import { useSession } from "next-auth/react";
import { SpeakingMode, speakingMode } from "../menu";
import { useState } from "react";

export default function Speaking({
  fileId,
  mode,
  lang,
}: {
  fileId: string;
  mode: SpeakingMode;
  lang: "ja" | "en";
}) {
  const { data: session }: { data: customSession | null } =
    useSession() as unknown as { data: customSession };
  const token = session?.accessToken;
  const { title, fileContent, loading } = useFile(token, fileId);
  const [isShowEn, setIsShowEn] = useState(
    speakingMode.find((m) => m.id === mode)?.defaultShow[lang] ?? true
  );
  const [isShowJa, setIsShowJa] = useState(
    speakingMode.find((m) => m.id === mode)?.defaultShow[lang] ?? true
  );
  if (loading) return <p className="text-center">loading...</p>;
  return (
    <>
      <nav className="bg-gray-200 p-2 rounded [&>label]:block grid gap-2">
        <label>
          <input
            type="checkbox"
            checked={isShowEn}
            onChange={(e) => setIsShowEn(e.target.checked)}
          />
          英文を表示する
        </label>
        <label>
          <input
            type="checkbox"
            checked={isShowJa}
            onChange={(e) => setIsShowJa(e.target.checked)}
          />
          日本語訳を表示する
        </label>
      </nav>
      <div className="bg-primary-100 p-2 rounded">
        <div>
          <h2>{title.split(".").slice(0, -1).join(".")}</h2>
        </div>
        <div className="grid gap-4">
          {fileContent?.content.map((content, index) => (
            <div key={index} className="bg-primary-100 p-2 rounded">
              <div>
                {isShowEn ? (
                  <p className="select-text">{content.en}</p>
                ) : (
                  <p className="text-gray-600">英文非表示</p>
                )}
              </div>
              <div>
                {isShowJa ? (
                  <p className="select-text">{content.ja}</p>
                ) : (
                  <p className="text-gray-600">日本語訳非表示</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
