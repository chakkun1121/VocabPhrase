"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useSession } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuListItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function HeaderUserInfo() {
  const { data: session } = useSession();
  console.log(session);
  if (!session?.user) return null;
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-2 h-full">
            <Avatar>
              <AvatarImage src={session?.user?.image} />
              <AvatarFallback>{session?.user?.name}</AvatarFallback>
            </Avatar>
            <p className="text-xl">{session?.user?.name}</p>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuListItem
              href=""
              title={session?.user?.email || ""}
            />
            <NavigationMenuListItem href="/dashboard" title="ダッシュボード" />
            <NavigationMenuListItem href="/settings" title="設定" />
            <hr className="my-2" />
            <NavigationMenuListItem href="/logout" title="ログアウト" />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
