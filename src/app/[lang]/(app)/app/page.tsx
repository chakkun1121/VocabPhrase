import Print from "@/components/functional/print";
import FileMenu from "./_components/edit/main";
import HowToUse from "./howToUse";

export default function App({
  searchParams: { fileId },
}: {
  searchParams: { fileId?: string };
}) {
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
