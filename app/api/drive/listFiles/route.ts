import { google } from "googleapis";

export async function GET(request: Request) {
  const token = request.headers.get("Authorization");
  if (!token) return Response.json({ error: "No token provided" });
  const service = google.drive({ version: "v3", auth: token });
  const files: any[] = [];
  try {
    const res = await service.files.list({
      q: request.headers.get("q") || undefined,
      fields: "nextPageToken, files(id, name)",
      spaces: "drive",
      access_token: token,
    });
    // console.log(res);
    Array.prototype.push.apply(files, res.files);
    res?.data?.files?.forEach(function (file) {
      console.log("Found file:", file.name, file.id);
    });
    console.log(res.data.files);
    return Response.json(res.data.files);
  } catch (err) {
    // TODO(developer) - Handle error
    throw err;
  }
}
