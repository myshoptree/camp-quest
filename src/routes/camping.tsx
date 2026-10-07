import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { productsQueryOptions } from '../features/products/queries/products'
import { ProductCard } from '../features/products/components/ProductCard'
import { FilterDrawer } from '../features/products/components/FilterDrawer'
import { CampingPageSearch } from '../features/products/components/CampingPageSearch'
import { useProductFiltersStore } from '../features/products/hooks/useProductFiltersStore'
import { useFilteredProducts } from '../features/products/hooks/useFilteredProducts'
import { searchProducts } from '../features/products/hooks/useProductSearch'
import { Navbar } from '../features/home/components/Navbar'

const campingSearchSchema = z.object({
  q: z.string().optional(),
})

export const Route = createFileRoute('/camping')({
  component: CampingPage,
  validateSearch: campingSearchSchema,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(productsQueryOptions()),
})

function CampingPage() {
  const { t } = useTranslation('camping')
  const { q } = Route.useSearch()
  const { data: products = [] } = useQuery(productsQueryOptions())

  // Apply drawer filters first, then narrow by the free-text query.
  const drawerFiltered = useFilteredProducts(products)
  const filtered = useMemo(() => {
    const text = (q ?? '').trim()
    if (!text) return drawerFiltered
    return searchProducts(drawerFiltered, text)
  }, [drawerFiltered, q])

  const openFilters = useProductFiltersStore((s) => s.openDrawer)
  const activeCount = useProductFiltersStore((s) => s.activeCount())
  const clearAll = useProductFiltersStore((s) => s.clearAll)

  return (
    <main className="min-h-dvh bg-neutral-50">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-6 md:px-10">
        <header className="mb-8 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="w-full md:w-auto">
            <p className="font-brand text-2xl text-ink/70">{t('eyebrow')}</p>
            <h1 className="font-display mt-1 text-4xl font-bold tracking-tight text-ink md:text-5xl">
              {t('heading')}
            </h1>
            {q ? (
              <p className="mt-2 text-sm text-ink/60">
                <span className="font-medium text-ink">“{q}”</span>
              </p>
            ) : null}
            {/* Mobile-only inline search above the grid */}
            <div className="mt-5 md:hidden">
              <CampingPageSearch initial={q ?? ''} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-sm text-ink/60">
              {t('count', { filtered: filtered.length, total: products.length })}
            </p>
            <button
              type="button"
              onClick={openFilters}
              className="relative inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 6h18" />
                <path d="M6 12h12" />
                <path d="M10 18h4" />
              </svg>
              {t('filters.button')}
              {activeCount > 0 ? (
                <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-ember px-1.5 text-[11px] font-semibold text-ink">
                  {activeCount}
                </span>
              ) : null}
            </button>
          </div>
        </header>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-black/10 bg-white px-6 py-20 text-center">
            <p className="text-ink/70">{t('empty.message')}</p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-ink-soft"
            >
              {t('empty.clear')}
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <FilterDrawer />
    </main>
  )
}
