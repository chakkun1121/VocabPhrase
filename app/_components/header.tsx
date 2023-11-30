import Link from "next/link";
import HeaderAppTitle from "./headerAppTitle";

export default function Header() {
  return (
    <header className="flex p-4 bg-primary-200">
      <HeaderAppTitle />
      <div className="flex-none items-center flex">
        <Link href="/app">単語帳を使う</Link>
      </div>
    </header>
  );
}
