import { create } from 'zustand'
import type { CartItem } from '../data/schemas'

interface CartState {
  items: Array<CartItem>
  add: (productId: string, quantity?: number) => void
  remove: (productId: string) => void
  clear: () => void
  totalItems: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  add: (productId, quantity = 1) =>
    set((state) => {
      const existing = state.items.find((i) => i.productId === productId)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          ),
        }
      }
      return { items: [...state.items, { productId, quantity }] }
    }),
  remove: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    })),
  clear: () => set({ items: [] }),
  totalItems: () => get().items.reduce((n, i) => n + i.quantity, 0),
}))
