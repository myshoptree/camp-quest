import { productListSchema, type Product } from './schemas'

const raw: Array<Product> = [
  {
    id: 'p_01',
    slug: 'alpine-dome-2p-tent',
    name: 'Alpine Dome 2P Tent',
    description:
      'Lightweight 2-person dome tent with weatherproof fly and quick-pitch poles.',
    priceCents: 24900,
    currency: 'USD',
    imageUrl:
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=70',
    category: 'tents',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 'p_02',
    slug: 'nordic-down-sleeping-bag',
    name: 'Nordic Down Sleeping Bag',
    description: 'Four-season down bag rated to -10°C with mummy cut and draft collar.',
    priceCents: 18900,
    currency: 'USD',
    imageUrl:
      'https://images.unsplash.com/photo-1526491109672-74740652b963?auto=format&fit=crop&w=800&q=70',
    category: 'sleeping-bags',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 'p_03',
    slug: 'trailblaze-camp-stove',
    name: 'Trailblaze Camp Stove',
    description: 'Compact backpacking stove with piezo ignition and wind guard.',
    priceCents: 6900,
    currency: 'USD',
    imageUrl:
      'https://images.unsplash.com/photo-1526491109672-74740652b963?auto=format&fit=crop&w=800&q=70',
    category: 'cooking',
    rating: 4.5,
    inStock: true,
  },
  {
    id: 'p_04',
    slug: 'summit-45l-backpack',
    name: 'Summit 45L Backpack',
    description:
      'Ventilated 45L pack with hip belt pockets and hydration sleeve for long days on trail.',
    priceCents: 15900,
    currency: 'USD',
    imageUrl:
      'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=800&q=70',
    category: 'backpacks',
    rating: 4.6,
    inStock: true,
  },
  {
    id: 'p_05',
    slug: 'firefly-lantern',
    name: 'Firefly Lantern',
    description: 'USB-rechargeable lantern with warm/cool modes and 60 hours of runtime.',
    priceCents: 3900,
    currency: 'USD',
    imageUrl:
      'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?auto=format&fit=crop&w=800&q=70',
    category: 'lighting',
    rating: 4.4,
    inStock: true,
  },
  {
    id: 'p_06',
    slug: 'ridge-cook-kit',
    name: 'Ridge Cook Kit',
    description: '7-piece anodized aluminum cook kit with nesting pot, pan, and bowls.',
    priceCents: 8900,
    currency: 'USD',
    imageUrl:
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=70',
    category: 'cooking',
    rating: 4.3,
    inStock: false,
  },
]

export const MOCK_PRODUCTS = productListSchema.parse(raw)
