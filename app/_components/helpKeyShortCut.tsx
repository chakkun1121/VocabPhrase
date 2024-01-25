"use client";
import { useHotkeys } from "react-hotkeys-hook";

export default function HelpKeyShortCut() {
  useHotkeys(
    "ctrl+/,f1,?,shift+/",
    () => {
      window.open("/help", "_blank");
    },
    {
      preventDefault: true,
      enableOnFormTags: ["INPUT", "TEXTAREA", "SELECT"],
    }
  );
  return <></>;
}
