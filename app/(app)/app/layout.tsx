import Header from "./_components/header";
import { ReactNode } from "react";
import LeftBar from "./_components/leftBar";
import { Metadata } from "next";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="h-screen"
      style={{
        gridTemplateColumns: "auto 1fr",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <Header />
      <div className="flex mt-20">
        <LeftBar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
export const metadata: Metadata = {
  title: "アプリ",
  robots: "noindex",
};
