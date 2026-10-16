import Head from 'next/head'
import Header from '../components/Header'
import { CartProvider, useCart } from '../context/CartContext'

function CartView() {
  const { items, updateQty, removeItem, subtotalUSD, currency } = useCart()
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'
  const subtotal = (subtotalUSD() * (currency === 'USD' ? 1 : currency === 'EUR' ? 0.92 : 1.25)).toFixed(2)

  async function checkout() {
    const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items }) })
    const data = await res.json()
    if (data.checkoutUrl) window.location.href = data.checkoutUrl
    else alert(data.message || 'Checkout not available — connect Shopify as described in README')
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Your cart</h2>
      {items.length === 0 ? <div className="text-gray-600">Your cart is empty.</div> : (
        <div>
          <div className="space-y-4">
            {items.map(i => (
              <div key={i.product.id} className="flex items-center gap-4 border p-4 rounded-md">
                <img src={i.product.image} alt={i.product.title} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-medium">{i.product.title}</div>
                  <div className="text-sm text-gray-500">{i.product.subtitle}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" value={i.quantity} min={1} onChange={(e) => updateQty(i.product.id, Number(e.target.value))} className="w-16 border rounded p-1" />
                  <button onClick={() => removeItem(i.product.id)} className="text-sm text-red-600">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-lg font-semibold">Subtotal</div>
            <div className="text-lg font-bold">{symbol}{subtotal}</div>
          </div>

          <div className="mt-6">
            <button onClick={checkout} className="bg-primary text-white px-6 py-3 rounded-md">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </main>
  )
}

export default function CartPage() {
  return (
    <CartProvider>
      <Head><title>Cart — NovaCart</title></Head>
      <Header />
      <CartView />
    </CartProvider>
  )
}
