import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

export default function CheckoutForm() {
  const { items, currency, subtotalUSD, clear } = useCart()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [country, setCountry] = useState('US')
  const [loading, setLoading] = useState(false)

  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'

  async function createCheckout(e: any) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, email, shippingAddress: { country }, currency })
    })
    const data = await res.json()
    setLoading(false)
    if (data.checkoutUrl) {
      clear()
      window.location.href = data.checkoutUrl
    } else {
      alert(data.message || 'Checkout failed')
    }
  }

  const subtotal = subtotalUSD()

  return (
    <form onSubmit={createCheckout} className="max-w-2xl mx-auto p-6 border rounded-md">
      <h3 className="text-lg font-semibold">Shipping details</h3>
      <div className="mt-4 grid grid-cols-1 gap-4">
        <input required value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="border p-2 rounded" />
        <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className="border p-2 rounded" />
        <select value={country} onChange={e => setCountry(e.target.value)} className="border p-2 rounded">
          <option value="US">United States</option>
          <option value="GB">United Kingdom</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
          <option value="ES">Spain</option>
          <option value="IT">Italy</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between"><div>Subtotal</div><div>{symbol}{subtotal.toFixed(2)}</div></div>
        <div className="flex items-center justify-between mt-2"><div>Shipping</div><div>Calculated at checkout</div></div>
      </div>

      <div className="mt-6 flex gap-3">
        <button type="submit" disabled={loading} className="bg-primary text-white px-4 py-2 rounded-md">{loading ? 'Processing…' : 'Proceed to Payment'}</button>
        <Link href="/cart"><a className="border px-4 py-2 rounded-md">Back to cart</a></Link>
      </div>
    </form>
  )
}
