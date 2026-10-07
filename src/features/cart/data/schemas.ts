import { z } from 'zod'

export const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
})

export const cartSchema = z.object({
  items: z.array(cartItemSchema),
})

export type CartItem = z.infer<typeof cartItemSchema>
export type Cart = z.infer<typeof cartSchema>
