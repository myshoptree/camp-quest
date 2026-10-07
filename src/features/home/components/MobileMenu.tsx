import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { LocaleSwitcher } from './LocaleSwitcher'

type NavLink =
  | { key: string; to: '/camping' }
  | { key: string; to: '/journal' }
  | { key: string; to: '/guides' }

export function MobileMenu({
  open,
  onClose,
  links,
}: {
  open: boolean
  onClose: () => void
  links: ReadonlyArray<NavLink>
}) {
  const { t } = useTranslation('common')

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        aria-label="Menu"
        aria-hidden={!open}
        className={`fixed inset-x-0 bottom-0 z-50 flex max-h-[70vh] flex-col rounded-t-3xl bg-white pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl ring-1 ring-black/5 transition-transform duration-300 md:hidden ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <span
            aria-hidden="true"
            className="h-1.5 w-10 rounded-full bg-black/15"
          />
        </div>

        <header className="flex items-center justify-between px-6 py-3">
          <span
            className="text-2xl leading-none"
            style={{ fontFamily: 'var(--font-brand)' }}
          >
            {t('brand')}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full p-2 text-ink/70 hover:bg-black/5"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>

        <nav className="min-h-0 flex-1 overflow-y-auto px-4 pb-2">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.key}>
                <Link
                  to={l.to}
                  onClick={onClose}
                  className="block rounded-2xl px-4 py-3.5 text-lg font-medium text-ink hover:bg-neutral-50"
                  activeProps={{ className: 'bg-neutral-50' }}
                >
                  {t(`nav.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <footer className="flex items-center justify-between gap-4 border-t border-black/5 px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">
            {t('a11y.language')}
          </p>
          <LocaleSwitcher />
        </footer>
      </aside>
    </>
  )
}
