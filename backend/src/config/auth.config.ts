// src/config/auth.config.ts
import { ExpressAuth } from "@auth/express"
import Google from "@auth/express/providers/google"
import FortyTwo from "@auth/express/providers/42-school"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "../prisma"

// src/config/auth.config.ts
export const authConfig = {
	adapter: PrismaAdapter(prisma),
	providers: [
	  Google({
		clientId: process.env.AUTH_GOOGLE_ID!,
		clientSecret: process.env.AUTH_GOOGLE_SECRET!,
	  })
	],
	callbacks: {
	  async session({ session, user }: any) {
		session.user.id = user.id
		return session
	  }
	},
	secret: process.env.AUTH_SECRET,
	trustHost: true
  }

export const auth = ExpressAuth(authConfig)