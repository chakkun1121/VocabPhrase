import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function HeaderUserMenu() {
  const session = await getServerSession();
  return (
    <>
      <div className="flex-none items-center flex">
        {session?.user ? (
          <>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-8 h-8 rounded-full"
                src={session.user.image as string}
                alt="user icon"
              />
              <span className="ml-2">{session.user.name}</span>
            </div>
            {/* <ul className="absolute right-0 top-[80px] p-2 rounded-b bg-primary-100">
              <li className="list-style-none">
                <Link href="/logout">ログアウト</Link>
              </li>
            </ul> */}
          </>
        ) : (
          <Link href="/login?redirectTo=/app">ログイン</Link>
        )}
      </div>
    </>
  );
}
