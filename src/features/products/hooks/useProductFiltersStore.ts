import { create } from 'zustand'
import type { ProductCategory } from '../data/schemas'

export interface ProductFilters {
  categories: Array<ProductCategory>
  minPriceCents: number | null
  maxPriceCents: number | null
  minRating: number
  inStockOnly: boolean
}

interface ProductFiltersState extends ProductFilters {
  // UI
  open: boolean
  openDrawer: () => void
  closeDrawer: () => void
  // mutations
  toggleCategory: (c: ProductCategory) => void
  setMinPrice: (cents: number | null) => void
  setMaxPrice: (cents: number | null) => void
  setMinRating: (r: number) => void
  setInStockOnly: (v: boolean) => void
  clearAll: () => void
  // derived
  activeCount: () => number
}

const INITIAL: ProductFilters = {
  categories: [],
  minPriceCents: null,
  maxPriceCents: null,
  minRating: 0,
  inStockOnly: false,
}

export const useProductFiltersStore = create<ProductFiltersState>((set, get) => ({
  ...INITIAL,
  open: false,
  openDrawer: () => set({ open: true }),
  closeDrawer: () => set({ open: false }),
  toggleCategory: (c) =>
    set((s) => ({
      categories: s.categories.includes(c)
        ? s.categories.filter((x) => x !== c)
        : [...s.categories, c],
    })),
  setMinPrice: (cents) => set({ minPriceCents: cents }),
  setMaxPrice: (cents) => set({ maxPriceCents: cents }),
  setMinRating: (r) => set({ minRating: r }),
  setInStockOnly: (v) => set({ inStockOnly: v }),
  clearAll: () => set({ ...INITIAL }),
  activeCount: () => {
    const s = get()
    let n = 0
    if (s.categories.length > 0) n += 1
    if (s.minPriceCents !== null) n += 1
    if (s.maxPriceCents !== null) n += 1
    if (s.minRating > 0) n += 1
    if (s.inStockOnly) n += 1
    return n
  },
}))
