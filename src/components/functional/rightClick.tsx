"use client";

import { usePathname, useSearchParams } from "next/navigation";
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
  when?: {
    onSelected?: boolean;
    path?: string[];
  };
};
export default function RightClick() {
  const [isShow, setIsShow] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const menu: menuInfoOptions[] = [
    {
      name: {
        ja: "コピー",
        en: "Copy",
      },
      onclick: (text: string) => {
        navigator.clipboard.writeText(text);
      },
      when: { onSelected: true },
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
      when: { onSelected: true },
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
        {
          name: {
            ja: "Google(English)",
            en: "Google(English)",
          },
          onclick: (text: string) => {
            window.open(
              `https://www.google.com/search?q=${text}&hl=en&gws_rd=cr`,
              "_blank"
            );
          },
        },
        {
          name: {
            ja: "Google翻訳",
            en: "Google Translate",
          },
          onclick: (text: string) => {
            window.open(
              `https://translate.google.com/?sl=auto&tl=auto&text=${text}&op=translate`,
              "_blank"
            );
          },
        },
        // {
        //   name: {
        //     ja: "+追加",
        //     en: "+add",
        //   },
        //   onclick: () => {
        //     window.open("/settings#dictionaries", "_blank");
        //   },
        // },
      ],
      when: { onSelected: true },
    },
    {
      name: {
        ja: "印刷",
        en: "print",
      },
      onclick: () => {
        window.open(`/print?fileId=${searchParams.get("fileId")}`, "_blank");
      },
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
    // {
    //   name: {
    //     ja: "設定",
    //     en: "settings",
    //   },
    //   onclick: () => {
    //     window.open("/settings", "_blank");
    //   },
    // },
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
  const onSelected = !!window.getSelection()?.toString();
  const currentMenu = menu.filter((e) => {
    if (e.when?.onSelected && !onSelected) return false;
    if (e.when?.path && !e.when.path.includes(pathName)) return false;
    return true;
  });
  return (
    <>
      {isShow && (
        <>
          <div
            className="absolute top-0 left-0 w-64 bg-gray-100 rounded shadow-lg z-50"
            style={{
              top: y,
              left: x,
            }}
          >
            {currentMenu.map((e) => (
              <MenuButton menuInfo={e} key={e.name.en} x={x} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
function MenuButton({ menuInfo, x }: { menuInfo: menuInfoOptions; x: number }) {
  return menuInfo.options ? (
    <>
      <p className="w-full h-12 px-4 text-left hover:bg-gray-200 text-button flex items-center group after:content-['>'] justify-between after:text-gray-500">
        {menuInfo.name["ja"]}
        <div className="absolute w-64 bg-gray-100 rounded shadow-lg z-50 hidden group-hover:block left-64">
          {menuInfo.options.map((e) => (
            <MenuButton menuInfo={e} key={e.name.en} x={x + 256} />
          ))}
        </div>
      </p>
    </>
  ) : (
    <button
      className="w-full h-12 px-4 text-left hover:bg-gray-200"
      onClick={() => {
        menuInfo.onclick?.(window.getSelection()?.toString() || "");
      }}
    >
      {menuInfo.name["ja"]}
    </button>
  );
}
