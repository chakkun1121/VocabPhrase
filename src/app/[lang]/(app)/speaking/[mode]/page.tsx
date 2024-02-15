import Header from "@/components/layouts/header";
import { redirect } from "next/navigation";
import Speaking from "./main";

export default function Page({
  params: { lang, mode },
  searchParams: { fileId },
}: {
  params: { lang: string; mode: string };
  searchParams: { fileId: string };
}) {
  if (!fileId) redirect("/app");
  return (
    <>
      <Header />
      <Speaking fileId={fileId} mode={mode} />
    </>
  );
}
