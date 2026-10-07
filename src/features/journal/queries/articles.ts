import { queryOptions } from '@tanstack/react-query'
import { ARTICLES, findArticleBySlug } from '../data/articles-loader'
import type { Article } from '../data/schemas'

async function fetchArticles(): Promise<Array<Article>> {
  await new Promise((r) => setTimeout(r, 120))
  return ARTICLES
}

async function fetchArticleBySlug(slug: string): Promise<Article> {
  await new Promise((r) => setTimeout(r, 120))
  const found = findArticleBySlug(slug)
  if (!found) throw new Error(`Article "${slug}" not found`)
  return found
}

export const articlesQueryOptions = () =>
  queryOptions({
    queryKey: ['articles'] as const,
    queryFn: fetchArticles,
    staleTime: 60_000,
  })

export const articleBySlugQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ['article', slug] as const,
    queryFn: () => fetchArticleBySlug(slug),
    staleTime: 60_000,
  })
