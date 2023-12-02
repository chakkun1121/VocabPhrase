"use client";

import { useSignin, useUser } from "@/firebase/client/auth";
import { redirect } from "next/navigation";

export default function Login() {
  const user = useUser();
  const [signIn] = useSignin();
  if (user) {
    redirect("/");
  }
  return (
    <div className="flex flex-col items-center">
      <h1>ログイン</h1>
      <button onClick={signIn}>ログイン</button>
    </div>
  );
}
