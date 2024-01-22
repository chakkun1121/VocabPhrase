"use client";

import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import RecentFile from "./recentFile";

export default function LeftBar() {
  const [isShow, setIsShow] = useState(true);
  const [isShowContent, setIsShowContent] = useState(true);
  useEffect(() => {
    if (isShow) {
      setTimeout(() => {
        setIsShowContent(true);
      }, 500);
    } else {
      setIsShowContent(false);
    }
  }, [isShow]);
  return (
    <>
      <div
        className={`${
          isShow ? "w-[min(24rem,calc(100vw-3rem))]" : "w-0"
        } bg-JungleGreen-100 duration-500 fixed top-20 h-[calc(100vh-5rem)] z-10`}
      >
        <RecentFile hidden={!isShowContent} />
      </div>
      <button
        onClick={() => {
          setIsShow(!isShow);
        }}
        className={`bottom-2 fixed w-12 h-12 bg-JungleGreen-200 duration-500 z-20 ${
          isShow
            ? "rounded-l-full left-[min(21rem,calc(100vw-3rem))]"
            : "rounded-r-full left-0"
        }`}
      >
        {isShow ? (
          <FaAngleLeft className="m-auto" />
        ) : (
          <FaAngleRight className="m-auto" />
        )}
      </button>
      <div
        className={`${
          isShow ? "md:w-[min(24rem,calc(100vw-3rem))] w-0" : "w-0"
        } duration-500`}
      />
    </>
  );
}
