import { redirect } from "next/navigation";
import Speaking from "@/components/functional/speaking";
import { speakingMode } from "../menu";
import { getTranslation } from "@/app/i18n/server";

export default async function Page({
  params: { fileId, lang, mode },
}: {
  params: { fileId: string; lang: "ja" | "en"; mode: string };
}) {
  if (!fileId || !speakingMode.find(m => m.id === mode)) redirect("./");
  const { t } = await getTranslation(lang);
  return (
    <>
      {/* 録音を強制的に止めるためにaタグを使用 */}
      <a href="./" className="underline text-blue-800">
        {t("speaking:backToSelect")}
      </a>
      <Speaking fileId={fileId} mode={mode} lang={lang} />
    </>
  );
}
export function generateStaticParams() {
  return speakingMode.map(mode => ({ mode: mode.id }));
}
