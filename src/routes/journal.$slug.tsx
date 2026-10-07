import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { articleBySlugQueryOptions } from '../features/journal/queries/articles'
import { Navbar } from '../features/home/components/Navbar'
import { ContentRenderer } from '../features/content/components/ContentRenderer'
import { pickIntl } from '../features/content/data/schemas'
import { useLocale } from '../i18n/useLocale'

export const Route = createFileRoute('/journal/$slug')({
  component: ArticlePage,
  loader: async ({ context, params }) => {
    try {
      await context.queryClient.ensureQueryData(
        articleBySlugQueryOptions(params.slug),
      )
    } catch {
      throw notFound()
    }
  },
})

function ArticlePage() {
  const { slug } = Route.useParams()
  const { data: article } = useQuery(articleBySlugQueryOptions(slug))
  const { t } = useTranslation(['journal', 'common'])
  const { locale } = useLocale()
  if (!article) return null

  const title = pickIntl(article.title, locale)
  const excerpt = pickIntl(article.excerpt, locale)
  const date = new Date(article.publishedAt).toLocaleDateString(
    locale === 'es' ? 'es-ES' : 'en-US',
    { month: 'long', day: 'numeric', year: 'numeric' },
  )

  return (
    <main className="min-h-dvh bg-white">
      <Navbar />
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-6 md:px-0">
        <Link to="/journal" className="text-sm text-ink/60 hover:text-ink">
          {t('common:actions.backToJournal')}
        </Link>

        <header className="mt-8">
          <p className="font-brand text-2xl text-ink/60">
            {t(`journal:categories.${article.category}`)}
          </p>
          <h1 className="font-display mt-2 text-4xl font-bold tracking-tight text-ink md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-ink/70">{excerpt}</p>
          <p className="mt-6 text-sm text-ink/50">
            {t('journal:article.meta', {
              author: article.author,
              minutes: article.readMinutes,
              date,
            })}
          </p>
        </header>

        <div className="my-10 overflow-hidden rounded-3xl">
          <img
            src={article.coverUrl}
            alt=""
            className="aspect-[16/9] w-full object-cover"
          />
        </div>

        <ContentRenderer nodes={article.body} />
      </article>
    </main>
  )
}
