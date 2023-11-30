import Header from "./_components/header";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid">
      <Header />
      <div className="flex">
        <div className="flex-none"></div>
        {children}
      </div>
    </div>
  );
}
