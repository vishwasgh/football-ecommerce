import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export interface Product {
  id: string
  name: string
  price: number
  rating: number
  reviewCount: number
  image: string
  description: string
  hasGame?: boolean
  category: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

interface SearchStore {
  query: string
  isOpen: boolean
  setQuery: (query: string) => void
  openSearch: () => void
  closeSearch: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product) => {
        const items = get().items
        const existingItem = items.find((item) => item.id === product.id)

        if (existingItem) {
          set({
            items: items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
          })
        } else {
          set({
            items: [
              ...items,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
              },
            ],
          })
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set({
          items: get().items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        })
      },
      clearCart: () => {
        set({ items: [] })
      },
      openCart: () => {
        set({ isOpen: true })
      },
      closeCart: () => {
        set({ isOpen: false })
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  isOpen: false,
  setQuery: (query) => set({ query }),
  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false }),
}))
