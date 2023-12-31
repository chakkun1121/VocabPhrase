import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginPage from "./LoginPage";
import { Metadata } from "next";

export default async function Login({
  searchParams: { redirectTo = "/" },
}: {
  searchParams: { redirectTo: string };
}) {
  const session = await getServerSession();
  if (session) {
    redirect(redirectTo);
  }
  return <LoginPage />;
}
export const metadata: Metadata = {
  title: "ログイン",
  robots: "noindex",
};
