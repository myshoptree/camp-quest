import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { articlesQueryOptions } from '../queries/articles'
import { ArticleCard } from './ArticleCard'

export function JournalPreview() {
  const { t } = useTranslation(['home', 'common'])
  const { data: articles = [] } = useQuery(articlesQueryOptions())
  const [feature, ...rest] = articles.slice(0, 4)
  if (!feature) return null

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <header className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-brand text-2xl text-ink/60">
              {t('home:journalPreview.eyebrow')}
            </p>
            <h2 className="font-display mt-1 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              {t('home:journalPreview.heading')}
            </h2>
          </div>
          <Link
            to="/journal"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-white"
          >
            {t('common:actions.allArticles')}
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m13 5 7 7-7 7" />
            </svg>
          </Link>
        </header>

        <div className="mb-6">
          <ArticleCard article={feature} variant="feature" />
        </div>
        {rest.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {rest.map((a) => (
              <li key={a.id}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
