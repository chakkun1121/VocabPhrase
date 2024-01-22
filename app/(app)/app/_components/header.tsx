import HeaderAppTitle from "@/app/_components/headerAppTitle";
import HeaderUserMenu from "@/app/_components/headerUserMenu";

export default function Header() {
  return (
    <header className="hidden md:flex px-4 flex-none bg-primary-200 h-20  sticky top-0 z-10">
      <HeaderAppTitle />
      {/* <HeaderUserMenu /> */}
    </header>
  );
}
