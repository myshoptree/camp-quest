import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Logo } from './Logo'
import { LocaleSwitcher } from './LocaleSwitcher'
import { MobileMenu } from './MobileMenu'
import { useCartStore } from '../../cart/hooks/useCartStore'
import { useCartUIStore } from '../../cart/hooks/useCartUIStore'
import { NavbarSearch } from '../../products/components/NavbarSearch'

const LINKS = [
  { key: 'camping', to: '/camping' as const },
  { key: 'journal', to: '/journal' as const },
  { key: 'guides', to: '/guides' as const },
] as const

export function Navbar({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const { t } = useTranslation('common')
  const [menuOpen, setMenuOpen] = useState(false)
  const count = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0))
  const openDrawer = useCartUIStore((s) => s.openDrawer)
  const logoColor = theme === 'dark' ? 'text-white' : 'text-ink'

  return (
    <nav className="pointer-events-auto flex w-full items-center justify-between gap-3 px-4 py-4 md:px-10 md:py-6">
      <Link to="/" className={`${logoColor} shrink-0 hover:opacity-80`}>
        <Logo />
      </Link>

      {/* Desktop links pill */}
      <ul className="hidden items-center gap-1 rounded-full bg-white/60 px-2 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-md ring-1 ring-black/5 md:flex">
        {LINKS.map((l) => (
          <li key={l.key}>
            <Link
              to={l.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-white hover:text-ink"
              activeProps={{ className: 'bg-white text-ink' }}
            >
              {t(`nav.${l.key}`)}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Locale switcher: desktop only; mobile has it inside the menu */}
        <div className="hidden md:block">
          <LocaleSwitcher theme={theme} />
        </div>

        <NavbarSearch theme={theme} />

        <IconButton
          label={t('a11y.cart')}
          onClick={openDrawer}
          badge={count}
          theme={theme}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </IconButton>

        {/* Account: desktop only — keep the top-right dense on mobile */}
        <div className="hidden md:block">
          <IconButton label={t('a11y.account')} variant="dark" theme={theme}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
          </IconButton>
        </div>

        {/* Hamburger: mobile only */}
        <button
          type="button"
          aria-label="Menu"
          onClick={() => setMenuOpen(true)}
          className={`flex h-11 w-11 items-center justify-center rounded-full ring-1 md:hidden ${
            theme === 'dark'
              ? 'bg-ink text-white ring-black/10'
              : 'bg-white/70 text-ink ring-black/5 backdrop-blur-md'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={LINKS}
      />
    </nav>
  )
}

function IconButton({
  children,
  label,
  variant = 'light',
  onClick,
  badge,
  theme = 'light',
}: {
  children: React.ReactNode
  label: string
  variant?: 'light' | 'dark'
  onClick?: () => void
  badge?: number
  theme?: 'light' | 'dark'
}) {
  const base =
    'relative flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-105 ring-1'
  const styles =
    variant === 'dark'
      ? 'bg-ink text-white ring-black/10'
      : theme === 'dark'
        ? 'bg-white/15 text-white ring-white/20 backdrop-blur-md'
        : 'bg-white/70 text-ink ring-black/5 backdrop-blur-md'
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`${base} ${styles}`}
    >
      {children}
      {typeof badge === 'number' && badge > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-semibold text-white ring-2 ring-white">
          {badge}
        </span>
      ) : null}
    </button>
  )
}
