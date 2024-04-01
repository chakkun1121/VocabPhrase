"use client";
import { getFileContent, listFiles, uploadFile } from "@/googledrive";
import { useEffect, useState } from "react";
import { cardResult } from "@/types/cardResult";

export function useResultFile(fileId: string, token: string) {
  const [results, setResults] = useState<cardResult>({
    fileInfo: { id: fileId },
  });
  const [resultFileId, setResultFileId] = useState<string | undefined>(); // resultsのファイルID
  const [savingResults, setSavingResults] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!token || !fileId) return;
    (async () => {
      setLoading(true);
      const resultFile = await listFiles(
        token,
        "name='" + fileId + ".json'",
        undefined,
        undefined,
        "spaces=appDataFolder"
      ).then(r => r.files?.[0]);
      if (resultFile) {
        setResultFileId(resultFile.id);
        setResults(
          JSON.parse((await getFileContent(token, resultFile.id)) || "{}")
        );
      }
      setLoading(false);
    })();
  }, [fileId, token]);
  async function saveResults(newResult?: cardResult) {
    try {
      if (resultFileId) {
        await uploadFile(
          token,
          resultFileId,
          JSON.stringify(newResult || results)
        );
      } else {
        const newResultFileId = await fetch(
          "https://www.googleapis.com/drive/v3/files",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: fileId + ".json",
              parents: ["appDataFolder"],
            }),
          }
        )
          .then(r => r.json())
          .then(r => r.id);
        setResultFileId(newResultFileId);
        await uploadFile(token, newResultFileId, JSON.stringify(results));
      }
      setSavingResults(false);
    } catch (e) {
      console.error(e);
    }
  }
  return { results, setResults, savingResults, saveResults, loading };
}
