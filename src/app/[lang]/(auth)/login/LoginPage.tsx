"use client";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Article from "@/app/[lang]/(home)/(mdx_documents)/help/authority/page.mdx";
import Header from "@/components/layouts/header";

export default function LoginPage() {
  const { status } = useSession();
  return (
    <>
      <Header />
      <div className="flex flex-col items-center p-4">
        <h1 className="text-3xl py-2">ログイン</h1>
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
          Googleアカウントでログイン
        </Button>
      </div>
      <article className="max-w-6xl mx-auto p-4 mt-10">
        <Article />
      </article>
    </>
  );
}
