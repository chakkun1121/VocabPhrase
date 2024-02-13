"use client";

import { customSession } from "@/@types/customSession";
import { fileType } from "@/@types/fileType";
import { getFileInfo, getFileContent, listFiles } from "@/googledrive";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function PrintPage({ fileId }: { fileId: string }) {
  const [fileContent, setFileContent] = useState<fileType | undefined>();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const { data: session }: { data: customSession | null } =
    useSession() as unknown as { data: customSession };
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
        setLoading(false);
      } catch (e: any) {
        // 空ファイルでは "SyntaxError: Unexpected end of JSON input" を吐くが問題なし
        if (e.message !== "Unexpected end of JSON input") console.error(e);
      }
    })();
  }, [token, fileId]);
  useDocumentTitle(
    `${title
      .split(".")
      .slice(0, -1)
      .join(".")} | 印刷 | VocabPhrase | chakkun1121`
  );
  if (loading) return <div className="text-center print-none">loading...</div>;
  return (
    <div className="p-4 print:p-0">
      <div className="print:hidden">
        <button onClick={window.print}>印刷する</button>
      </div>
      <div className="border print:border-none">
        <p className="print:hidden">印刷プレビュー</p>
        <h1 className="text-center">
          {title.split(".").slice(0, -1).join(".")}
        </h1>
        <table className="print:w-full">
          <thead>
            <tr>
              <th className="p-2"></th>
              <th className="p-2">英文</th>
              <th className="p-2">日本語訳</th>
            </tr>
          </thead>
          <tbody>
            {fileContent?.content?.map((v, i) => (
              <tr key={i}>
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{v.en}</td>
                <td className="p-2">{v.ja}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
