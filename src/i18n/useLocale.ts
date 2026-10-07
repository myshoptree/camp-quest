import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import i18n, { DEFAULT_LOCALE, isLocale, type Locale } from './index'

const STORAGE_KEY = 'campquest.locale'

export function useLocale(): {
  locale: Locale
  setLocale: (next: Locale) => void
} {
  const { i18n: instance } = useTranslation()

  // Hydrate from localStorage on client only. SSR renders with DEFAULT_LOCALE.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (isLocale(stored) && stored !== instance.language) {
        void instance.changeLanguage(stored)
      }
    } catch {
      /* ignore storage errors (private mode, SSR, etc.) */
    }
  }, [instance])

  const current = isLocale(instance.language)
    ? instance.language
    : DEFAULT_LOCALE

  const setLocale = (next: Locale) => {
    void i18n.changeLanguage(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }

  return { locale: current, setLocale }
}
