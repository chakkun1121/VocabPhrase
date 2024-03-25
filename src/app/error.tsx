"use client"; // Error components must be Client Components

import Link from "next/link";
import { useEffect } from "react";
import { CONTACT_FORM_ERROR, CONTACT_FORM_URL } from "./[lang]/meta";

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
      <div className="">
        <p>
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
        </p>
        <p>
          <Link href="/logout?redirectTo=/login?redirectTo=app">
            ログインし直す
          </Link>
        </p>
      </div>
    </div>
  );
}
