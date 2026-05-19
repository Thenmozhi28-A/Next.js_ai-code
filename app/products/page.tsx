// app/products/page.tsx
import Link from 'next/link'
import Image from 'next/image'  // ← இதை import பண்ணு


async function getProducts() {
    const res = await fetch('https://fakestoreapi.com/products', {
        next: { revalidate: 3600 }
    })
    return res.json()
}

export default async function ProductsPage() {
    const products = await getProducts()

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                All Products 🛍️
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product: any) => (
                    <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
                    >
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={200}
                            height={160}
                            className="h-40 w-full object-contain mb-3"
                        />
                        <p className="text-sm text-gray-700 font-semibold line-clamp-2">
                            {product.title}
                        </p>
                        <p className="text-yellow-500 font-bold mt-2">
                            ₹{product.price}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}