import { z } from 'zod'
import {
  intlStringSchema,
  contentTreeSchema,
} from '../../content/data/schemas'

export const journalCategorySchema = z.enum([
  'tips',
  'guides',
  'destinations',
  'gear-reviews',
  'stories',
])

export const difficultySchema = z.enum(['beginner', 'intermediate', 'expert'])

/**
 * Article record. Metadata is neutral (not translated); `title` and `excerpt`
 * carry both locales inline; `body` is a ContentTree where every string is
 * IntlString. One JSON per article is enough to add it in every language.
 */
export const articleSchema = z.object({
  id: z.string(),
  slug: z.string(),
  coverUrl: z.url(),
  category: journalCategorySchema,
  difficulty: difficultySchema.nullable(),
  readMinutes: z.number().int().positive(),
  author: z.string(),
  publishedAt: z.iso.date(),
  title: intlStringSchema,
  excerpt: intlStringSchema,
  body: contentTreeSchema,
})

export type Article = z.infer<typeof articleSchema>
export type JournalCategory = z.infer<typeof journalCategorySchema>
export type Difficulty = z.infer<typeof difficultySchema>

export const articleListSchema = z.array(articleSchema)
