"use client";

import { customSession } from "@/@types/customSession";
import { fileType } from "@/@types/fileType";
import { getFileInfo, getFileContent } from "@/googledrive";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Card({ field }: { field: string }) {
  const [fileContent, setFileContent] = useState<fileType>({ content: [] });
  const [title, setTitle] = useState("");
  useEffect(() => {
    (async () => {
      const { data: session }: { data: customSession | null } =
        useSession() as unknown as { data: customSession };
      const token = session?.accessToken;
      if (!token) return;
      setTitle((await getFileInfo(token, field)).name);
      setFileContent(JSON.parse(await getFileContent(token, field)));
    })();
  }, [field]);
  if (!fileContent.content.length)
    return <div className="flex flex-col gap-4 h-full p-4">loading...</div>;
  return <div className="flex flex-col gap-4 h-full p-4"></div>;
}
