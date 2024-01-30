"use client";

import { customSession } from "@/@types/customSession";
import { localSettings } from "@/@types/settings";
import { useSession } from "next-auth/react";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { useServerSettings } from "../_library/settings/useServerSettings";

export default function Settings() {
  const { data: session }: { data: customSession | null } =
    useSession() as unknown as { data: customSession };
  const token = session?.accessToken;
  const { serverSettings, setServerSettings, isLoading, isSaving } =
    useServerSettings(token);
  if (isLoading) return <p className="text-center">loading...</p>;
  return <div></div>;
}
// recoil
const { persistAtom } = recoilPersist({
  key: "settings",
  storage: typeof window === "undefined" ? undefined : localStorage,
});
export const localSettingsState = atom<localSettings>({
  key: "settings",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
