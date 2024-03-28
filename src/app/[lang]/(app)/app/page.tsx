import Print from "@/components/functional/print";
import FileMenu from "../../../../components/functional/edit";
import HowToUse from "./howToUse";
import { redirect } from "next/navigation";
import CreateFile from "./_components/createFile";

export default function App({
  searchParams: { fileId, state },
}: {
  searchParams: { fileId?: string; state?: string };
}) {
  const stateFileId = JSON.parse(state || "{}")?.ids?.[0];
  if (stateFileId) redirect(`./app?fileId=${stateFileId}`);
  const stateFolderId = JSON.parse(state || "{}")?.folderId;
  return (
    <>
      {fileId ? (
        <>
          <FileMenu fileId={fileId} key={fileId} />
          <Print fileId={fileId} />
        </>
      ) : (
        <Home />
      )}
      {stateFolderId && <CreateFile folderId={stateFolderId} />}
    </>
  );
}
function Home() {
  return <HowToUse />;
}
