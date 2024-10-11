import Header from "@/components/layouts/header";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <html>
      <body>
        <Header />
        <main className="flex flex-col justify-center items-center gap-4 p-4">
          <h1 className="text-center text-4xl">404 Not Found</h1>
          <Button asChild variant="outline">
            <Link href="/">Home</Link>
          </Button>
        </main>
      </body>
    </html>
  );
}
