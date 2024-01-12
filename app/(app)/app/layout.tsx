import Header from "./_components/header";
import { ReactNode } from "react";
import LeftBar from "./_components/leftBar";
import { Metadata } from "next";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="grid h-screen"
      style={{
        gridTemplateColumns: "auto 1fr",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <Header />
      <LeftBar />
      <div
        className="overflow-y-scroll"
        style={{
          gridArea: "2 / 2 / 3 / 3",
        }}
      >
        {children}
      </div>
      <div className="flex-none">{/* right bar */}</div>
    </div>
  );
}
export const metadata: Metadata = {
  title: "アプリ",
  robots: "noindex",
};
