import Link from "next/link";

export default function Header() {
  return (
    <header className="flex p-4 bg-primary-200">
      <div className="flex-1">
        <h1>VocabPhrase</h1>
      </div>
      <div className="flex-none items-center flex">
        <Link href="/app">単語帳を使う</Link>
      </div>
    </header>
  );
}
