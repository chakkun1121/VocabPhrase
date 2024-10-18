"use client";
import { Button } from "@/components/ui/button";
// @ts-ignore
import Article from "@/app/[lang]/(home)/(mdx_documents)/help/authority/page.mdx";
import Header from "@/components/layouts/header";
import { auth } from "@/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useError } from "@/common/hooks/useError";
import { useRouter } from "next/navigation";

export default function LoginPage({ redirectTo }: { redirectTo: string }) {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  console.log(user);
  const router = useRouter();

  if (user) {
    router.push(redirectTo);
  }
  useError(error);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center p-4">
        <h1 className="text-3xl py-2">ログイン</h1>
        <Button
          onClick={async () => {
            await signInWithGoogle([
              "openid",
              "https://www.googleapis.com/auth/userinfo.profile",
              "https://www.googleapis.com/auth/userinfo.email",
              "https://www.googleapis.com/auth/drive.appdata",
              "https://www.googleapis.com/auth/drive.install",
              "https://www.googleapis.com/auth/drive.file",
            ]);
          }}
          disabled={loading}>
          Googleアカウントでログイン
        </Button>
      </div>
      <article className="max-w-6xl mx-auto p-4 mt-10">
        <Article />
      </article>
    </>
  );
}
