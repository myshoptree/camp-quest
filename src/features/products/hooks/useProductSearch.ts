import type { Product } from '../data/schemas'

/** Case/diacritic-insensitive match over name + description + category. */
export function searchProducts(
  products: Array<Product>,
  rawQuery: string,
): Array<Product> {
  const q = normalize(rawQuery)
  if (!q) return []
  return products.filter((p) => {
    const haystack = normalize(
      `${p.name} ${p.description} ${p.category.replace('-', ' ')}`,
    )
    return haystack.includes(q)
  })
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
}
