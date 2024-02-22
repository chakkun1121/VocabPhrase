"use client";
import { useState } from "react";
import { CgMaximizeAlt } from "react-icons/cg";
import { MdOutlineZoomInMap } from "react-icons/md";

export default function HeaderRight({
  mode,
  setMode,
}: {
  mode: "home" | "cards" | "result";
  setMode: (mode: "home" | "cards" | "result") => void;
}) {
  const [isMaximized, setIsMaximized] = useState(false);
  document.addEventListener("fullscreenchange", () => {
    setIsMaximized(prev => !prev);
  });

  return (
    <nav className="gap-4 flex">
      <button
        className="gap-2 p-2 bg-primary-300 hover:bg-primary-400 rounded-full w-12 h-12 grid place-items-center"
        onClick={() => {
          isMaximized
            ? document.exitFullscreen()
            : document.documentElement.requestFullscreen();
          setIsMaximized(prev => !prev);
        }}
        title={isMaximized ? "戻す" : "最大化"}
      >
        {isMaximized ? <MdOutlineZoomInMap /> : <CgMaximizeAlt />}
      </button>
    </nav>
  );
}
