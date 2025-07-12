import type { User as PayloadUser } from "@/payload-types"
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import type { PayloadAuthjsUser } from "payload-authjs"

// ☞ https://github.com/CrawlerCode/payload-authjs?tab=readme-ov-file#-typescript
declare module "next-auth" {
  interface User extends PayloadAuthjsUser<PayloadUser> {}
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "select_account",
          scope: "openid email profile https://www.googleapis.com/auth/calendar",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string
      }
      return session
    },
  },
}
