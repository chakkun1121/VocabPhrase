"use client";

import { useToken } from "@/common/hooks/useToken";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateFile({
  searchParams: { state },
}: {
  searchParams: { state: string };
}) {
  const folderId = JSON.parse(state || "{}")?.folderId;
  const router = useRouter();
  const token = useToken();
  useEffect(() => {
    (async () => {
      const fileId = await fetch("https://www.googleapis.com/drive/v3/files", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "newFile.vocabphrase",
          mimeType: "application/vocabphrase",
          parents: [folderId],
        }),
      })
        .then(res => res.json())
        .then(file => file.id);
      router.replace(`/${fileId}/edit`);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId, token]);
  return null;
}
