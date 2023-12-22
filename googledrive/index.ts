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
  fileContent: string
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
    }
  ).then((res) => res.json());
}
export function updateFileInfo(
  token: string,
  fileId: string,
  newFileInfo: object
) {
  return fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(newFileInfo),
  }).then((res) => res.json());
}
