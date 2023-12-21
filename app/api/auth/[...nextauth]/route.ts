import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { customSession } from "../../../../@types/customSession";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: [
            "openid",
            "https://www.googleapis.com/auth/drive.appdata",
            "https://www.googleapis.com/auth/drive.install",
            "https://www.googleapis.com/auth/drive.file",
          ].join(" "),
        },
      },
    }),
  ],

  callbacks: {
    //jwtが作成・更新された時に呼ばれる
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    //セッションがチェックされた時に呼ばれる
    async session({ session, token }: { session: Session & { accessToken?: string }, token: any }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
export { handler as GET, handler as POST };
