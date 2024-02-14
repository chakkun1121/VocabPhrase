import MdxContent from "@/app/[lang]/(home)/(mdx_documents)/help/edit/page.mdx";
import Link from "next/link";
export default function HowToUse() {
  return (
    <div className="p-8 mx-auto max-w-6xl w-full">
      <MdxContent />
      <h2 className="mt-4">
        詳しい使い方は
        <Link href="/help" className="!text-heading-M" target="_target">
          こちら
        </Link>
      </h2>
    </div>
  );
}
