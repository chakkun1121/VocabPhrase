import { Metadata } from "next";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="w-full max-w-7xl mx-auto p-4">{children}</main>;
}
export const metadata: Metadata = {
  title: "スピーキング練習ページ",
};
