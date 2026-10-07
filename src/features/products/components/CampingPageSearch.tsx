import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

/**
 * Inline search for the /camping page on mobile. Edits `?q=` directly,
 * so the grid below reacts in real time (debounced by 180ms).
 */
export function CampingPageSearch({ initial }: { initial: string }) {
  const { t } = useTranslation('common')
  const [query, setQuery] = useState(initial)
  const navigate = useNavigate()

  // Keep local state in sync when the URL changes from elsewhere.
  useEffect(() => {
    setQuery(initial)
  }, [initial])

  // Debounced URL sync.
  useEffect(() => {
    const trimmed = query.trim()
    const same = trimmed === (initial ?? '').trim()
    if (same) return
    const id = window.setTimeout(() => {
      void navigate({
        to: '/camping',
        search: trimmed ? { q: trimmed } : {},
        replace: true,
      })
    }, 180)
    return () => window.clearTimeout(id)
  }, [query, initial, navigate])

  return (
    <label className="flex h-12 items-center gap-2 rounded-full bg-white pl-4 pr-1 ring-1 ring-black/10 shadow-sm focus-within:ring-ink/40">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 shrink-0 text-ink/60"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('search.placeholder')}
        aria-label={t('a11y.search')}
        className="h-full min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-ink/50 outline-none"
      />
      {query ? (
        <button
          type="button"
          onClick={() => setQuery('')}
          aria-label={t('a11y.closeSearch')}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink/60 hover:bg-black/5"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      ) : null}
    </label>
  )
}
