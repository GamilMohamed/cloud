import NextAuth from 'next-auth'
import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [],
  callbacks: {
    async jwt({ token }) {
		console.log('jwt callback')
      // Fetch session info from your backend
      try {
        const response = await fetch('http://localhost:3000/api/auth/session', {
          credentials: 'include',
        })
        
        if (response.ok) {
          const userData = await response.json()
          token.user = userData
        }
      } catch (error) {
        console.error('Failed to fetch session:', error)
      }
      
      return token
    },
    async session({ session, token }) {
      // Copy the user info from the token to the session
      session.user = token.user
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }