import FileMenu from "./_components/edit/main";
import HowToUse from "./howToUse";
import Print from "./print";

export default function App({
  searchParams: { fileID },
}: {
  searchParams: { fileID?: string };
}) {
  return fileID ? (
    <>
      <FileMenu fileID={fileID} key={fileID} />
      <Print fileId={fileID} />
    </>
  ) : (
    <Home />
  );
}
function Home() {
  return <HowToUse />;
}
