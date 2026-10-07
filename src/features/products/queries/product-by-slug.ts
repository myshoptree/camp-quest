import { queryOptions } from '@tanstack/react-query'
import { MOCK_PRODUCTS } from '../data/mock-products'
import type { Product } from '../data/schemas'

async function fetchProductBySlug(slug: string): Promise<Product> {
  await new Promise((r) => setTimeout(r, 120))
  const found = MOCK_PRODUCTS.find((p) => p.slug === slug)
  if (!found) throw new Error(`Product "${slug}" not found`)
  return found
}

export const productBySlugQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ['product', slug] as const,
    queryFn: () => fetchProductBySlug(slug),
    staleTime: 60_000,
  })
