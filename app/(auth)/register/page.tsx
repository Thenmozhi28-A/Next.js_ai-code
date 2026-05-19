// app/(auth)/register/page.tsx
"use client"
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleRegister() {
    setLoading(true)
    setError('')
    setSuccess('')

    if (!name || !email || !password) {
      setError('❌ எல்லா fields-உம் fill பண்ணு!')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('❌ Password குறைந்தது 6 characters வேணும்!')
      setLoading(false)
      return
    }

    // API call பண்ணு
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
    } else {
      setSuccess('✅ Register ஆச்சு! Login பண்ணு!')
      setTimeout(() => router.push('/login'), 2000)
    }

    setLoading(false)
  }

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Account 🎉
          </h1>
          <p className="text-gray-400 mt-2">புதுசா join பண்ணு!</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-500 p-3 rounded-lg mb-4 text-sm">
            {success}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-600">பெயர்</label>
            <input
              type="text"
              placeholder="உன் பெயர்"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300 transition disabled:opacity-50"
          >
            {loading ? '⏳ Loading...' : '🎉 Register'}
          </button>
        </div>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already account இருக்கா?{' '}
          <Link href="/login" className="text-yellow-500 font-semibold hover:underline">
            Login பண்ணு
          </Link>
        </p>
      </div>
    </div>
  )
}