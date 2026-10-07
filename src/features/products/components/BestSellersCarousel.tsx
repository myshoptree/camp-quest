import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { productsQueryOptions } from '../queries/products'
import { formatPrice } from '../../../lib/money'
import type { Product } from '../data/schemas'

export function BestSellersCarousel() {
  const { t } = useTranslation(['home', 'common'])
  const { data: products = [] } = useQuery(productsQueryOptions())
  const trackRef = useRef<HTMLUListElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const amount = Math.min(el.clientWidth * 0.9, 480) * dir
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const bestSellers = [...products].sort((a, b) => b.rating - a.rating)

  return (
    <section
      aria-labelledby="best-sellers-heading"
      className="relative bg-neutral-50 py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <header className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-brand text-2xl text-ink/60">
              {t('home:bestSellers.eyebrow')}
            </p>
            <h2
              id="best-sellers-heading"
              className="font-display mt-1 text-4xl font-semibold tracking-tight text-ink md:text-5xl"
              style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}
            >
              {t('home:bestSellers.heading')}
            </h2>
            <p className="mt-3 max-w-md text-ink/60">
              {t('home:bestSellers.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ArrowButton
              onClick={() => scrollBy(-1)}
              direction="left"
              label={t('common:a11y.previous')}
            />
            <ArrowButton
              onClick={() => scrollBy(1)}
              direction="right"
              label={t('common:a11y.next')}
            />
            <Link
              to="/camping"
              className="ml-2 hidden rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-white md:inline-flex"
            >
              {t('common:actions.shopAll')}
            </Link>
          </div>
        </header>

        <ul
          ref={trackRef}
          className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:-mx-10 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {bestSellers.map((p) => (
            <li
              key={p.id}
              className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
            >
              <CarouselCard product={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function CarouselCard({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group block overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink shadow-sm ring-1 ring-black/5 backdrop-blur">
          <span className="text-ember">★</span>
          {product.rating.toFixed(1)}
        </span>
      </div>
      <div className="flex items-start justify-between gap-4 p-5">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-ink/50">
            {product.category.replace('-', ' ')}
          </p>
          <h3 className="mt-1 truncate font-semibold text-ink">
            {product.name}
          </h3>
        </div>
        <p className="shrink-0 font-semibold text-ink">
          {formatPrice(product.priceCents, product.currency)}
        </p>
      </div>
    </Link>
  )
}

function ArrowButton({
  onClick,
  direction,
  label,
}: {
  onClick: () => void
  direction: 'left' | 'right'
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition-colors hover:bg-ink hover:text-white"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: direction === 'right' ? 'rotate(180deg)' : undefined }}
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
  )
}
