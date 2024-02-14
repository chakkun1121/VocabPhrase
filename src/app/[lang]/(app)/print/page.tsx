import { redirect } from "next/navigation";
import PrintPage from "./main";
import { Metadata } from "next";

export default function Print({
  searchParams: { fileId },
}: {
  searchParams: { fileId?: string };
}) {
  if (!fileId) redirect("/app");
  return <PrintPage fileId={fileId} />;
}
export const metadata: Metadata = {
  title: "印刷ページ",
  alternates: {
    canonical: "/print",
  },
};
