import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { articlesQueryOptions } from '../features/journal/queries/articles'
import { ArticleCard } from '../features/journal/components/ArticleCard'
import { Navbar } from '../features/home/components/Navbar'
import type { Difficulty } from '../features/journal/data/schemas'

export const Route = createFileRoute('/guides')({
  component: GuidesPage,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(articlesQueryOptions()),
})

const LEVELS: ReadonlyArray<Difficulty> = ['beginner', 'intermediate', 'expert']

function GuidesPage() {
  const { t } = useTranslation('guides')
  const { data: articles = [] } = useQuery(articlesQueryOptions())

  return (
    <main className="min-h-dvh bg-neutral-50">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-6 md:px-10">
        <header className="mb-12">
          <p className="font-brand text-2xl text-ink/70">{t('eyebrow')}</p>
          <h1 className="font-display mt-1 text-4xl font-bold tracking-tight text-ink md:text-5xl">
            {t('heading')}
          </h1>
          <p className="mt-3 max-w-xl text-ink/60">{t('subtitle')}</p>
        </header>

        <div className="mb-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {LEVELS.map((lvl) => (
            <Link
              key={lvl}
              to="/guides"
              hash={lvl}
              className="group block rounded-3xl bg-white p-6 ring-1 ring-black/5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-xs uppercase tracking-wider text-ink/50">
                {t('levelLabel')}
              </p>
              <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight text-ink">
                {t(`levels.${lvl}.label`)}
              </h2>
              <p className="mt-2 text-sm text-ink/60">
                {t(`levels.${lvl}.blurb`)}
              </p>
            </Link>
          ))}
        </div>

        {LEVELS.map((lvl) => {
          const items = articles.filter(
            (a) => a.difficulty === lvl || a.category === 'guides',
          )
          return (
            <section id={lvl} key={lvl} className="mb-16 scroll-mt-24">
              <header className="mb-6 flex items-end justify-between">
                <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
                  {t(`levels.${lvl}.label`)}
                </h2>
                <p className="text-sm text-ink/50">
                  {t('count', { count: items.length })}
                </p>
              </header>
              {items.length === 0 ? (
                <p className="text-sm text-ink/50">{t('empty')}</p>
              ) : (
                <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((a) => (
                    <li key={a.id}>
                      <ArticleCard article={a} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )
        })}
      </section>
    </main>
  )
}
