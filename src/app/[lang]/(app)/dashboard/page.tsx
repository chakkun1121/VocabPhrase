import { Metadata } from "next";
import FilesTable from "./filesTable";
import { redirect } from "next/navigation";

export default function DashboardPage({
  searchParams: { state },
}: {
  searchParams: { state: string };
}) {
  const stateFileId = JSON.parse(state || "{}")?.ids?.[0];
  if (stateFileId) redirect(`./${stateFileId}`);
  return (
    <section className="mx-auto items-center max-w-7xl p-4">
      <h1 className="text-2xl">最近使用したファイル</h1>
      <FilesTable />
    </section>
  );
}
export const metadata: Metadata = {
  title: "ダッシュボード",
};
