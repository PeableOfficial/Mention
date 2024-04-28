import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET,
  INSTAGRAM_CLIENT_ID,
  INSTAGRAM_CLIENT_SECRET,
} from "@/config";
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

    session: async ({ session, token }) => {
      session.user.id = "fakeId";
      session.user.name = "fakeName";
      session.user.email = "fakeEmail";
      session.user.role = "fakeRole";
      session.user.username = "fakeUsername";
      session.user.profile_image_url = "fakeProfileImageUrl";
      return session;
    },

    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: { email: token?.email },
      });

      if (!dbUser) {
        token.id = user?.id;
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        username: dbUser.username,
        profile_image_url: dbUser.profile_image_url,
      };
    },
  },

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    InstagramProvider({
      clientId: INSTAGRAM_CLIENT_ID,
      clientSecret: INSTAGRAM_CLIENT_SECRET,
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
