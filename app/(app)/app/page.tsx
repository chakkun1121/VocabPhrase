import { FileMenu } from "./FileMenu";
import HowToUse from "./howToUse";

export default function App({
  searchParams: { fileID },
}: {
  searchParams: { fileID?: string };
}) {
  if (!fileID) return <Home />;
  return <FileMenu fileID={fileID} key={fileID} />;
}
function Home() {
  return <HowToUse />;
}
