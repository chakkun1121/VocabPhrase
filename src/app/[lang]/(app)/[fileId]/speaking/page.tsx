import { notFound } from "next/navigation";
import { speakingMode } from "./menu";
import Link from "next/link";
import { getTranslation } from "@/app/i18n/server";
import Speaking from "@/components/functional/speaking";

export default async function Page({
  params: { lang, fileId },
  searchParams: { mode },
}: {
  params: { lang: "ja" | "en"; fileId: string };
  searchParams: { mode?: string };
}) {
  if (!fileId) notFound();
  const { t } = await getTranslation(lang);
  if (mode) {
    return (
      <>
        {/* 録音を強制的に止めるためにaタグを使用 */}
        <a href="./speaking" className="underline text-blue-800">
          {t("speaking:backToSelect")}
        </a>
        <Speaking fileId={fileId} mode={mode} lang={lang} />
      </>
    );
  }
  return (
    <>
      <h2 className="text-2xl">{t("speaking:title")}</h2>
      <div>
        <p>{t("speaking:select")}</p>
        <ul className="list-disc pl-6">
          {speakingMode.map(mode => (
            <li key={mode.id}>
              <Link
                className="text-xl underline text-blue-800"
                href={`./speaking?mode=${mode.id}`}
                prefetch={false}>
                {mode.name[lang]}
              </Link>
              <p>{mode.description[lang]}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
