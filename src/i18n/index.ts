import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enCamping from './locales/en/camping.json'
import enCart from './locales/en/cart.json'
import enGuides from './locales/en/guides.json'
import enJournal from './locales/en/journal.json'

import esCommon from './locales/es/common.json'
import esHome from './locales/es/home.json'
import esCamping from './locales/es/camping.json'
import esCart from './locales/es/cart.json'
import esGuides from './locales/es/guides.json'
import esJournal from './locales/es/journal.json'

export const SUPPORTED_LOCALES = ['es', 'en'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'es'

export const NAMESPACES = [
  'common',
  'home',
  'camping',
  'cart',
  'guides',
  'journal',
] as const

const resources = {
  en: {
    common: enCommon,
    home: enHome,
    camping: enCamping,
    cart: enCart,
    guides: enGuides,
    journal: enJournal,
  },
  es: {
    common: esCommon,
    home: esHome,
    camping: esCamping,
    cart: esCart,
    guides: esGuides,
    journal: esJournal,
  },
} as const

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: DEFAULT_LOCALE,
    fallbackLng: DEFAULT_LOCALE,
    defaultNS: 'common',
    ns: [...NAMESPACES],
    interpolation: { escapeValue: false },
    returnNull: false,
    react: { useSuspense: false },
  })
}

export function isLocale(v: string | null | undefined): v is Locale {
  return !!v && (SUPPORTED_LOCALES as ReadonlyArray<string>).includes(v)
}

export default i18n
