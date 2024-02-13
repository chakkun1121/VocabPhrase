"use client";

import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export default function Print({ fileId }: { fileId: string }) {
  useEffect(() => {
    function print() {
      window.open(`/print?fileId=${fileId}`);
    }
    window.print = print;
  }, [fileId]);
  useHotkeys(
    "ctrl+p",
    () => {
      window.print();
    },
    {
      preventDefault: true,
    }
  );
  return null;
}
