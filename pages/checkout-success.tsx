import Head from 'next/head'
import Header from '../components/Header'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function CheckoutSuccess() {
  const router = useRouter()
  const { demo_order_id, session_id } = router.query
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    if (demo_order_id) fetch(`/api/order?demo_order_id=${demo_order_id}`).then(r => r.json()).then(d => setOrder(d.order))
    // Note: For Stripe sessions you could fetch session details via Stripe SDK server-side
  }, [demo_order_id, session_id])

  return (
    <div>
      <Head>
        <title>Order confirmed — NovaCart</title>
      </Head>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Thank you — your order is confirmed</h1>
        {order ? (
          <div className="mt-6">
            <div>Order ID: <strong>{order.id}</strong></div>
            <div className="mt-4">Total: <strong>${order.totalUSD.toFixed(2)}</strong></div>
            <div className="mt-4">We sent a confirmation to: <strong>{order.email}</strong></div>
            <div className="mt-6">
              <a href="/products" className="bg-primary text-white px-6 py-3 rounded-md">Continue Shopping</a>
            </div>
          </div>
        ) : (
          <div className="mt-6 text-gray-600">If you used live Stripe Checkout, you'll receive an email confirmation from your payment provider. If this is taking long, contact support.</div>
        )}
      </main>
    </div>
  )
}
