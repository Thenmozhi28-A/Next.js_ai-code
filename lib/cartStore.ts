// lib/cartStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Cart item type
interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

// Cart store type
interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      // Cart-ல் item add பண்ணு
      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id)
        if (existing) {
          // Already இருந்தா quantity மட்டும் increase பண்ணு
          set({
            items: get().items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          })
        } else {
          // புதுசா add பண்ணு
          set({ items: [...get().items, { ...item, quantity: 1 }] })
        }
      },

      // Cart-லிருந்து item remove பண்ணு
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) })
      },

      // Quantity மாத்து
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        })
      },

      // Cart clear பண்ணு
      clearCart: () => set({ items: [] }),

      // Total items count
      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      // Total price
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'cart-storage', // localStorage-ல் save ஆகும்!
    }
  )
)