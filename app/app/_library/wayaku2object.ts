import { wayakuObject } from "@/@types/wayakuObjectType";
import { XMLParser } from "fast-xml-parser";

/**
 *
 * @param wayakuData
 * @returns
 */
export function stringToObject(wayakuData: string): wayakuObject {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    allowBooleanAttributes: true,
  });
  return parser.parse(wayakuData) as wayakuObject;
}
