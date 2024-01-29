"use client";

import { useEffect, useState } from "react";

export default function RightClick() {
  const [isShow, setIsShow] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const menu = [
    {
      name: {
        ja: "印刷",
        en: "print",
      },
      onclick: () => {},
    },
    {
      name: {
        ja: "ヘルプ",
        en: "Help",
      },
      onclick: () => {
        window.open("/help", "_blank");
      },
    },
  ];
  useEffect(() => {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      setX(e.clientX);
      setY(e.clientY);
      setIsShow(true);
    });
    window.addEventListener("click", () => setIsShow(false));
  });
  return (
    <>
      {isShow && (
        <>
          <button
            className="w-screen h-screen bg-white opacity-0	"
            onClick={() => setIsShow(false)}
          ></button>
          <div
            className="absolute top-0 left-0 w-64 bg-gray-100 rounded shadow-lg z-50"
            style={{
              top: y,
              left: x,
            }}
          >
            {menu.map((e) => (
              <button
                className="w-full h-12 px-4 text-left hover:bg-gray-200"
                onClick={e.onclick}
                key={e.name["en"]}
              >
                {e.name["ja"]}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}
