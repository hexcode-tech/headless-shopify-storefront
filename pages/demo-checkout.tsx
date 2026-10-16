import Head from 'next/head'
import Header from '../components/Header'

export default function DemoCheckout() {
  return (
    <div>
      <Head>
        <title>Demo Checkout — NovaCart</title>
      </Head>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Demo Checkout</h1>
        <p className="mt-4 text-gray-600">You reached the demo checkout because Shopify is not connected. To enable a real checkout, follow the README to create a Shopify dev store and add your Storefront API token.</p>
        <div className="mt-6">
          <a href="/products" className="bg-primary text-white px-6 py-3 rounded-md">Continue Shopping</a>
        </div>
      </main>
    </div>
  )
}
