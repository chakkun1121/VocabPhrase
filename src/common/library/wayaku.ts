import { fileType } from "@/types/fileType";
import { fixWayakuFile } from "./fixWayakuFile";
import { stringToObject } from "./wayaku2object";
import { wayaku2file } from "./wayaku2file";
import { uploadFile } from "./uploadFile";

export async function wayakuFile2file(): Promise<[string, fileType]> {
  const { content: wayaku } = await uploadFile();
  if (!wayaku) throw new Error("wayaku is not defined");
  const fixedWayakuFile = fixWayakuFile(wayaku);
  const wayakuObject = stringToObject(fixedWayakuFile);
  const [title, content] = wayaku2file(wayakuObject);
  return [title, content];
}
