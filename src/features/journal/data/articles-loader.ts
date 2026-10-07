import { articleSchema, type Article } from './schemas'

// Vite's eager glob import — every article JSON is parsed at module load.
// Add an article: drop a new JSON in src/content/articles/. No code edits.
const modules = import.meta.glob('../../../content/articles/*.json', {
  eager: true,
}) as Record<string, { default: unknown }>

export const ARTICLES: Array<Article> = Object.values(modules)
  .map((m) => articleSchema.parse(m.default))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

export function findArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}
