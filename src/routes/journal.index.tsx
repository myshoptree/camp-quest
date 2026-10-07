import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { articlesQueryOptions } from '../features/journal/queries/articles'
import { ArticleCard } from '../features/journal/components/ArticleCard'
import { Navbar } from '../features/home/components/Navbar'

export const Route = createFileRoute('/journal/')({
  component: JournalIndex,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(articlesQueryOptions()),
})

function JournalIndex() {
  const { t } = useTranslation('journal')
  const { data: articles = [] } = useQuery(articlesQueryOptions())
  const [feature, ...rest] = articles

  return (
    <main className="min-h-dvh bg-neutral-50">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-6 md:px-10">
        <header className="mb-10 md:mb-14">
          <p className="font-brand text-2xl text-ink/70">{t('index.eyebrow')}</p>
          <h1 className="font-display mt-1 text-4xl font-bold tracking-tight text-ink md:text-5xl">
            {t('index.heading')}
          </h1>
          <p className="mt-3 max-w-xl text-ink/60">{t('index.subtitle')}</p>
        </header>

        {feature ? (
          <div className="mb-10">
            <ArticleCard article={feature} variant="feature" />
          </div>
        ) : null}

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <li key={a.id}>
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
