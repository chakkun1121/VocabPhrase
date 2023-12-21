import { google } from "googleapis";

export async function GET(request: Request) {
  const fileId = request.headers.get("fileID");
  if (!fileId) throw new Error("No file ID provided");
  const token = request.headers.get("Authorization");
  if (!token) throw new Error("No token provided");
  const service = google.drive({ version: "v3", auth: token });

  try {
    const file = await service.files.get({
      fileId: fileId,
      alt: "media",
    });
    console.log(file.status);

    return file.status;
  } catch (err) {
    // TODO(developer) - Handle error
    throw err;
  }
}
