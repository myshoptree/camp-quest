import { useTranslation } from 'react-i18next'

/**
 * Stepper used both inside product cards and in the cart drawer line items.
 * Pure UI — the parent decides what increment/decrement do (add, remove, etc).
 */
export function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  size = 'md',
}: {
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
  size?: 'sm' | 'md'
}) {
  const { t } = useTranslation('cart')
  const btn =
    size === 'sm'
      ? 'h-7 w-7 text-sm'
      : 'h-9 w-9 text-base'
  const widthClass = size === 'sm' ? 'w-5' : 'w-7'
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white p-0.5">
      <button
        type="button"
        onClick={onDecrement}
        aria-label={t('decrease')}
        className={`${btn} flex items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-black/5`}
      >
        −
      </button>
      <span className={`${widthClass} text-center text-sm font-medium text-ink`}>
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label={t('increase')}
        className={`${btn} flex items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-black/5`}
      >
        +
      </button>
    </div>
  )
}
