"use client";
import { serverSettingsType } from "@/types/settings";
import { listFiles, getFileContent, uploadFile } from "@/googledrive";
import { useEffect, useState } from "react";

export function useServerSettings(token: string) {
  const [settingsfileId, setSettingsfileId] = useState<string>();
  const [serverSettings, setServerSettings] = useState<
    serverSettingsType | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    (async () => {
      if (!token) return;
      setIsLoading(true);
      const settingsFile = await listFiles(
        token,
        "name='settings.json'",
        undefined,
        undefined,
        "spaces=appDataFolder"
      ).then(r => r.files?.[0]);
      if (settingsFile) {
        setSettingsfileId(settingsFile.id);
        setServerSettings(
          JSON.parse((await getFileContent(token, settingsFile.id)) || "{}")
        );
      }
      setIsLoading(false);
    })();
  }, [token]);
  useEffect(() => {
    (async () => {
      if (!token) return;
      setIsSaving(true);
      if (settingsfileId) {
        uploadFile(token, settingsfileId, JSON.stringify(serverSettings));
      } else {
        setSettingsfileId(
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
            .then(r => r.json())
            .then(r => r.id)
        );
      }
      setIsSaving(false);
    })();
  }, [serverSettings, settingsfileId, token]);
  return { serverSettings, setServerSettings, isLoading, isSaving };
}
