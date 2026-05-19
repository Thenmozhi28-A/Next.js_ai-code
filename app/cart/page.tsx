// app/cart/page.tsx
"use client"
import { useCartStore } from '@/lib/cartStore'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart 🛒</h1>
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <p className="text-6xl mb-4">🛒</p>
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            Cart காலி-ஆ இருக்கு!
          </h2>
          <p className="text-gray-400 mb-6">Products add பண்ணு!</p>
          <Link
            href="/products"
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition"
          >
            Shop Now →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart 🛒</h1>
        <button
          onClick={clearCart}
          className="text-red-500 hover:underline text-sm"
        >
          🗑️ Clear Cart
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow p-4 flex gap-4 items-center">
            {/* Image */}
            <Image
              src={item.image}
              alt={item.title}
              width={80}
              height={80}
              className="object-contain h-20 w-20"
            />

            {/* Details */}
            <div className="flex-1">
              <p className="font-semibold text-gray-800 line-clamp-1">
                {item.title}
              </p>
              <p className="text-yellow-500 font-bold">₹{item.price}</p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200"
              >
                −
              </button>
              <span className="font-semibold w-6 text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200"
              >
                +
              </button>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-400 hover:text-red-600 ml-2"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Total Amount</span>
          <span className="text-2xl font-bold text-yellow-500">
            ₹{totalPrice().toFixed(2)}
          </span>
        </div>
        <Link
          href="/orders"
          className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300 transition block text-center"
        >
          Checkout →
        </Link>
      </div>
    </div>
  )
}