import { Link } from '@tanstack/react-router'
import type { Product } from '../data/schemas'
import { formatPrice } from '../../../lib/money'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group block overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-start justify-between gap-3 p-5">
        <div>
          <p className="text-xs uppercase tracking-wide text-ink/50">
            {product.category.replace('-', ' ')}
          </p>
          <h3 className="mt-1 font-semibold text-ink">{product.name}</h3>
          <p className="mt-1 text-sm text-ink/60 line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-semibold text-ink">
            {formatPrice(product.priceCents, product.currency)}
          </p>
          <p className="mt-1 text-xs text-ink/50">★ {product.rating.toFixed(1)}</p>
        </div>
      </div>
    </Link>
  )
}
