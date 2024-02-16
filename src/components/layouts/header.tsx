import React from "react";
import Link from "next/link";

export default function Header({
  rightContent = <></>,
  className,
}: {
  rightContent?: JSX.Element;
  className?: string;
}) {
  return (
    <header
      className={
        "flex px-4 flex-none bg-primary-200 h-20 fixed top-0 z-10 inset-x-0 " +
        className
      }
    >
      <div className="flex-1 flex items-center">
        <Link
          href="/"
          aria-label="ホームへ"
          className="text-black hover:text-black visited:text-black no-underline"
        >
          <h1>VocabPhrase</h1>
        </Link>
      </div>{" "}
      <div className="flex-none items-center flex">{rightContent}</div>
    </header>
  );
}
