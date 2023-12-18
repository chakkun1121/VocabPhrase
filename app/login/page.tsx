"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Login({
  searchParams: { redirectTo = "/" },
}: {
  searchParams: { redirectTo: string };
}) {
  const { data: session, status } = useSession();
  console.log(session);
  if (session) {
    redirect(redirectTo);
  }
  return (
    <>
      <div className="flex flex-col items-center">
        <h1>ログイン</h1>
        <button
          onClick={() =>
            signIn(
              "google",
              {},
              {
        
                prompt: "login",
              }
            )
          }
          disabled={status === "loading"}
        >
          ログイン
        </button>
      </div>
    </>
  );
}
