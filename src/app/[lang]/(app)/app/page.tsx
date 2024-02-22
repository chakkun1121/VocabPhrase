import Print from "@/components/functional/print";
import FileMenu from "./_components/edit/main";
import HowToUse from "./howToUse";
import { redirect } from "next/navigation";

export default function App({
  searchParams: { fileId, state },
}: {
  searchParams: { fileId?: string; state?: string };
}) {
  const stateFileId = JSON.parse(state || "{}")?.ids?.[0];
  if (stateFileId) redirect(`./app?fileId=${stateFileId}`);
  return fileId ? (
    <>
      <FileMenu fileId={fileId} key={fileId} />
      <Print fileId={fileId} />
    </>
  ) : (
    <Home />
  );
}
function Home() {
  return <HowToUse />;
}
