import { create } from 'zustand'

interface SearchUIState {
  open: boolean
  query: string
  openBox: () => void
  closeBox: () => void
  setQuery: (q: string) => void
  reset: () => void
}

export const useSearchUIStore = create<SearchUIState>((set) => ({
  open: false,
  query: '',
  openBox: () => set({ open: true }),
  closeBox: () => set({ open: false }),
  setQuery: (query) => set({ query }),
  reset: () => set({ open: false, query: '' }),
}))
