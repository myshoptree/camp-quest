import { useEffect, useRef } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useSearchUIStore } from '../hooks/useSearchUIStore'
import { productsQueryOptions } from '../queries/products'
import { searchProducts } from '../hooks/useProductSearch'
import { SearchResults } from './SearchResults'

/**
 * Navbar search:
 * - Collapsed: icon button (both breakpoints).
 * - Expanded on desktop: inline input + anchored popover.
 * - Expanded on mobile: full-width top sheet (overlay) that never fights the
 *   navbar for horizontal space.
 */
export function NavbarSearch({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const { t } = useTranslation('common')
  const open = useSearchUIStore((s) => s.open)
  const query = useSearchUIStore((s) => s.query)
  const openBox = useSearchUIStore((s) => s.openBox)
  const closeBox = useSearchUIStore((s) => s.closeBox)
  const setQuery = useSearchUIStore((s) => s.setQuery)
  const reset = useSearchUIStore((s) => s.reset)

  const inputRef = useRef<HTMLInputElement>(null)
  const desktopRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const { data: products = [] } = useQuery(productsQueryOptions())
  const results = searchProducts(products, query)

  useEffect(() => {
    if (open) {
      // Delay so the top sheet is painted before focusing (keyboard on mobile).
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeBox()
    }
    function onDocClick(e: MouseEvent) {
      // Desktop-only click-outside; mobile top sheet handles its own overlay.
      if (
        desktopRef.current &&
        !desktopRef.current.contains(e.target as Node)
      ) {
        // Only close via outside click on wider screens; on mobile the
        // overlay has a dedicated backdrop button.
        if (window.matchMedia('(min-width: 768px)').matches) closeBox()
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDocClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDocClick)
    }
  }, [open, closeBox])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    if (!open) return
    if (!window.matchMedia('(max-width: 767px)').matches) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  function submit() {
    const trimmed = query.trim()
    if (!trimmed) return
    reset()
    void navigate({ to: '/camping', search: { q: trimmed } })
  }

  const buttonStyles =
    theme === 'dark'
      ? 'bg-ink text-white ring-black/10'
      : 'bg-white/70 text-ink ring-black/5 backdrop-blur-md'

  return (
    <>
      {/* Trigger: desktop only — mobile uses the inline HeroSearch in the hero */}
      <button
        type="button"
        aria-label={t('a11y.search')}
        onClick={openBox}
        className={`relative hidden h-11 w-11 items-center justify-center rounded-full ring-1 transition-transform hover:scale-105 md:flex ${buttonStyles} ${
          open ? 'md:hidden' : ''
        }`}
      >
        <SearchIcon />
      </button>

      {/* Desktop expanded (inline, anchored) */}
      {open ? (
        <div ref={desktopRef} className="relative hidden md:block">
          <InlineInput
            theme={theme}
            value={query}
            placeholder={t('search.placeholder')}
            onChange={setQuery}
            onEnter={submit}
            onClose={reset}
            inputRef={inputRef}
            widthClass="w-[360px] max-w-[60vw]"
            srCloseLabel={t('a11y.closeSearch')}
            srInputLabel={t('a11y.search')}
          />
          {query.trim().length > 0 ? (
            <SearchResults
              query={query.trim()}
              results={results}
              onPick={() => reset()}
              onViewAll={submit}
              anchored
            />
          ) : null}
        </div>
      ) : null}

      {/* Mobile expanded: top sheet overlay */}
      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            onClick={reset}
            aria-hidden="true"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <div className="relative flex flex-col gap-3 bg-white px-4 pb-4 pt-4 shadow-xl ring-1 ring-black/5">
            <InlineInput
              theme="light"
              value={query}
              placeholder={t('search.placeholder')}
              onChange={setQuery}
              onEnter={submit}
              onClose={reset}
              inputRef={inputRef}
              widthClass="w-full"
              srCloseLabel={t('a11y.closeSearch')}
              srInputLabel={t('a11y.search')}
            />
            {query.trim().length > 0 ? (
              <SearchResults
                query={query.trim()}
                results={results}
                onPick={() => reset()}
                onViewAll={submit}
              />
            ) : (
              <p className="px-2 pb-2 text-xs text-ink/50">
                {t('search.hint')}
              </p>
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}

function InlineInput({
  theme,
  value,
  placeholder,
  onChange,
  onEnter,
  onClose,
  inputRef,
  widthClass,
  srCloseLabel,
  srInputLabel,
}: {
  theme: 'light' | 'dark'
  value: string
  placeholder: string
  onChange: (v: string) => void
  onEnter: () => void
  onClose: () => void
  inputRef: React.RefObject<HTMLInputElement | null>
  widthClass: string
  srCloseLabel: string
  srInputLabel: string
}) {
  const styles =
    theme === 'dark'
      ? 'bg-white/15 text-white placeholder:text-white/70 ring-white/20 focus-within:bg-white focus-within:text-ink focus-within:placeholder:text-ink/40'
      : 'bg-white text-ink placeholder:text-ink/50 ring-black/10'
  return (
    <div
      className={`flex h-11 items-center gap-2 rounded-full pl-4 pr-1 ring-1 backdrop-blur-md ${styles} ${widthClass}`}
    >
      <SearchIcon className="h-5 w-5 shrink-0" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onEnter()
        }}
        placeholder={placeholder}
        aria-label={srInputLabel}
        className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none"
      />
      <button
        type="button"
        onClick={onClose}
        aria-label={srCloseLabel}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-current/70 hover:bg-black/5"
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
    </div>
  )
}

function SearchIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}
