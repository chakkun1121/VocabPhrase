"use client";
export function removeExtension(fileName: string): string {
  return fileName.split(".").slice(0, -1).join(".");
}
