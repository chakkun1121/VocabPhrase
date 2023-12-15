import HeaderAppTitle from "./headerAppTitle";
import HeaderAppLink from "./HeaderAppLink";

export default function Header() {
  return (
    <header className="flex p-4 bg-primary-200">
      <HeaderAppTitle />
      <HeaderAppLink />
    </header>
  );
}
