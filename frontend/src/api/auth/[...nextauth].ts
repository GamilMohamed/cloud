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
		async session({ session, token }) {
			return session;
		},
		async jwt({ token, user, account, profile }) {
			return token;
		},
	},
});
export { handler as GET, handler as POST };