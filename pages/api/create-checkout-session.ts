import fs from 'fs'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'
import products from '../../data/products.json'
import { getShippingCost, getTaxAmount } from '../../lib/fulfillment'

const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json')

function readOrders() {
  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function writeOrders(orders: any[]) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2))
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  const { items, email, shippingAddress, currency = 'USD' } = req.body
  if (!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'No items provided' })

  // Build line items with price validation
  const catalogMap: Record<string, any> = {}
  products.forEach((p: any) => catalogMap[p.id] = p)

  let subtotalUSD = 0
  const lineItems = []
  for (const it of items) {
    const p = catalogMap[it.product.id]
    if (!p) return res.status(400).json({ message: `Product ${it.product.id} not found` })
    const qty = Number(it.quantity) || 1
    subtotalUSD += p.priceUSD * qty
    lineItems.push({ id: p.id, title: p.title, unit_price_usd: p.priceUSD, quantity: qty })
  }

  const shipping = getShippingCost(shippingAddress)
  const tax = getTaxAmount(shippingAddress, subtotalUSD)
  const totalUSD = subtotalUSD + shipping + tax

  // If Stripe is configured, create a Checkout Session
  const stripeSecret = process.env.STRIPE_SECRET_KEY
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://${req.headers.host}`
  if (stripeSecret) {
    const Stripe = require('stripe')
    const stripe = new Stripe(stripeSecret, { apiVersion: '2022-11-15' })

    const stripeLineItems = lineItems.map(li => ({
      price_data: {
        currency: currency.toLowerCase(),
        product_data: { name: li.title },
        unit_amount: Math.round(li.unit_price_usd * 100 * (currency === 'USD' ? 1 : currency === 'EUR' ? 0.92 : 0.78))
      },
      quantity: li.quantity
    }))

    // Add shipping as a separate line item
    stripeLineItems.push({ price_data: { currency: currency.toLowerCase(), product_data: { name: 'Shipping' }, unit_amount: Math.round(shipping * 100) }, quantity: 1 })

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: stripeLineItems,
        success_url: `${baseUrl}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/cart`,
        customer_email: email
      })

      // Save a pending order record (optional)
      const orders = readOrders()
      const order = { id: `ord_${Date.now()}`, status: 'pending', created_at: new Date().toISOString(), email, shippingAddress, items: lineItems, subtotalUSD, shipping, tax, totalUSD, stripeSessionId: session.id }
      orders.push(order)
      writeOrders(orders)

      return res.status(200).json({ checkoutUrl: session.url })
    } catch (err: any) {
      console.error('Stripe error', err)
      return res.status(500).json({ message: 'Stripe error', detail: err.message })
    }
  }

  // Demo fallback: create a local order and return demo success URL
  const orders = readOrders()
  const order = { id: `demo_${Date.now()}`, status: 'paid', created_at: new Date().toISOString(), email, shippingAddress, items: lineItems, subtotalUSD, shipping, tax, totalUSD }
  orders.push(order)
  writeOrders(orders)

  return res.status(200).json({ checkoutUrl: `/checkout-success?demo_order_id=${order.id}` })
}
