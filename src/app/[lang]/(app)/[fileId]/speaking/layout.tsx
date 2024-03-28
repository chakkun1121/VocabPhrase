import Header from "@/components/layouts/header";
import { Metadata } from "next";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mt-20 w-full max-w-7xl mx-auto p-4">{children}</main>
    </>
  );
}
export const metadata: Metadata = {
  title: "スピーキング練習ページ",
};
