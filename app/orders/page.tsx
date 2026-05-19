// app/orders/page.tsx
import Link from 'next/link'

// Fake orders data - Prisma connect பண்ணும்போது real data வரும்!
const orders = [
  {
    id: '#ORD001',
    date: '13 Mar 2024',
    status: 'Delivered',
    total: 299,
    items: [
      { name: 'Fjallraven Backpack', qty: 1, price: 109 },
      { name: 'Mens Casual T-Shirt', qty: 2, price: 95 },
    ],
  },
  {
    id: '#ORD002',
    date: '10 Mar 2024',
    status: 'Shipped',
    total: 199,
    items: [
      { name: 'Gold Earring', qty: 1, price: 199 },
    ],
  },
  {
    id: '#ORD003',
    date: '05 Mar 2024',
    status: 'Pending',
    total: 499,
    items: [
      { name: 'Silicon Power SSD', qty: 1, price: 499 },
    ],
  },
]

// Status color helper
function getStatusColor(status: string) {
  switch (status) {
    case 'Delivered': return 'bg-green-100 text-green-600'
    case 'Shipped': return 'bg-blue-100 text-blue-600'
    case 'Pending': return 'bg-yellow-100 text-yellow-600'
    default: return 'bg-gray-100 text-gray-600'
  }
}

// Status icon helper
function getStatusIcon(status: string) {
  switch (status) {
    case 'Delivered': return '✅'
    case 'Shipped': return '🚚'
    case 'Pending': return '⏳'
    default: return '📦'
  }
}

export default function OrdersPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        My Orders 📦
      </h1>

      {orders.length === 0 ? (
        // No Orders
        <div className="bg-white rounded-2xl shadow p-12 text-center">
          <p className="text-6xl mb-4">📦</p>
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            Orders இல்ல!
          </h2>
          <p className="text-gray-400 mb-6">
            இன்னும் order பண்ணல!
          </p>
          <Link
            href="/products"
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition"
          >
            Shop Now →
          </Link>
        </div>
      ) : (
        // Orders List
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow p-6"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-bold text-gray-800 text-lg">
                    {order.id}
                  </h2>
                  <p className="text-gray-400 text-sm">{order.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)} {order.status}
                </span>
              </div>

              {/* Order Items */}
              <div className="border-t pt-4 space-y-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-gray-600">
                      {item.name} x{item.qty}
                    </span>
                    <span className="font-semibold text-gray-800">
                      ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="border-t mt-4 pt-4 flex justify-between items-center">
                <span className="font-bold text-gray-800">Total</span>
                <span className="font-bold text-yellow-500 text-lg">
                  ₹{order.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}