import { useTranslation } from 'react-i18next'
import { useProductFiltersStore } from '../hooks/useProductFiltersStore'
import { productCategorySchema, type ProductCategory } from '../data/schemas'

const CATEGORIES: Array<ProductCategory> = productCategorySchema.options

const PRICE_PRESETS: Array<{
  key: 'any' | 'under50' | 'p50to150' | 'p150to250' | 'p250plus'
  min: number | null
  max: number | null
}> = [
  { key: 'any', min: null, max: null },
  { key: 'under50', min: null, max: 4999 },
  { key: 'p50to150', min: 5000, max: 15000 },
  { key: 'p150to250', min: 15000, max: 25000 },
  { key: 'p250plus', min: 25000, max: null },
]

const RATINGS = [0, 4, 4.5] as const

export function FilterDrawer() {
  const { t } = useTranslation(['camping', 'common'])
  const open = useProductFiltersStore((s) => s.open)
  const close = useProductFiltersStore((s) => s.closeDrawer)
  const categories = useProductFiltersStore((s) => s.categories)
  const minPriceCents = useProductFiltersStore((s) => s.minPriceCents)
  const maxPriceCents = useProductFiltersStore((s) => s.maxPriceCents)
  const minRating = useProductFiltersStore((s) => s.minRating)
  const inStockOnly = useProductFiltersStore((s) => s.inStockOnly)
  const toggleCategory = useProductFiltersStore((s) => s.toggleCategory)
  const setMinPrice = useProductFiltersStore((s) => s.setMinPrice)
  const setMaxPrice = useProductFiltersStore((s) => s.setMaxPrice)
  const setMinRating = useProductFiltersStore((s) => s.setMinRating)
  const setInStockOnly = useProductFiltersStore((s) => s.setInStockOnly)
  const clearAll = useProductFiltersStore((s) => s.clearAll)
  const activeCount = useProductFiltersStore((s) => s.activeCount())

  const activePreset = PRICE_PRESETS.find(
    (p) => p.min === minPriceCents && p.max === maxPriceCents,
  )

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={close}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        role="dialog"
        aria-label={t('camping:filters.title')}
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col bg-white shadow-2xl transition-transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-black/5 px-6 py-5">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-ink">
              {t('camping:filters.title')}
            </h2>
            {activeCount > 0 ? (
              <span className="rounded-full bg-ink px-2.5 py-0.5 text-xs font-semibold text-white">
                {activeCount}
              </span>
            ) : null}
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={t('common:a11y.closeFilters')}
            className="rounded-full p-2 text-ink/70 hover:bg-black/5"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <Section title={t('camping:filters.sections.category')}>
            <ul className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const active = categories.includes(c)
                return (
                  <li key={c}>
                    <button
                      type="button"
                      onClick={() => toggleCategory(c)}
                      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                        active
                          ? 'border-ink bg-ink text-white'
                          : 'border-black/10 bg-white text-ink/80 hover:border-ink/40'
                      }`}
                    >
                      {c.replace('-', ' ')}
                    </button>
                  </li>
                )
              })}
            </ul>
          </Section>

          <Section title={t('camping:filters.sections.price')}>
            <ul className="flex flex-wrap gap-2">
              {PRICE_PRESETS.map((p) => {
                const active = activePreset?.key === p.key
                return (
                  <li key={p.key}>
                    <button
                      type="button"
                      onClick={() => {
                        setMinPrice(p.min)
                        setMaxPrice(p.max)
                      }}
                      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                        active
                          ? 'border-ink bg-ink text-white'
                          : 'border-black/10 bg-white text-ink/80 hover:border-ink/40'
                      }`}
                    >
                      {t(`camping:filters.pricePresets.${p.key}`)}
                    </button>
                  </li>
                )
              })}
            </ul>
          </Section>

          <Section title={t('camping:filters.sections.rating')}>
            <div className="flex flex-wrap gap-2">
              {RATINGS.map((r) => {
                const active = minRating === r
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setMinRating(r)}
                    className={`inline-flex items-center gap-1 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                      active
                        ? 'border-ink bg-ink text-white'
                        : 'border-black/10 bg-white text-ink/80 hover:border-ink/40'
                    }`}
                  >
                    {r === 0 ? (
                      t('camping:filters.rating.any')
                    ) : (
                      <>
                        <span className={active ? 'text-white' : 'text-ember'}>
                          ★
                        </span>
                        {r.toFixed(1)}+
                      </>
                    )}
                  </button>
                )
              })}
            </div>
          </Section>

          <Section title={t('camping:filters.sections.availability')}>
            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-black/5 bg-neutral-50 px-4 py-3">
              <span className="text-sm text-ink">
                {t('camping:filters.inStockOnly')}
              </span>
              <input
                type="checkbox"
                className="peer sr-only"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <span
                aria-hidden="true"
                className="relative h-6 w-10 rounded-full bg-black/15 transition-colors peer-checked:bg-ink"
              >
                <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
              </span>
            </label>
          </Section>
        </div>

        <footer className="flex items-center gap-3 border-t border-black/5 px-6 py-5">
          <button
            type="button"
            onClick={clearAll}
            disabled={activeCount === 0}
            className="flex-1 rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t('camping:filters.clearAll')}
          </button>
          <button
            type="button"
            onClick={close}
            className="flex-1 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
          >
            {t('camping:filters.showResults')}
          </button>
        </footer>
      </aside>
    </>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-7 last:mb-0">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink/50">
        {title}
      </h3>
      {children}
    </section>
  )
}
