import { ReactNode } from "react";
import Footer from "../../../components/layouts/footer";
import Link from "next/link";
import Header from "@/components/layouts/header";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 h-screen">
      <Header
        rightContent={
          <Link href="/app" className="">
            単語帳を使う
          </Link>
        }
      />
      <main className="flex-1 p-4 !select-text mt-20">{children}</main>
      <Footer />
    </div>
  );
}
