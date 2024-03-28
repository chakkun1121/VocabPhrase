import FileMenu from "@/components/functional/edit";

export default function Page({
  params: { fileId, lang },
}: {
  params: { fileId: string; lang: string };
}) {
  return (
    <main className="max-w-7xl p-2 mx-auto">
      <FileMenu fileId={fileId} key={fileId} />
    </main>
  );
}
