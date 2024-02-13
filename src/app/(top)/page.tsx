import Link from "next/link";
import Image from "next/image";
import Footer from "../../components/layouts/footer";
import Header from "@/components/layouts/header";

export default function Home() {
  return (
    <>
      <Header
        rightContent={
          <Link href="/app" className="">
            単語帳を使う
          </Link>
        }
        className="opacity-75 backdrop-blur-lg"
      />
      <main className=" bg-gradient-to-br from-primary-200 to-JungleGreen-200 !select-text">
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
        <div className="p-4 mx-auto max-w-7xl w-full">
          <section className="my-4">
            <h2>VocabPhraseとは?</h2>
            <p>
              VocabPhraseとは英文、英単語専用のwebで使える単語帳アプリです。
            </p>
          </section>
          <section className="my-4">
            <h2>機能紹介</h2>
            <div className="">
              {[
                {
                  title: "単語帳を作る",
                  description:
                    "このアプリを使用して自分で単語帳を作成できます。作成した単語帳はあなたのGoogleDriveに保存されます。",
                  image: "/img/createfile-animation.webp",
                  imageAlt: "単語帳を作る",
                  width: 600,
                  height: 336,
                },
                {
                  title: "フラッシュカードで暗記する",
                  description:
                    "作成した単語帳はフラッシュカードで暗記できます。日本語から英語と英語から日本語のモードがあります。また、できた問題をチェックすることができるので効率的に学べます。",
                  image: "/img/flashcard-animation.webp",
                  imageAlt: "フラッシュカード",
                  width: 600,
                  height: 336,
                },
                {
                  title: "スピーキング練習(開発中)",
                  description:
                    "このアプリでは単語帳機能だけではなく、作成した単語帳のスピーキング練習ができます。",
                  image: "/img/speaking-animation.webp",
                  imageAlt: "スピーキング練習ページ",
                  width: 600,
                  height: 336,
                },
              ].map((item, index) => (
                <div className="flex flex-wrap w-full my-2" key={index}>
                  <div className="flex-1">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <Image
                    className="flex-none !max-w-full md:block"
                    src={item.image}
                    alt={item.imageAlt}
                    width={item.width}
                    height={item.height}
                  />
                </div>
              ))}
            </div>
            <h2>
              詳しい機能などは
              <Link href="/help" className="text-heading-M" target="_blank">
                こちら
              </Link>
            </h2>
          </section>
          <section className="text-center sticky bottom-4 my-4">
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
