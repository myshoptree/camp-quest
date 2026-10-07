import { create } from 'zustand'

interface CartUIState {
  open: boolean
  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void
}

export const useCartUIStore = create<CartUIState>((set) => ({
  open: false,
  openDrawer: () => set({ open: true }),
  closeDrawer: () => set({ open: false }),
  toggleDrawer: () => set((s) => ({ open: !s.open })),
}))
