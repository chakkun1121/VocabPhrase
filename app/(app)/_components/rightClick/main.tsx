"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
type menuInfo = {
  [key: string]: menuInfoOptions[];
};
type menuInfoOptions = {
  name: {
    ja: string;
    en: string;
  };
  onclick?: (text: string) => void;
  options?: menuInfoOptions[];
  when?: "onSelected";
};
export default function RightClick() {
  const [isShow, setIsShow] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const pathName = usePathname();
  const menu: menuInfo = {
    default: [
      {
        name: {
          ja: "コピー",
          en: "Copy",
        },
        onclick: (text: string) => {
          navigator.clipboard.writeText(text);
        },
        when: "onSelected",
      },
      {
        name: {
          ja: "読み上げ",
          en: "speech",
        },
        onclick: (text: string) => {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = "en-US";
          speechSynthesis.speak(utterance);
        },
        when: "onSelected",
      },
      {
        name: {
          ja: "で検索",
          en: "Search with",
        },
        options: [
          {
            name: {
              ja: "Google",
              en: "Google",
            },
            onclick: (text: string) => {
              window.open(`https://www.google.com/search?q=${text}`, "_blank");
            },
          },
        ],
        when: "onSelected",
      },
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
    ],
  };

  useEffect(() => {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      setX(e.clientX);
      setY(e.clientY);
      setIsShow(true);
    });
    window.addEventListener("click", () => setIsShow(false));
  });
  const onSelected = !!window.getSelection()?.toString();
  const currentMenu = (menu[pathName] || menu.default).filter((e) => {
    if (e.when === "onSelected") {
      return onSelected;
    }
    return true;
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
            {currentMenu.map((e) => (
              <button
                className="w-full h-12 px-4 text-left hover:bg-gray-200"
                onClick={() => {
                  e.onclick?.(window.getSelection()?.toString() || "");
                  setIsShow(false);
                }}
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
