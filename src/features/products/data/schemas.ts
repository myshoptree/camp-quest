import { z } from 'zod'

export const productCategorySchema = z.enum([
  'tents',
  'sleeping-bags',
  'cooking',
  'lighting',
  'backpacks',
  'essentials',
])

export const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  priceCents: z.number().int().nonnegative(),
  currency: z.literal('USD'),
  imageUrl: z.url(),
  category: productCategorySchema,
  rating: z.number().min(0).max(5),
  inStock: z.boolean(),
})

export type Product = z.infer<typeof productSchema>
export type ProductCategory = z.infer<typeof productCategorySchema>

export const productListSchema = z.array(productSchema)
