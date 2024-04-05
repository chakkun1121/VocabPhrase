import { getTranslation } from "@/app/i18n/server";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import Link from "next/link";
import { ReactNode } from "react";

export default async function Layout({
  params: { lang },
  children,
}: {
  params: { lang: string };
  children: ReactNode;
}) {
  const { t } = await getTranslation(lang);
  return (
    <>
      <Header
        rightContent={
          <Link href="/dashboard" className="">
            {t("top:header")}
          </Link>
        }
      />
      <main className="!select-text">{children}</main>
      <Footer lang={lang} />
    </>
  );
}
