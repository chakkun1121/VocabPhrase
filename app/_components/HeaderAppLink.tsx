"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderAppLink() {
  const { data: session, status } = useSession();
  const pathName = usePathname();
  return (
    <div className="flex-none items-center flex">
      {status === "authenticated" ? (
        <Link href="/app" className="">
          単語帳を使う
        </Link>
      ) : (
        <Link href={`/login?redirectTo=${pathName}`}>ログイン</Link>
      )}
    </div>
  );
}
