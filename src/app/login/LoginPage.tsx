"use client";
import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
  const { status } = useSession();
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
