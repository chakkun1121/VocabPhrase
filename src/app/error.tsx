"use client"; // Error components must be Client Components

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layouts/header";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <Header />
        <div className="text-center">
          <h2 className="text-2xl text-red-500">エラーが発生しました。</h2>
          <Button asChild>
            <Link href="/logout?redirectTo=/login?redirectTo=dashboard">
              ログインし直す
            </Link>
          </Button>
        </div>
      </body>
    </html>
  );
}
