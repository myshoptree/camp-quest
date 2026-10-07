import { Trans, useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { Navbar } from './Navbar'
import { SocialRail } from './SocialRail'
import { HeroSearch } from '../../products/components/HeroSearch'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=2400&q=80'

export function Hero() {
  const { t } = useTranslation(['home', 'common'])
  return (
    <section
      className="relative isolate min-h-dvh w-full overflow-hidden bg-neutral-200"
      aria-label="CampQuest hero"
    >
      <img
        src={HERO_IMAGE}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/55"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.35)_100%)]"
      />

      <div className="relative z-10 flex min-h-dvh flex-col">
        <Navbar theme="dark" />

        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <h1 className="hero-headline max-w-[14ch] text-[52px] sm:text-6xl md:max-w-[16ch] md:text-7xl lg:text-[96px]">
            <Trans
              i18nKey="home:hero.headlinePre"
              components={{ s: <span /> }}
            />{' '}
            <em>{t('home:hero.headlineAccent')}</em>{' '}
            {t('home:hero.headlinePost')}
          </h1>

          {/* Mobile-only search, sits right under the headline */}
          <HeroSearch />

          <p className="hero-subtitle mt-7 max-w-xl rounded-2xl bg-black/35 px-5 py-3 text-sm text-white/95 ring-1 ring-white/10 backdrop-blur-md md:text-base">
            {t('home:hero.subtitle')}
          </p>

          <Link
            to="/camping"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-ink px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-xl shadow-black/20 transition-transform hover:scale-[1.02] hover:bg-ink-soft"
          >
            {t('common:actions.goShopping')}
          </Link>
        </div>

        {/* Social rail is an editorial accent — hidden on mobile where it
            fought the hero image for horizontal space. */}
        <div className="pointer-events-auto absolute right-10 top-1/2 hidden -translate-y-1/2 md:block">
          <SocialRail />
        </div>
      </div>
    </section>
  )
}
