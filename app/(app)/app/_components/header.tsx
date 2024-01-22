import HeaderAppTitle from "@/app/_components/headerAppTitle";
import HeaderUserMenu from "@/app/_components/headerUserMenu";

export default function Header() {
  return (
    <header className="hidden md:flex px-4 flex-none bg-primary-200 h-20 fixed top-0 z-10 left-0 right-0">
      <HeaderAppTitle />
      {/* <HeaderUserMenu /> */}
    </header>
  );
}
