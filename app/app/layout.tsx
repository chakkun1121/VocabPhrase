import Header from "./_components/header";
import { ReactNode } from "react";
import LeftBar from "./_components/leftBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  if (!session) redirect("/login?redirectTo=/app");
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <div className="flex-none h-full">
          <LeftBar />
        </div>
        <div className="flex-1 overflow-y-scroll">{children}</div>
        <div className="flex-none">{/* right bar */}</div>
      </div>
    </div>
  );
}
