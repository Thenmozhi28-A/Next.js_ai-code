// app/(auth)/login/page.tsx
"use client"
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin() {
    setLoading(true)
    setError('')

    if (!email || !password) {
      setError('❌ Email & Password வேணும்!')
      setLoading(false)
      return
    }

    // NextAuth signIn
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('❌ Email or Password தப்பு!')
    } else {
      router.push('/')
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h1>
          <p className="text-gray-400 mt-2">
            உன் account-ல் login பண்ணு
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300 transition disabled:opacity-50"
          >
            {loading ? '⏳ Loading...' : '🔐 Login'}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <hr className="flex-1" />
          <span className="text-gray-400 text-sm">or</span>
          <hr className="flex-1" />
        </div>

        {/* Google Login */}
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full border border-gray-200 py-3 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
        >
          🔴 Google-ல் Login
        </button>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Account இல்லையா?{' '}
          <Link
            href="/register"
            className="text-yellow-500 font-semibold hover:underline"
          >
            Register பண்ணு
          </Link>
        </p>
      </div>
    </div>
  )
}