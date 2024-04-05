"use client";
import { useToken } from "@/common/hooks/useToken";
import FileMenu from "@/components/functional/edit";
import Loading from "@/components/ui-elements/loading";
import { useFile } from "@/googledrive/useFile";
import { useDocumentTitle } from "@uidotdev/usehooks";

export default function Page({
  params: { fileId, lang },
}: {
  params: { fileId: string; lang: string };
}) {
  const token = useToken();
  const {
    title,
    setTitle,
    fileContent,
    setFileContent,
    loading,
    saving,
    saveFileContent,
    saveFileInfo,
    readOnly,
  } = useFile(token, fileId);
  useDocumentTitle(
    title
      ? `${title
          .split(".")
          .slice(0, -1)
          .join(".")} | 編集ページ | vocabphrase | chakkun1121`
      : "アプリ | vocabphrase | chakkun1121 "
  );
  if (loading) return <Loading />;
  return (
    <main className="max-w-7xl p-2 mx-auto">
      <FileMenu
        fileId={fileId}
        key={fileId}
        title={title}
        setTitle={setTitle}
        fileContent={fileContent}
        setFileContent={setFileContent as any}
        loading={loading}
        saving={saving}
        saveFileContent={saveFileContent}
        saveFileInfo={saveFileInfo}
        readOnly={readOnly}
      />
    </main>
  );
}
