import HeaderAppTitle from "@/app/_components/headerAppTitle";
import HeaderUserMenu from "@/app/_components/headerUserMenu";

export default function Header() {
  return (
    <header className="flex flex-none p-4 bg-primary-200">
      <HeaderAppTitle />
      <HeaderUserMenu />
    </header>
  );
}
