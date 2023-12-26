export function getFileInfo(token: string, fileId: string) {
  return fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .catch((e) => {
      throw e;
    });
}
export function getFileContent(token: string, fileId: string) {
  return fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }
  )
    .then((res) => res.text())
    .catch((e) => {
      throw e;
    });
}
export function uploadFile(
  token: string,
  fileId: string,
  fileContent: string,
  cancelSignal?: AbortSignal
) {
  return fetch(
    `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: fileContent,
      signal: cancelSignal,
    }
  ).then((res) => res.json());
}
export function updateFileInfo(
  token: string,
  fileId: string,
  newFileInfo: object,
  cancelSignal?: AbortSignal
) {
  return fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(newFileInfo),
    signal: cancelSignal,
  }).then((res) => res.json());
}
export function listFiles(
  token: string,
  q = "",
  pageSize = 100,
  pageToken = "",
  other = ""
) {
  return fetch(
    `https://www.googleapis.com/drive/v3/files?pageSize=${pageSize}&q=${q}&pageToken=${pageToken}&${other}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }
  ).then((res) => res.json());
}
