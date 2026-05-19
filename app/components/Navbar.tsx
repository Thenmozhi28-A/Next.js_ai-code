// app/components/Navbar.tsx
"use client"
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useCartStore } from '@/lib/cartStore'

export default function Navbar() {
  const { data: session } = useSession()
  const totalItems = useCartStore((state) => state.totalItems)

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-yellow-400">
        🛒 NextShop
      </Link>

      {/* Links */}
      <div className="flex gap-6">
        <Link href="/" className="hover:text-yellow-400">Home</Link>
        <Link href="/products" className="hover:text-yellow-400">Products</Link>
        <Link href="/cart" className="hover:text-yellow-400 relative">
          Cart 🛒
          {totalItems() > 0 && (
            <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {totalItems()}
            </span>
          )}
        </Link>
        {session && (
          <Link href="/orders" className="hover:text-yellow-400">Orders</Link>
        )}
      </div>

      {/* Auth */}
      <div className="flex gap-4 items-center">
        {session ? (
          <>
            <span className="text-yellow-400 text-sm">
              👋 {session.user?.name}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-400 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-yellow-400">Login</Link>
            <Link
              href="/register"
              className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-300 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}