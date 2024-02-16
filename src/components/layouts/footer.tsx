import Link from "next/link";
import { CONTACT_FORM_URL } from "../../app/[lang]/meta";
import { getTranslation } from "@/app/i18n/server";

export default async function Footer({ lang }: { lang: string }) {
  const { t } = await getTranslation(lang);

  return (
    <footer className="flex-none text-center p-4 bg-BahamaBlue-700 text-white justify-center">
      <p>© 2024 chakkun1121</p>
      <div className="flex justify-center gap-4">
        <Link
          className="text-white hover:text-white visited:text-white"
          href="/terms"
        >
          {t("footer:terms")}
        </Link>
        <Link
          className="text-white hover:text-white visited:text-white"
          href="/privacy"
        >
          {t("footer:privacy")}
        </Link>
        <Link
          className="text-white hover:text-white visited:text-white"
          href={
            CONTACT_FORM_URL?.replace("{{content}}", "").replace(
              "{{error}}",
              ""
            ) || ""
          }
          target="_blank"
        >
          {t("footer:contact")}
        </Link>
      </div>
    </footer>
  );
}
