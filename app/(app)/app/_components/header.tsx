import HeaderAppTitle from "@/app/_components/headerAppTitle";
import HeaderUserMenu from "@/app/_components/headerUserMenu";

export default function Header() {
  return (
    <header
      className="flex flex-none p-4 bg-primary-200"
      style={{
        gridArea: "1 / 1 / 2 / 3",
      }}
    >
      <HeaderAppTitle />
      {/* <HeaderUserMenu /> */}
    </header>
  );
}
