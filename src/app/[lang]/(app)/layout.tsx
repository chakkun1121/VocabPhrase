import Header from "@/components/layouts/header";
import { HeaderUserInfo } from "@/components/layouts/headerUserInfo";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  if (!session) redirect("/login?redirectTo=/dashboard");
  return (
    <>
      <Header
        className="flex"
        rightContent={
          // <Link href="/dashboard">ダッシュボード</Link>
          <HeaderUserInfo />
        }
      />
      {children}
    </>
  );
}
export const metadata: Metadata = {
  robots: "noindex",
};
