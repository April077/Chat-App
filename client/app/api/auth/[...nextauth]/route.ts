import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import bcrypt from 'bcryptjs';
import { NextAuthOptions } from "next-auth";



export const authOptions: NextAuthOptions = {

  adapter: PrismaAdapter(prisma),

  pages: {
    signIn: '/signIn',
  },

  providers: [

    CredentialsProvider({

      name: "credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("fields missing")
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        if (!user) {
          throw new Error("no user found")
        }

        const passwordMatch = bcrypt.compare(credentials.password, user.password ?? "");
        if (!passwordMatch) {
          throw new Error("invalid password")
        }
        return user;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],

  callbacks: {

    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },

  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === "development",
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
