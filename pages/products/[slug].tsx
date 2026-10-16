import Head from 'next/head'
import Header from '../../components/Header'
import { getAllProducts, getProductBySlug } from '../../lib/products'
import { CartProvider, useCart } from '../../context/CartContext'
import { useRouter } from 'next/router'

function ProductDetail({ product }: any) {
  const { addItem, currency } = useCart()
  const router = useRouter()
  if (router.isFallback) return <div>Loading…</div>

  const price = (product.priceUSD * (currency === 'USD' ? 1 : currency === 'EUR' ? 0.92 : 1.25)).toFixed(2)
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={product.image} alt={product.title} className="w-full h-96 object-cover rounded-lg" />
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <div className="mt-6 text-2xl font-semibold">{symbol}{price}</div>
          <div className="mt-6 flex gap-3">
            <button onClick={() => addItem(product,1)} className="bg-primary text-white px-4 py-2 rounded-md">Add to Cart</button>
            <a href="/cart" className="border px-4 py-2 rounded-md">View Cart</a>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function Page({ product }: any) {
  return (
    <CartProvider>
      <Head><title>{product.title} — NovaCart</title></Head>
      <Header />
      <ProductDetail product={product} />
    </CartProvider>
  )
}

export async function getStaticPaths() {
  const products = getAllProducts()
  return { paths: products.map(p => ({ params: { slug: p.slug } })), fallback: false }
}

export async function getStaticProps({ params }: any) {
  const product = getProductBySlug(params.slug)
  return { props: { product } }
}
