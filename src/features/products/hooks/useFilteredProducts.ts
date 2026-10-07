import { useMemo } from 'react'
import { useProductFiltersStore } from './useProductFiltersStore'
import type { Product } from '../data/schemas'

export function useFilteredProducts(products: Array<Product>): Array<Product> {
  const { categories, minPriceCents, maxPriceCents, minRating, inStockOnly } =
    useProductFiltersStore()
  return useMemo(() => {
    return products.filter((p) => {
      if (categories.length > 0 && !categories.includes(p.category)) return false
      if (minPriceCents !== null && p.priceCents < minPriceCents) return false
      if (maxPriceCents !== null && p.priceCents > maxPriceCents) return false
      if (minRating > 0 && p.rating < minRating) return false
      if (inStockOnly && !p.inStock) return false
      return true
    })
  }, [products, categories, minPriceCents, maxPriceCents, minRating, inStockOnly])
}
