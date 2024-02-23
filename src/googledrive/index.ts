export async function getFileInfo(token: string, fileId: string) {
  try {
    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}?includePermissionsForView=published`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return await res.json();
  } catch (e) {
    throw e;
  }
}
export async function getFileContent(token: string, fileId: string) {
  try {
    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return await res.text();
  } catch (e) {
    throw e;
  }
}
export async function uploadFile(
  token: string,
  fileId: string,
  fileContent: string
) {
  const res = await fetch(
    `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: fileContent,
    }
  );
  return await res.json();
}
export async function updateFileInfo(
  token: string,
  fileId: string,
  newFileInfo: object
) {
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newFileInfo),
    }
  );
  return await res.json();
}
export async function listFiles(
  token: string,
  q = "",
  pageSize = 100,
  pageToken = "",
  other = ""
) {
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files?pageSize=${pageSize}&q=${q}&pageToken=${pageToken}&${other}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  return await res.json();
}
export function deleteFile(token: string, fileId: string) {
  return fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
}
export async function getFilePermission(token: string, fileId: string) {
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  return await res.json();
}
