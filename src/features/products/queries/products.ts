import { queryOptions } from '@tanstack/react-query'
import { MOCK_PRODUCTS } from '../data/mock-products'
import type { Product } from '../data/schemas'

async function fetchProducts(): Promise<Array<Product>> {
  // Simulated latency; swap for real fetch when a backend exists.
  await new Promise((r) => setTimeout(r, 150))
  return MOCK_PRODUCTS
}

export const productsQueryOptions = () =>
  queryOptions({
    queryKey: ['products'] as const,
    queryFn: fetchProducts,
    staleTime: 60_000,
  })
