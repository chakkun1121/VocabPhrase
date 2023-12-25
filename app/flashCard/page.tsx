import { redirect } from "next/navigation";
import Card from "./card";

export default function FlashCard({
  searchParams: { fileId },
}: {
  searchParams: { fileId?: string };
}) {
  if (!fileId) redirect("/app");
  return <Card fileId={fileId} />;
}
