import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import type { Product } from '../data/schemas'
import { formatPrice } from '../../../lib/money'
import { useCartStore } from '../../cart/hooks/useCartStore'
import { QuantityStepper } from '../../cart/components/QuantityStepper'

export function ProductCard({ product }: { product: Product }) {
  const { t } = useTranslation('common')
  const quantity = useCartStore(
    (s) => s.items.find((i) => i.productId === product.id)?.quantity ?? 0,
  )
  const add = useCartStore((s) => s.add)
  const remove = useCartStore((s) => s.remove)
  const inCart = quantity > 0

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="block"
        aria-label={product.name}
      >
        <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <Link
            to="/products/$slug"
            params={{ slug: product.slug }}
            className="min-w-0 flex-1 hover:underline"
          >
            <p className="text-xs uppercase tracking-wide text-ink/50">
              {product.category.replace('-', ' ')}
            </p>
            <h3 className="mt-1 font-semibold text-ink">{product.name}</h3>
            <p className="mt-1 text-sm text-ink/60 line-clamp-2">
              {product.description}
            </p>
          </Link>
          <div className="shrink-0 text-right">
            <p className="font-semibold text-ink">
              {formatPrice(product.priceCents, product.currency)}
            </p>
            <p className="mt-1 text-xs text-ink/50">
              ★ {product.rating.toFixed(1)}
            </p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          {!product.inStock ? (
            <span className="text-xs font-medium uppercase tracking-wide text-ink/50">
              {t('actions.outOfStock')}
            </span>
          ) : inCart ? (
            <QuantityStepper
              quantity={quantity}
              onIncrement={() => add(product.id, 1)}
              onDecrement={() =>
                quantity > 1 ? add(product.id, -1) : remove(product.id)
              }
            />
          ) : (
            <button
              type="button"
              onClick={() => add(product.id, 1)}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-ink-soft"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              {t('actions.add')}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
