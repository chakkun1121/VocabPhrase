import { redirect } from "next/navigation";
import { speakingMode } from "./menu";
import Link from "next/link";
import { getTranslation } from "@/app/i18n/server";
import Print from "@/components/functional/print";

export default async function Speaking({
  params: { lang },
  searchParams: { fileId },
}: {
  params: { lang: "ja" | "en" };
  searchParams: { fileId: string };
}) {
  if (!fileId) redirect("/app");
  const { t } = await getTranslation(lang);
  return (
    <>
      <Print fileId={fileId} />
      <h2>{t("speaking:title")}</h2>
      <div>
        <p>{t("speaking:select")}</p>
        <ul>
          {speakingMode.map(mode => (
            <li key={mode.id}>
              <Link href={`./speaking/${mode.id}?fileId=${fileId}`}>
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
