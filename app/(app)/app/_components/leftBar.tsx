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
          isShow ? "w-screen md:w-96" : "w-0"
        } bg-JungleGreen-100 duration-500 sticky top-20 h-[calc(100vh-5rem)]`}
      >
        <RecentFile hidden={!isShowContent} />
      </div>
      <button
        onClick={() => {
          setIsShow(!isShow);
        }}
        className={`bottom-2 fixed w-12 h-12 bg-JungleGreen-200 duration-500 ${
          isShow
            ? "rounded-l-full left-[calc(100vw-3rem)] md:left-[21rem] "
            : "rounded-r-full left-0"
        }`}
      >
        {isShow ? (
          <FaAngleLeft className="m-auto" />
        ) : (
          <FaAngleRight className="m-auto" />
        )}
      </button>
    </>
  );
}
