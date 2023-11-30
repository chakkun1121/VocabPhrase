import Link from "next/link";

export default function HeaderAppTitle() {
  return (
    <div className="flex-1">
      <Link
        href="/"
        aria-label="ホームへ"
        className="text-black hover:text-black visited:text-black no-underline"
      >
        <h1>VocabPhrase</h1>
      </Link>
    </div>
  );
}
