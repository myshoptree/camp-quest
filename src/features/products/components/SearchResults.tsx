import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import type { Product } from '../data/schemas'
import { formatPrice } from '../../../lib/money'

const MAX = 5

export function SearchResults({
  query,
  results,
  onPick,
  onViewAll,
  anchored = false,
}: {
  query: string
  results: Array<Product>
  onPick: () => void
  onViewAll: () => void
  anchored?: boolean
}) {
  const { t } = useTranslation('common')
  const top = results.slice(0, MAX)
  const positionClass = anchored
    ? 'absolute right-0 top-[calc(100%+8px)] z-50 w-[min(420px,80vw)]'
    : 'relative w-full'

  return (
    <div
      role="listbox"
      aria-label={t('a11y.search')}
      className={`overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/10 ${positionClass}`}
    >
      {top.length === 0 ? (
        <p className="px-5 py-6 text-sm text-ink/60">
          {t('search.noResults', { query })}
        </p>
      ) : (
        <>
          <ul>
            {top.map((p) => (
              <li key={p.id}>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  onClick={onPick}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50"
                >
                  <img
                    src={p.imageUrl}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">
                      {p.name}
                    </p>
                    <p className="truncate text-xs text-ink/55">
                      {p.category.replace('-', ' ')}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-ink">
                    {formatPrice(p.priceCents, p.currency)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={onViewAll}
            className="flex w-full items-center justify-between border-t border-black/5 bg-neutral-50 px-5 py-3 text-sm font-medium text-ink hover:bg-neutral-100"
          >
            {t('search.viewAll', { count: results.length })}
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
          </button>
        </>
      )}
    </div>
  )
}
