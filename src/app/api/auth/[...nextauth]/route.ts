import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { type AuthOptions } from "next-auth";

import { NEXTAUTH_SECRET } from "@/config";
import { prisma } from "@/lib/prisma";

const authOptions: AuthOptions = {
  secret: NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn() {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },

    session: async ({ session }) => {
      session.user.id = "fakeId";
      session.user.name = "fakeName";
      session.user.email = "fakeEmail";
      session.user.role = "fakeRole";
      session.user.username = "fakeUsername";
      session.user.avatar = "fakeProfileImageUrl";
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },

  adapter: PrismaAdapter(prisma),
  providers: [],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
