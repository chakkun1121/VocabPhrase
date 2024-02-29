import LoginPage from "./LoginPage";
import { Metadata } from "next";

export default async function Login({
  searchParams: { redirectTo = "/" },
}: {
  searchParams: { redirectTo: string };
}) {
  return <LoginPage redirectTo={redirectTo} />;
}
export const metadata: Metadata = {
  title: "ログイン",
  robots: "noindex",
};
