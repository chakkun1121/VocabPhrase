import Header from "./_components/header";
import { ReactNode } from "react";
import LeftBar from "./_components/leftBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  if (!session) redirect("/login?redirectTo=/app");
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
