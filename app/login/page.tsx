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
                scope: [
                  "https://www.googleapis.com/auth/drive.appdata",
                  "https://www.googleapis.com/auth/drive.install",
                  "https://www.googleapis.com/auth/drive.file",
                ].join(" "),
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
