import { fileType } from "@/types/fileType";
import { uuidv7 as createUUID } from "uuidv7";

export function csvToFileContent(
  csv: string[][],
  mode?: "en-ja" | "ja-en"
): fileType["content"] {
  const lines = csv[1].length;
  if (!mode) mode = isEnglish(csv[1][lines % 2]) ? "en-ja" : "ja-en";
  let fileContent: fileType["content"];
  if (lines === 2) {
    fileContent = csv.map((line) => ({
      id: createUUID(),
      en: line[mode === "en-ja" ? 0 : 1],
      ja: line[mode === "ja-en" ? 0 : 1],
    }));
  } else if (lines === 3) {
    fileContent = csv.map((line) => ({
      id: createUUID(),
      en: line[mode === "en-ja" ? 0 : 1],
      ja: line[mode === "ja-en" ? 0 : 1],
      hint: line[2],
    }));
  } else if (lines === 4) {
    fileContent = csv.map((line) => ({
      id: createUUID(),
      en: `${line[mode === "en-ja" ? 0 : 1]} ${
        line[mode === "en-ja" ? 2 : 3] ? `(${[mode === "en-ja" ? 2 : 3]})` : ``
      }`,
      ja: `${line[mode === "ja-en" ? 0 : 1]}${
        line[mode === "ja-en" ? 2 : 3] ? `(${[mode === "ja-en" ? 2 : 3]})` : ``
      }`,
    }));
  } else if (lines === 5) {
    fileContent = csv.map((line) => ({
      id: createUUID(),
      en: `${line[mode === "en-ja" ? 1 : 2]} ${
        line[mode === "en-ja" ? 3 : 4] ? `(${[mode === "en-ja" ? 3 : 4]})` : ``
      }`,
      ja: `${line[mode === "ja-en" ? 1 : 2]}${
        line[mode === "ja-en" ? 3 : 4] ? `(${[mode === "ja-en" ? 3 : 4]})` : ``
      }`,
    }));
  } else throw new Error("ファイル形式が不正です");
  return fileContent;
}
export function isEnglish(text: string) {
  /**
   * 英語の判定(unicode上で225以上の数が入っていないか)
   * @param text 判定する文字列
   */
  return !text.split("").some((char) => char.charCodeAt(0) >= 225);
}
