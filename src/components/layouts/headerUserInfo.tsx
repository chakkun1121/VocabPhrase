import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { getServerSession } from "next-auth";

export async function HeaderUserInfo() {
  const session = await getServerSession();
  if (!session?.user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 h-full">
        <Avatar>
          <AvatarImage src={session?.user?.image || ""} />
          <AvatarFallback>{session?.user?.name}</AvatarFallback>
        </Avatar>
        <p className="text-xl">{session?.user?.name}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session?.user?.email}</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href="/dashboard">ダッシュボード</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">設定</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem title="" asChild>
          <Link href="/logout">ログアウト</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
