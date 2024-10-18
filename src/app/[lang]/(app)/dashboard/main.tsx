"use client";

import { useToken } from "@/common/hooks/useToken";
import { listFiles } from "@/googledrive";
import { useState, useEffect } from "react";
import DashboardTable from "./dashboardTable";
import { useError } from "@/common/hooks/useError";
import Error from "../error";

export type TableInfo = {
  fileId: string;
  title: string;
  lastModified?: Date;
};

export default function FilesTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [recentFile, setRecentFile] = useState<TableInfo[]>([]);
  const [error, setError] = useState<any>(undefined);
  const token = useToken();
  useError(error);

  async function getRecentFile() {
    try {
      setIsLoading(true);
      const files = await listFiles(token, "trashed=false")
        .then(res => res.files)
        .catch(e => {
          throw e;
        });
      console.log(files);
      setRecentFile(
        files
          .filter((file: { name: string }) =>
            file.name.endsWith(".vocabphrase")
          )
          .map((file: { name: string; id: string }) => ({
            title: file.name.replace(/\.vocabphrase$/, ""),
            fileId: file.id,
          }))
      );
      setIsLoading(false);
    } catch (e) {
      setError(e);
    }
  }
  useEffect(() => {
    (async () => {
      if (!token) return;
      await getRecentFile();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  // 本来は不要なはずだけれども何故かエラーを吐く
  // https://stackoverflow.com/questions/78056345/nextjs-error-handling-getting-the-above-error-occurred-in-the-redirecterrorbo
  if (error) return <Error error={error} reset={() => {}} />;
  if (isLoading) return <div>Loading...</div>;
  return (
    <DashboardTable
      recentFile={recentFile}
      token={token}
      getRecentFile={getRecentFile}
    />
  );
}
