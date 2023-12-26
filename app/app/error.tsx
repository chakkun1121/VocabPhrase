"use client"; // Error components must be Client Components

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>エラーが発生しました。</h2>
      <Link href="">お問い合わせフォーム</Link>
      <Link href="/logout?redirectTo=/login?redirectTo?app">
        ログインし直す
      </Link>
    </div>
  );
}
