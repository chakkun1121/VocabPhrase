import Link from "next/link";
import Image from "next/image";
import Footer from "../_components/footer";

export default function Home() {
  return (
    <>
      <header className="flex p-4 bg-primary-200 fixed left-0 w-full opacity-75	backdrop-blur-lg">
        <div className="flex-1 flex">
          <Link
            href="/"
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
      <main className=" bg-gradient-to-br from-primary-200 to-JungleGreen-200">
        <section className="h-screen text-center p-10 grid content-center">
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-4xl">英文、英単語専用のweb単語帳アプリ</h2>
            <h1 className="text-6xl">VocabPhrase</h1>
            <Image
              src="/img/app.webp"
              alt="アプリケーション画面"
              width={800}
              height={452}
              className="max-w-full"
              // priority={true} //画像サイズがでかすぎて遅延読み込みのほうが早かった
            />
          </div>
        </section>
        <div className="p-4 mx-auto max-w-7xl w-full grid gap-8">
          <section>
            <h2>VocabPhraseとは?</h2>
            <p>
              VocabPhraseとは英文、英単語専用のwebで使える単語帳アプリです。
            </p>
          </section>
          <section>
            <h2>機能紹介</h2>
            <div className="grid gap-4">
              <div className="flex flex-wrap w-full">
                <div className="flex-1 w-full">
                  <h3>単語帳を作る</h3>
                  <p>
                    このアプリを使用して自分で単語帳を作成できます。作成した単語帳はあなたのGoogleDriveに保存されます。
                  </p>
                </div>
                <Image
                  className="flex-none max-w-full"
                  src="/img/createfile-animation.webp"
                  alt="単語帳を作る"
                  width={600}
                  height={336}
                />
              </div>
              <div className="flex flex-wrap w-full">
                <div className="flex-1">
                  <h3 className="flex-1">フラッシュカードで暗記する</h3>
                  <p>
                    作成した単語帳はフラッシュカードで暗記できます。
                    <br />
                    日本語から英語と英語から日本語のモードがあります。
                    <br />
                    また、できた問題をチェックすることができるので効率的に学べます。
                  </p>
                </div>
                <Image
                  className="flex-none max-w-full"
                  src="/img/flashcard-animation.webp"
                  alt="フラッシュカード"
                  width={600}
                  height={336}
                />
              </div>
              <div className="flex flex-wrap w-full">
                <div className="flex-1">
                  <h3 className="flex-1">スピーキング練習(開発中)</h3>
                  <p>
                    このアプリでは単語帳機能だけではなく、作成した単語帳のスピーキング練習ができます。
                  </p>
                </div>
                <Image
                  className="flex-none max-w-full"
                  src="/img/speaking-animation.webp"
                  alt="スピーキング練習ページ"
                  width={600}
                  height={336}
                />
              </div>
            </div>
          </section>
          <section className="text-center sticky bottom-4">
            <Link
              href="/app"
              className="text-black bg-Pizazz-200 hover:bg-Pizazz-300 p-4 rounded visited:text-black hover:text-black"
            >
              早速使ってみる
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
