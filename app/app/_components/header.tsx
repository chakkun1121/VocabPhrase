import HeaderAppTitle from "@/app/_components/headerAppTitle";

export default function Header() {
  return (
    <header className="flex p-4 bg-primary-200">
      <HeaderAppTitle />
      <div className="flex-none"></div>
    </header>
  );
}
