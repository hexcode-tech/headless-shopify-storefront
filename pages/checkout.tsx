import Head from 'next/head'
import Header from '../components/Header'
import CheckoutForm from '../components/CheckoutForm'

export default function CheckoutPage() {
  return (
    <div>
      <Head><title>Checkout — NovaCart</title></Head>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        <CheckoutForm />
      </main>
    </div>
  )
}
