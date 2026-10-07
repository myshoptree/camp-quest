import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { productsQueryOptions } from '../../products/queries/products'
import { useCartStore } from '../hooks/useCartStore'
import { formatPrice } from '../../../lib/money'

// Cart UI stays in English regardless of the app locale — product info
// (name, price) still comes from the Product object untouched. Importing the
// EN bundle directly keeps this stable and never dependent on i18n state.
import enCart from '../../../i18n/locales/en/cart.json'
import enCommon from '../../../i18n/locales/en/common.json'

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const items = useCartStore((s) => s.items)
  const remove = useCartStore((s) => s.remove)
  const add = useCartStore((s) => s.add)
  const clear = useCartStore((s) => s.clear)

  const { data: products = [] } = useQuery(productsQueryOptions())

  const lines = useMemo(() => {
    return items.flatMap((it) => {
      const product = products.find((p) => p.id === it.productId)
      return product ? [{ product, quantity: it.quantity }] : []
    })
  }, [items, products])

  const totalCents = lines.reduce(
    (sum, l) => sum + l.product.priceCents * l.quantity,
    0,
  )

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        aria-label={enCart.title}
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col bg-white shadow-2xl transition-transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-black/5 px-6 py-5">
          <h2 className="text-lg font-semibold text-ink">{enCart.title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={enCommon.a11y.closeCart}
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

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <p className="pt-16 text-center text-sm text-ink/60">
              {enCart.empty}
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {lines.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex gap-3 rounded-2xl border border-black/5 p-3"
                >
                  <img
                    src={product.imageUrl}
                    alt=""
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      {/* Product info stays in whatever language the catalog defines */}
                      <p className="line-clamp-1 font-medium text-ink">
                        {product.name}
                      </p>
                      <p className="text-xs text-ink/60">
                        {formatPrice(product.priceCents, product.currency)} ×{' '}
                        {quantity}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={enCart.decrease}
                          onClick={() =>
                            quantity > 1
                              ? add(product.id, -1)
                              : remove(product.id)
                          }
                          className="h-7 w-7 rounded-full border border-black/10 text-ink/70 hover:bg-black/5"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-sm">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={enCart.increase}
                          onClick={() => add(product.id, 1)}
                          className="h-7 w-7 rounded-full border border-black/10 text-ink/70 hover:bg-black/5"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        className="text-xs text-ink/50 hover:text-ink"
                      >
                        {enCart.remove}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-black/5 px-6 py-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink/60">{enCart.subtotal}</span>
            <span className="font-semibold text-ink">
              {formatPrice(totalCents)}
            </span>
          </div>
          <button
            type="button"
            disabled={lines.length === 0}
            className="mt-4 w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-50"
          >
            {enCart.checkout}
          </button>
          {lines.length > 0 && (
            <button
              type="button"
              onClick={clear}
              className="mt-2 w-full rounded-full px-6 py-2 text-xs text-ink/50 hover:text-ink"
            >
              {enCart.clear}
            </button>
          )}
        </footer>
      </aside>
    </>
  )
}
