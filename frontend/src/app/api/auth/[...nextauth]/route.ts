import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
	GoogleProvider({
		clientId: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		authorization: {
			params: {
			  prompt: "consent",
			  access_type: "offline",
			  response_type: "code"
			}
		}
	}),
    // Add your authentication providers here (e.g., Google, GitHub, etc.)
  ],
  secret: process.env.NEXTAUTH_SECRET, // Ensure you set this in your environment variables
  callbacks: {
    async session(session, user) {
      // Custom session logic if needed
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      // Custom JWT logic if needed
      return token;
    },
  },
  // Use your Express backend as the base URL for authentication
  baseUrl: 'http://localhost:3000/api/auth',
});