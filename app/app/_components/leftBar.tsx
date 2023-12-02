"use client";

import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Menu from "./menu";
import listFiles from "@/googledrive";
import { useToken, useUser } from "@/firebase/client/auth";
import { useRouter } from "next/navigation";

export default function LeftBar() {
  const [isShow, setIsShow] = useState(true);
  const user = useUser();
  const router = useRouter();
  const token = useToken();
  if (!user) {
    router.push("/login");
  }
  useEffect(() => {
    (async () => {
      console.log(token);
      if (!user || !token) return;
      const files = await listFiles(token, "");
      console.log(files);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div
        className={`${
          isShow ? "w-96" : "w-0"
        } h-full bg-JungleGreen-100 duration-500 flex flex-col`}
      >
        {isShow && (
          <>
            <div className="flex-1">{/* resent files */}</div>
            <hr className="border border-black" />
            <nav className="flex-none">
              <Menu />
            </nav>
          </>
        )}
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
