// app/page.tsx
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto">

      {/* Hero Section */}
      <section className="text-center py-10">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-yellow-400">NextShop</span> 🛒
        </h1>
        <p className="text-gray-500 text-lg mb-8">
          Best products at best prices!
        </p>
        <Link
          href="/products"
          className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition"
        >
          Shop Now →
        </Link>
      </section>

      {/* Categories Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Electronics", icon: "📱" },
            { name: "Clothing", icon: "👕" },
            { name: "Jewellery", icon: "💍" },
            { name: "Accessories", icon: "🎒" },
          ].map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${cat.name.toLowerCase()}`}
              className="bg-gray-100 rounded-xl p-6 text-center hover:bg-yellow-50 hover:shadow-md transition"
            >
              <div className="text-4xl mb-2">{cat.icon}</div>
              <p className="font-semibold text-gray-700">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: "🚚", title: "Free Delivery", desc: "On orders above ₹500" },
          { icon: "↩️", title: "Easy Returns", desc: "7 day return policy" },
          { icon: "🔒", title: "Secure Payment", desc: "100% safe checkout" },
        ].map((feature) => (
          <div
            key={feature.title}
            className="bg-gray-100 rounded-xl p-6 text-center"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="font-bold text-gray-800 mb-1">{feature.title}</h3>
            <p className="text-gray-500 text-sm">{feature.desc}</p>
          </div>
        ))}
      </section>

    </div>
  )
}