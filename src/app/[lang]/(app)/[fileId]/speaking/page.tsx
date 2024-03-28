import { redirect } from "next/navigation";
import { speakingMode } from "./menu";
import Link from "next/link";
import { getTranslation } from "@/app/i18n/server";

export default async function Speaking({
  params: { lang, fileId },
}: {
  params: { lang: "ja" | "en"; fileId: string };
}) {
  if (!fileId) redirect("/app");
  const { t } = await getTranslation(lang);
  return (
    <>
      <h2 className="text-2xl">{t("speaking:title")}</h2>
      <div>
        <p>{t("speaking:select")}</p>
        <ul className="list-disc pl-6">
          {speakingMode.map(mode => (
            <li key={mode.id}>
              <Link className="text-xl" href={`./speaking/${mode.id}`}>
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
