"use client";

import { useToken } from "@/common/hooks/useToken";
import { listFiles } from "@/googledrive";
import { useState, useEffect } from "react";
import Error from "@/app/error";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { useError } from "@/common/hooks/useError";
import DashboardTable from "./dashboardTable";

export type TableInfo = {
  fileId: string;
  title: string;
  lastModified?: Date;
};

export default function FilesTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [recentFile, setRecentFile] = useState<TableInfo[]>([]);
  const [error, setError] = useState<any>(undefined);
  const [user, loading, authError] = useIdToken(auth);

  (async () => {
    console.log(user?.toJSON());
    console.log((await user?.getIdTokenResult())?.token);
  })();

  const token = user?.accessToken;
  useError(error, authError);

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
  if (error) return <Error error={error} />;
  if (isLoading) return <div>Loading...</div>;
  return (
    <DashboardTable
      recentFile={recentFile}
      token={token}
      getRecentFile={getRecentFile}
    />
  );
}
