"use client";

import { customSession } from "@/@types/customSession";
import { localSettings, serverSettingsType } from "@/@types/settings";
import { listFiles, getFileContent, uploadFile } from "@/googledrive";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

export default function Settings() {
  const [serverSettings, setServerSettings] = useState<serverSettingsType>({});
  const [localSettings, setLocalSettings] = useRecoilState(localSettingsState);
  const [settingsFileID, setSettingsFileID] = useState<string>();
  const { data: session }: { data: customSession | null } =
    useSession() as unknown as { data: customSession };
  const token = session?.accessToken;

  useEffect(() => {
    (async () => {
      if (!token) return;
      const settingsFile = await listFiles(
        token,
        "name='settings.json'",
        undefined,
        undefined,
        "spaces=appDataFolder"
      ).then((r) => r.files?.[0]);
      if (settingsFile) {
        setSettingsFileID(settingsFile.id);
        setServerSettings(
          JSON.parse(await getFileContent(token, settingsFile.id)) || {}
        );
      }
    })();
  }, [token]);
  useEffect(() => {
    (async () => {
      if (!token) return;
      if (settingsFileID) {
        uploadFile(token, settingsFileID, JSON.stringify(serverSettings));
      } else {
        setSettingsFileID(
          await fetch("https://www.googleapis.com/drive/v3/files", {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "settings.json",
              parents: ["appDataFolder"],
            }),
          })
            .then((r) => r.json())
            .then((r) => r.id)
        );
      }
    })();
  }, [serverSettings, settingsFileID, token]);
  return <></>;
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
