"use client";

import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import RecentFile from "./recentFile";

export default function LeftBar() {
  const [isShow, setIsShow] = useState(true);
  const [isShowContent, setIsShowContent] = useState(false);
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
          isShow ? "w-96" : "w-0"
        } h-full bg-JungleGreen-100 duration-500 sticky bottom-0 `}
        style={{
          gridArea: "2 / 1 / 3 / 2",
        }}
      >
        <RecentFile hidden={!isShowContent} />
      </div>
      <button
        onClick={() => {
          setIsShow(!isShow);
        }}
        className={`absolute bottom-2 w-12 h-12 bg-JungleGreen-200 duration-500 ${
          isShow ? "rounded-l-full left-[21rem]" : "rounded-r-full left-0"
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
