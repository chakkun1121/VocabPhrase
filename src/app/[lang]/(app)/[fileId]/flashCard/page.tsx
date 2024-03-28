import Card from "@/components/functional/flashCard";

export default function FlashCard({
  params: { fileId },
}: {
  params: { fileId: string };
}) {
  return <Card fileId={fileId} key={fileId} />;
}
export const metadata = {
  title: "フラッシュカード",
};
