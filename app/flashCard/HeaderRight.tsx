"use client";
import { ReactNode, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { CgMaximizeAlt } from "react-icons/cg";
import { MdOutlineZoomInMap } from "react-icons/md";

export default function HeaderRight() {
  const [isMaximized, setIsMaximized] = useState(false);
  document.addEventListener("fullscreenchange", () => {
    setIsMaximized((prev) => !prev);
  });
  return (
    <nav className="gap-4 hidden md:flex">
      {(
        [
          {
            title: isMaximized ? "戻す" : "最大化",
            icon: isMaximized ? <MdOutlineZoomInMap /> : <CgMaximizeAlt />,
            onClick: () => {
              isMaximized
                ? document.exitFullscreen()
                : document.documentElement.requestFullscreen();
              setIsMaximized((prev) => !prev);
            },
          },
        ] as {
          title: string;
          icon: ReactNode;
          onClick?: (e: any) => void;
        }[]
      ).map(({ title, icon, onClick }, i) => (
        <button
          key={i}
          onClick={onClick}
          className="gap-2 p-2  bg-primary-300 hover:bg-primary-400 rounded-full w-12 h-12 grid place-items-center"
          title={title}
        >
          {icon}
        </button>
      ))}
    </nav>
  );
}
