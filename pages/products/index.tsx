import Head from 'next/head'
import Header from '../../components/Header'
import ProductCard from '../../components/ProductCard'
import { getAllProducts } from '../../lib/products'
import { CartProvider } from '../../context/CartContext'

export default function Products({ products }: any) {
  return (
    <CartProvider>
      <Head>
        <title>Shop — NovaCart</title>
      </Head>
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Shop</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>
    </CartProvider>
  )
}

export async function getStaticProps() {
  const products = getAllProducts()
  return { props: { products } }
}
