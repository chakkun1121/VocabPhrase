"use client";

export default async function listFiles(token: string, _folder: string) {
  const result = await fetch(
    "https://www.googleapis.com/drive/v3/files?trashed=false",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );
  console.log(result);
  return result
}
