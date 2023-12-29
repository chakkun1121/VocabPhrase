export async function uploadFile(): Promise<{
  content: string;
  fileName: string;
  fileHandle?: FileSystemFileHandle;
}> {
  async function showFilePicker() {
    if (!window.showOpenFilePicker)
      throw new Error("showOpenFilePicker is not defined");
    const FileSystemFileHandles: FileSystemFileHandle[] =
      await window.showOpenFilePicker({
        types: [
          {
            description: "和訳ファイル",
            accept: { "application/wayaku": ".wayaku" },
          },
        ],
      });
    const FileSystemFileHandle: FileSystemFileHandle = FileSystemFileHandles[0];
    return FileSystemFileHandle;
  }
  try {
    if (window.showOpenFilePicker) {
      const fileHandle = await showFilePicker();
      const file = await fileHandle.getFile();
      const content = await file.text();
      const fileName = file.name;
      return { content, fileName, fileHandle };
    }
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/wayaku";
    fileInput.click();
    const file = await new Promise<File>((resolve) => {
      fileInput.addEventListener("change", () => {
        const file = fileInput.files?.[0];
        if (!file) throw new Error("file is not defined");
        resolve(file);
      });
    });
    fileInput.remove();
    const content = await file.text();
    const fileName = file.name;
    return { content, fileName };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
