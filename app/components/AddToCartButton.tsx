// app/components/AddToCartButton.tsx
"use client"
import { useCartStore } from '@/lib/cartStore'
import { useState } from 'react'

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCartStore()
  const [added, setAdded] = useState(false)

  function handleAddToCart() {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300 transition"
    >
      {added ? '✅ Added to Cart!' : '🛒 Add to Cart'}
    </button>
  )
}