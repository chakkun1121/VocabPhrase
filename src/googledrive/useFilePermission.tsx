"use client";
import { useEffect, useState } from "react";
import { getFilePermission } from "@/googledrive";

export function useFilePermission(token: string, fileId: string) {
  const [readOnly, setReadOnly] = useState<boolean>(true);
  useEffect(() => {
    getFilePermission(token, fileId).then(permission => {
      setReadOnly(typeof permission.error == "object");
    });
  }, [token, fileId]);
  return { readOnly };
}
