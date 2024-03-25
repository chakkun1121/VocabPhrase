import { Metadata } from "next";
import FilesTable from "./filesTable";

export default function DashboardPage() {
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
