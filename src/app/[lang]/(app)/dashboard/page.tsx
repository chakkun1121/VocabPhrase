import { Metadata } from "next";
import FilesTable from "./filesTable";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage({
  searchParams: { state },
}: {
  searchParams: { state: string };
}) {
  const stateFileId = JSON.parse(state || "{}")?.ids?.[0];
  if (stateFileId) redirect(`./${stateFileId}`);
  return (
    <section className="mx-auto items-center max-w-7xl p-4">
      <div className="flex items-center justify-between py-2">
        <h1 className="text-2xl">最近使用したファイル</h1>
        <Button asChild>
          <Link href="./create">新規作成</Link>
        </Button>
      </div>
      <FilesTable />
    </section>
  );
}
export const metadata: Metadata = {
  title: "ダッシュボード",
};
