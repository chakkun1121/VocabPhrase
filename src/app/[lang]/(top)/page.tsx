import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/layouts/footer";
import Header from "@/components/layouts/header";
import { getTranslation } from "@/app/i18n/server";

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const { t } = await getTranslation(lang);
  return (
    <>
      <Header
        rightContent={
          <Link href="/app" className="">
            {t("top:header")}
          </Link>
        }
        className="opacity-75 backdrop-blur-lg"
      />
      <main className="  !select-text">
        <section className="h-screen text-center p-10 grid content-center">
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-4xl">{t("top:catchCopy")}</h2>
            <h2 className="text-6xl">VocabPhrase</h2>
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
          {lang == "en" && (
            <p className="text-heading-S text-[#ff0000]">
              Warning:This app is intended for Japanese people to learn English.
              I&apos;m sorry, but we do not plan for use by native English
              speakers.
            </p>
          )}
          <section className="my-4">
            <h2>{t("top:whatIs")}</h2>
            <p>{t("top:about")} </p>
          </section>
          <section className="my-4">
            <h2>{t("top:functions:title")}</h2>
            <div className="">
              {[
                {
                  title: t("top:functions:1:title"),
                  description: t("top:functions:1:description"),
                  image: "/img/createfile-animation.webp",
                  imageAlt: t("top:functions:1:alt"),
                  width: 600,
                  height: 336,
                },
                {
                  title: t("top:functions:2:title"),
                  description: t("top:functions:2:description"),
                  image: "/img/flashcard-animation.webp",
                  imageAlt: t("top:functions:2:alt"),
                  width: 600,
                  height: 336,
                },
                {
                  title: t("top:functions:3:title"),
                  description: t("top:functions:3:description"),
                  image: "/img/speaking-animation.webp",
                  imageAlt: t("top:functions:3:alt"),
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
            {/* <h2>
              詳しい機能などは
              <Link href="/help" className="text-heading-M" target="_blank">
                こちら
              </Link>
            </h2> */}
          </section>
          <section className="text-center sticky bottom-4 my-4">
            <Link
              href="/app"
              className="text-black bg-Pizazz-200 hover:bg-Pizazz-300 p-4 rounded visited:text-black hover:text-black"
            >
              {t("top:letsUse")}
            </Link>
          </section>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
