import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Header({
  rightContent = <></>,
  className,
}: {
  rightContent?: JSX.Element;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex px-4 flex-none bg-primary-200 h-20 fixed top-0 z-10 inset-x-0 shadow",
        className
      )}
    >
      <div className="flex-1 flex items-center">
        <Link
          href="/"
          aria-label="ホームへ"
          className="text-black hover:text-black visited:text-black no-underline flex items-center gap-2"
          prefetch={false}
        >
          <Image
            src="/icon48.webp"
            alt="VocabPhrase"
            width={48}
            height={48}
            className="rounded"
          />
          <h1 className="text-2xl">VocabPhrase</h1>
        </Link>
      </div>
      <div className="flex-none items-center flex">{rightContent}</div>
    </header>
  );
}
