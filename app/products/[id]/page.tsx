// app/products/[id]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from '@/app/components/AddToCartButton'  // ← இதை import பண்ணு

async function getProduct(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 3600 }
  })
  return res.json()
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await getProduct(params.id)

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/products" className="text-yellow-500 hover:underline mb-6 block">
        ← Back to Products
      </Link>

      <div className="bg-white rounded-xl shadow p-8 flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="flex-1 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={256}
            className="h-64 object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex-1">
          <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full uppercase">
            {product.category}
          </span>
          <h1 className="text-2xl font-bold text-gray-800 mt-3 mb-2">
            {product.title}
          </h1>
          <p className="text-gray-500 text-sm mb-4">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-400">⭐</span>
            <span className="font-semibold">{product.rating?.rate}</span>
            <span className="text-gray-400 text-sm">
              ({product.rating?.count} reviews)
            </span>
          </div>

          <p className="text-3xl font-bold text-yellow-500 mb-6">
            ₹{product.price}
          </p>

          {/* Add to Cart Button - Client Component */}
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}