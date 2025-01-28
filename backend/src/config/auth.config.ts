// src/config/auth.config.ts
import { ExpressAuth } from "@auth/express"
import Google from "@auth/express/providers/google"
import FortyTwo from "@auth/express/providers/42-school"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "../prisma"

export const authConfig = {
	adapter: PrismaAdapter(prisma),
	providers: [
	  Google({
		clientId: process.env.AUTH_GOOGLE_ID!,
		clientSecret: process.env.AUTH_GOOGLE_SECRET!,
		authorization: {
		  params: {
			prompt: "consent",
			access_type: "offline",
			response_type: "code"
		  }
		}
	  })
	],
	callbacks: {
	  async session({ session, user }: any) {
		session.user.id = user.id
		return session
	  }
	},
	// Ajoute ces configurations
	pages: {
	  signIn: '/auth/signin',
	},
	secret: process.env.AUTH_SECRET
  }

export const auth = ExpressAuth(authConfig)