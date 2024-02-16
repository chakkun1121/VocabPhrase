import Link from "next/link";
import { ReactNode } from "react";

export default function HelpPageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <section>
        <Link href="/help">ヘルプページトップへ</Link>
      </section>
      {children}
    </>
  );
}
