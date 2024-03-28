import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default function Layout({
  params: { fileId },
  children,
}: {
  params: { fileId: string };
  children: ReactNode;
}) {
  if (fileId.length !== 33) notFound();
  return <>{children}</>;
}
