import Header from "@/app/_components/header";
import { ReactNode } from "react";
import Footer from "../_components/footer";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 h-screen">
      <Header />
      <main className="flex-1 p-4 !select-text">{children}</main>
      <Footer />
    </div>
  );
}
