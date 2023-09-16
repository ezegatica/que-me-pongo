import NextAuth, { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../../../db"
import GoogleProvider from 'next-auth/providers/google'
import { config } from "../../../utils"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: config.auth.google.clientId,
      clientSecret: config.auth.google.clientSecret
    })
  ],
  session: {
    strategy: 'jwt'
  }
}

 const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }