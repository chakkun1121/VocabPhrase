import { redirect } from "next/navigation";
import Card from "./main";
import Print from "@/components/functional/print";

export default function FlashCard({
  searchParams: { fileId },
}: {
  searchParams: { fileId?: string };
}) {
  if (!fileId) redirect("/app");
  return (
    <>
      <Print fileId={fileId} />
      <Card fileId={fileId} key={fileId} />
    </>
  );
}
export const metadata = {
  title: "フラッシュカード",
};
