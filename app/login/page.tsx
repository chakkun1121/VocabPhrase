"use client";

import { useSignin } from "@/firebase/client/auth";

export default function Login() {
  const [signIn] = useSignin();
  return (
    <div>
      <h1>ログイン</h1>
      <button onClick={signIn}>ログイン</button>
    </div>
  );
}
