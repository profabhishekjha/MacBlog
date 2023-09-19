import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import prisma from "./connect"
import { getServerSession } from "next-auth"

export const authOptions={
    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      // ...add more providers here
      
    ],
  }
  export const getAuthSessions=()=>getServerSession(authOptions)