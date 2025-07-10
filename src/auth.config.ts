import type { User as PayloadUser } from "@/payload-types"
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import type { PayloadAuthjsUser } from "payload-authjs"

// ☞ https://github.com/CrawlerCode/payload-authjs?tab=readme-ov-file#-typescript
declare module "next-auth" {
  interface User extends PayloadAuthjsUser<PayloadUser> {}
}

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
}
