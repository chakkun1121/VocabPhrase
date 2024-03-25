import Header from "@/components/layouts/header";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  if (!session) redirect("/login?redirectTo=/app");
  return (
    <>
      <Header className="hidden md:flex" />
      <div className="h-20 hidden md:flex" />
      {children}
    </>
  );
}
export const metadata: Metadata = {
  robots: "noindex",
};
