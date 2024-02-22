import { redirect } from "next/navigation";
import Speaking from "./main";
import { speakingMode } from "../menu";
import { getTranslation } from "@/app/i18n/server";

export default async function Page({
  params: { lang, mode },
  searchParams: { fileId },
}: {
  params: { lang: "ja" | "en"; mode: string };
  searchParams: { fileId: string };
}) {
  if (!fileId || !speakingMode.find(m => m.id === mode)) redirect("./speaking");
  const { t } = await getTranslation(lang);
  return (
    <>
      {/* 録音を強制的に止めるためにaタグを使用 */}
      <a href={"./?fileId=" + fileId}>{t("speaking:backToSelect")}</a>
      <Speaking fileId={fileId} mode={mode} lang={lang} />
    </>
  );
}
