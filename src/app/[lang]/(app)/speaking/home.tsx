"use client";

import { useFile } from "@/googledrive/useFile";
import { customSession } from "@/types/customSession";
import { useSession } from "next-auth/react";

export default function SpeakingHome({ fileId }: { fileId: string }) {
  const { data: session }: { data: customSession | null } =
    useSession() as unknown as { data: customSession };
  const token = session?.accessToken;
  const { title, fileContent, loading } = useFile(token, fileId);
  return (
    <main className="mt-20">
      {loading ? <p className="text-center">loading...</p> : <p>Speaking</p>}
    </main>
  );
}
