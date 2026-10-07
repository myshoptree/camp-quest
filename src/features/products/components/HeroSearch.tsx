import { useState, useRef, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { productsQueryOptions } from '../queries/products'
import { searchProducts } from '../hooks/useProductSearch'
import { SearchResults } from './SearchResults'

/**
 * Search bar that lives inside the hero on mobile — always visible, below
 * the headline. Not rendered on md+ (desktop uses the navbar icon).
 */
export function HeroSearch() {
  const { t } = useTranslation('common')
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)

  const { data: products = [] } = useQuery(productsQueryOptions())
  const trimmed = query.trim()
  const results = searchProducts(products, trimmed)

  useEffect(() => {
    if (!trimmed) return
    function onDocClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setQuery('')
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [trimmed])

  function submit() {
    if (!trimmed) return
    void navigate({ to: '/camping', search: { q: trimmed } })
    setQuery('')
  }

  return (
    <div
      ref={containerRef}
      className="relative mt-7 w-full max-w-md md:hidden"
    >
      <label className="group flex h-14 items-center gap-2 rounded-full bg-white pl-5 pr-1.5 shadow-2xl shadow-black/30 ring-1 ring-black/5 transition-shadow focus-within:ring-2 focus-within:ring-ember">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 shrink-0 text-ink/60 transition-colors group-focus-within:text-ink"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit()
          }}
          placeholder={t('search.placeholder')}
          aria-label={t('a11y.search')}
          className="h-full min-w-0 flex-1 bg-transparent text-base text-ink placeholder:text-ink/50 outline-none"
        />
        <button
          type="button"
          onClick={submit}
          disabled={!trimmed}
          aria-label={t('a11y.search')}
          className="flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-ink px-4 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t('a11y.search')}
        </button>
      </label>

      {trimmed.length > 0 ? (
        <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-30">
          <SearchResults
            query={trimmed}
            results={results}
            onPick={() => setQuery('')}
            onViewAll={submit}
          />
        </div>
      ) : null}
    </div>
  )
}
