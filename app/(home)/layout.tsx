import Header from "@/app/_components/header";
import Link from "next/link";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="flex-none text-center p-4 bg-BahamaBlue-700 text-white justify-center">
        <p>© 2023 chakkun1121</p>
        <div className="flex justify-center gap-4">
          <Link
            className="text-white hover:text-white visited:text-white"
            href=""
          >
            利用規約
          </Link>
          <Link
            className="text-white hover:text-white visited:text-white"
            href=""
          >
            プライバシーポリシー
          </Link>
          <Link
            className="text-white hover:text-white visited:text-white"
            href=""
          >
            お問い合わせ
          </Link>
        </div>
      </footer>
    </div>
  );
}
