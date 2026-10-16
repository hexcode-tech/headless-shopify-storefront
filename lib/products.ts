import productsData from '../data/products.json'

export type Product = {
  id: string
  title: string
  subtitle?: string
  slug: string
  description: string
  priceUSD: number
  image: string
}

export function getAllProducts(): Product[] {
  return productsData as Product[]
}

export function getProductBySlug(slug: string) {
  return getAllProducts().find(p => p.slug === slug)
}
