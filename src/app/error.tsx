"use client"; // Error components must be Client Components

import Link from "next/link";
import { useEffect } from "react";
import { CONTACT_FORM_ERROR, CONTACT_FORM_URL } from "./[lang]/meta";
import { Button } from "@/components/ui/button";

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
    <div className="text-center">
      <h2 className="text-2xl text-red-500">エラーが発生しました。</h2>
      {/* <p>
        <Link
          href={
            CONTACT_FORM_URL?.replace(
              "{{content}}",
              CONTACT_FORM_ERROR
            ).replace("{{error}}", error.message) || ""
          }
          target="_blank"
        >
          お問い合わせフォーム
        </Link>
      </p> */}
      <Button asChild>
        <Link href="/logout?redirectTo=/login?redirectTo=dashboard">
          ログインし直す
        </Link>
      </Button>
    </div>
  );
}
