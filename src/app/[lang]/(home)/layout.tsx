import { getTranslation } from "@/app/i18n/server";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
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
  const session = await getServerSession();
  return (
    <>
      <Header
        rightContent={
          session ? (
            <Button asChild>
              <Link href="/dashboard" prefetch={false}>
                {t("top:header")}
              </Link>
            </Button>
          ) : (
            <Button className="" asChild>
              <Link href="/login" prefetch={false}>
                {t("top:login")}
              </Link>
            </Button>
          )
        }
      />
      <main className="!select-text">{children}</main>
      <Footer lang={lang} />
    </>
  );
}
