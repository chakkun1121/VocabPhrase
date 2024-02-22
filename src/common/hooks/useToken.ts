"use client";
import { customSession } from "@/types/customSession";
import { useSession } from "next-auth/react";

export function useToken() {
  const { data: session }: { data: customSession | null } =
    useSession() as unknown as { data: customSession };
  const token = session?.accessToken;
  return token;
}
