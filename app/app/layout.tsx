import Header from "./_components/header";
import { ReactNode } from "react";
import LeftBar from "./_components/leftBar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <div className="flex-none h-full">
          <LeftBar />
        </div>
        <div className="flex-1">{children}</div>
        <div className="flex-none">{/* right bar */}</div>
      </div>
    </div>
  );
}
