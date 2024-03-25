import Header from "@/components/layouts/header";

export default function NotFound({ lang }: { lang: string }) {
  return (
    <>
      <Header />
      <div className="text-center mt-20">Not Found</div>
    </>
  );
}
