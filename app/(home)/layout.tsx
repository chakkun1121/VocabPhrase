import Header from "@/app/_components/header";
import Link from "next/link";
import { env } from "process";
import { ReactNode } from "react";
import { CONTACT_FORM_URL } from "../meta";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 h-screen">
      <Header />
      <main className="flex-1 p-4">{children}</main>
      <Footer />
    </div>
  );
}
export function Footer() {
  return (
    <footer className="flex-none text-center p-4 bg-BahamaBlue-700 text-white justify-center">
      <p>© 2023 chakkun1121</p>
      <div className="flex justify-center gap-4">
        <Link
          className="text-white hover:text-white visited:text-white"
          href="/terms"
        >
          利用規約
        </Link>
        <Link
          className="text-white hover:text-white visited:text-white"
          href="/privacy"
        >
          プライバシーポリシー
        </Link>
        <Link
          className="text-white hover:text-white visited:text-white"
          href={
            CONTACT_FORM_URL?.replace("{{content}}", "").replace(
              "{{error}}",
              ""
            ) || ""
          }
          target="_blank"
        >
          お問い合わせ
        </Link>
      </div>
    </footer>
  );
}
