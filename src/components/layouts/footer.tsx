import Link from "next/link";
import { CONTACT_FORM_URL } from "../../app/meta";

export default function Footer() {
  return (
    <footer className="flex-none text-center p-4 bg-BahamaBlue-700 text-white justify-center">
      <p>© 2024 chakkun1121</p>
      <div className="flex justify-center gap-4">
        <Link
          className="text-white hover:text-white visited:text-white"
          href="/terms"
        >
          利用規約
        </Link>
        <Link
          className="text-white hover:text-white visited:text-white"
          href="/privacy"
        >
          プライバシーポリシー
        </Link>
        <Link
          className="text-white hover:text-white visited:text-white"
          href={
            CONTACT_FORM_URL?.replace("{{content}}", "").replace(
              "{{error}}",
              ""
            ) || ""
          }
          target="_blank"
        >
          お問い合わせ
        </Link>
      </div>
    </footer>
  );
}
