"use client";
import { signOut } from "next-auth/react";

export default function LogoutPage() {
  signOut();
  return <p>ログアウト中...</p>;
}
