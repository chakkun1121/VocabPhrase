"use client";

import { customSession } from "@/@types/customSession";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function FileMenu({ fileID }: { fileID: string }) {
  const [fileContent, setFileContent] = useState<object>({});
  const { data: session }: { data: customSession | null } =
    useSession() as unknown as { data: customSession };
  const token = session?.accessToken;
  useEffect(() => {
    (async () => {
      if (!token) return;
      try {
        const fileContent = await fetch(
          `https://www.googleapis.com/drive/v3/files/${fileID}?alt=media`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
          .then((res) => {
            console.log(res);
            return res;
          })
          .then((res) => res.text())
          .then((res) => JSON.parse(res))
          .catch((e) => {
            throw e;
          });
        setFileContent(fileContent);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [token, fileID]);

  return <></>;
}
