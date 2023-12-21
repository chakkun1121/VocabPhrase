import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutPage from "./LogoutPage";

export default async function Login({
  searchParams: { redirectTo = "/" },
}: {
  searchParams: { redirectTo: string };
}) {
  const session = await getServerSession();

  if (!session) {
    redirect(redirectTo);
  }
  return <LogoutPage />;
}
