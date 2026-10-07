import { useTranslation } from 'react-i18next'
import { useLocale } from '../../../i18n/useLocale'
import { SUPPORTED_LOCALES } from '../../../i18n'

export function LocaleSwitcher({
  theme = 'light',
}: {
  theme?: 'light' | 'dark'
}) {
  const { t } = useTranslation('common')
  const { locale, setLocale } = useLocale()
  const containerStyles =
    theme === 'dark'
      ? 'bg-white/10 ring-white/20 text-white backdrop-blur-md'
      : 'bg-white/70 ring-black/5 text-ink backdrop-blur-md'
  return (
    <div
      role="group"
      aria-label={t('a11y.language')}
      className={`flex items-center gap-0.5 rounded-full p-0.5 ring-1 ${containerStyles}`}
    >
      {SUPPORTED_LOCALES.map((l) => {
        const active = l === locale
        const activePill =
          theme === 'dark'
            ? 'bg-white text-ink'
            : 'bg-ink text-white'
        const idlePill = 'opacity-70 hover:opacity-100'
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
              active ? activePill : idlePill
            }`}
          >
            {l}
          </button>
        )
      })}
    </div>
  )
}
