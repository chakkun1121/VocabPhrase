import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import RightClick from "../../../components/functional/rightClick";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  if (!session) redirect("/login?redirectTo=/app");
  return (
    <>
      {children} {process.env.NOT_USE_RIGHT_CLICK ? <></> : <RightClick />}
    </>
  );
}
export const metadata: Metadata = {
  robots: "noindex",
};
