import { createFileRoute, notFound } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { productBySlugQueryOptions } from '../features/products/queries/product-by-slug'
import { Navbar } from '../features/home/components/Navbar'
import { useCartStore } from '../features/cart/hooks/useCartStore'
import { useCartUIStore } from '../features/cart/hooks/useCartUIStore'
import { formatPrice } from '../lib/money'

export const Route = createFileRoute('/products/$slug')({
  component: ProductDetail,
  loader: async ({ context, params }) => {
    try {
      await context.queryClient.ensureQueryData(
        productBySlugQueryOptions(params.slug),
      )
    } catch {
      throw notFound()
    }
  },
})

function ProductDetail() {
  const { slug } = Route.useParams()
  const { data: product } = useQuery(productBySlugQueryOptions(slug))
  const { t } = useTranslation('common')
  const addToCart = useCartStore((s) => s.add)
  const openDrawer = useCartUIStore((s) => s.openDrawer)

  if (!product) return null

  return (
    <main className="min-h-dvh bg-neutral-50">
      <Navbar />
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 pb-24 pt-8 md:grid-cols-2 md:px-10">
        <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-black/5">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-brand text-2xl text-ink/60">
            {product.category.replace('-', ' ')}
          </p>
          <h1 className="font-display mt-1 text-4xl font-bold tracking-tight text-ink md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-5 max-w-md text-ink/70">{product.description}</p>
          <div className="mt-6 flex items-baseline gap-4">
            <p className="text-3xl font-semibold text-ink">
              {formatPrice(product.priceCents, product.currency)}
            </p>
            <p className="text-sm text-ink/60">★ {product.rating.toFixed(1)}</p>
          </div>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => {
              addToCart(product.id, 1)
              openDrawer()
            }}
            className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-ink px-8 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.02] hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-50"
          >
            {product.inStock ? t('actions.addToCart') : t('actions.outOfStock')}
          </button>
        </div>
      </section>
    </main>
  )
}
