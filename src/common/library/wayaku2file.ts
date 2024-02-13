import { fileType } from "@/types/fileType";
import { wayakuObject } from "@/types/wayakuObjectType";
/**
 *
 * @param wayakuObject
 * @returns [title:string,fileContent]
 */
export function wayaku2file(wayakuObject: wayakuObject): [string, fileType] {
  return [
    wayakuObject.wayaku.h1["#text"],
    {
      mode: null,
      content: wayakuObject.wayaku.section.map((section) => ({
        id: section["@_sectionID"],
        en: section.p[0]["#text"],
        ja: section.p[1]["#text"],
      })),
    },
  ];
}
