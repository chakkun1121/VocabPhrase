import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import RightClick from "./_components/rightClick/main";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  if (!session) redirect("/login?redirectTo=/app");
  return (
    <>
      {children} <RightClick />
    </>
  );
}
export const metadata: Metadata = {
  robots: "noindex",
};
