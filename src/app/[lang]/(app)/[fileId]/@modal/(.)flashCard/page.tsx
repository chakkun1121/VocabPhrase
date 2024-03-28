"use client";
import FlashCard from "@/components/functional/flashCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({
  params: { fileId },
}: {
  params: { fileId: string };
}) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (!isOpen) router.push(`/${fileId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  return (
    <Dialog open={isOpen} defaultOpen onOpenChange={o => setIsOpen(o)}>
      <DialogContent className="w-5/6 h-5/6 max-w-none">
        <FlashCard />
      </DialogContent>
    </Dialog>
  );
}
