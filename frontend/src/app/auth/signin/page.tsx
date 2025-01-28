// app/auth/signin/page.tsx
'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	const handleGoogleSignIn = async () => {
		try {
			setLoading(true)
			const result = await signIn('google', {
				callbackUrl: '/dashboard', // Redirect after successful sign in
				redirect: true
			})

			if (result?.error) {
				console.error('Authentication error:', result.error)
			}
		} catch (error) {
			console.error('Sign in error:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="p-8 bg-white rounded-lg shadow-md">
				<h1 className="text-2xl font-bold mb-6">Sign In</h1>
				<button
					onClick={handleGoogleSignIn}
					disabled={loading}
					className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
				>
					<svg className="w-5 h-5" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
						/>
					</svg>
				{loading ? 'Signing in...' : 'Sign in with Google'}
				</button>
			</div>
		</div>
	)
}