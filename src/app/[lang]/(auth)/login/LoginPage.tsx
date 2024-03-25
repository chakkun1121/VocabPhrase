"use client";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { status } = useSession();
  return (
    <>
      <div className="flex flex-col items-center p-4">
        <h1 className="text-3xl">ログイン</h1>
        <Button
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
          googleでログイン
        </Button>
      </div>
    </>
  );
}
