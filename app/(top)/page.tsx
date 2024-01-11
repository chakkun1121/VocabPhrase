import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <header className="flex p-4 bg-primary-200 fixed left-0 w-full">
        <div className="flex-1 flex">
          <Link
            href="/"
            aria-label="ホームへ"
            className="text-black hover:text-black visited:text-black no-underline"
          >
            <h1>VocabPhrase</h1>
          </Link>
        </div>
        <div className="flex-none items-center flex">
          <Link href="/app" className="">
            単語帳を使う
          </Link>
        </div>
      </header>
      <section className="h-screen text-center p-10 grid content-center bg-gradient-to-br from-primary-200 to-JungleGreen-200">
        <div className="flex flex-col items-center gap-8">
          <h2 className="text-4xl">英文、英単語専用のweb単語帳アプリ</h2>
          <h1 className="text-6xl">VocabPhrase</h1>
          <Image
            src="/img/app.webp"
            alt="アプリケーション画面"
            width={800}
            height={452}
          />
        </div>
      </section>
    </div>
  );
}
