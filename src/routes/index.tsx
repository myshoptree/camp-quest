import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '../features/home/components/Hero'
import { BestSellersCarousel } from '../features/products/components/BestSellersCarousel'
import { productsQueryOptions } from '../features/products/queries/products'

export const Route = createFileRoute('/')({
  component: Home,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(productsQueryOptions()),
})

function Home() {
  return (
    <main>
      <Hero />
      <BestSellersCarousel />
    </main>
  )
}
