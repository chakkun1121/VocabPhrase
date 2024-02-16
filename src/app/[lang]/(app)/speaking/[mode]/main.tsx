"use client";

import { useFile } from "@/googledrive/useFile";
import { customSession } from "@/types/customSession";
import { useSession } from "next-auth/react";
import { SpeakingMode } from "../menu";

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
  return (
    <>
      <p>Speaking</p>
    </>
  );
}
