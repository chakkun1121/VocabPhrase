import Header from "./_components/header";
import { ReactNode } from "react";
import LeftBar from "./_components/leftBar";
import { Metadata } from "next";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex mt-20">
        <LeftBar />
        <div className="flex-1 md:w-auto">{children}</div>
      </div>
    </>
  );
}
export const metadata: Metadata = {
  title: "アプリ",
  robots: "noindex",
};
