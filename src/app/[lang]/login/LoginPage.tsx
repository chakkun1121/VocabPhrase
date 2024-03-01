import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginPage({ redirectTo }: { redirectTo: string }) {
  return (
    <>
      <form
        className="flex flex-col items-center"
        action={async () => {
          "use server";
          await signIn();
          redirect(decodeURI(redirectTo));
        }}
      >
        <h1>ログイン</h1>
        <button
        // onClick={() =>
        //   signIn(
        //     "google",
        //     {},
        //     {
        //       prompt: "login",
        //       callbackUrl: new URL(
        //         decodeURI(redirectTo),
        //         window.location.origin
        //       ).toString(),
        //     }
        //   )
        // }
        // disabled={status === "loading"}
        >
          ログイン
        </button>
      </form>
    </>
  );
}
