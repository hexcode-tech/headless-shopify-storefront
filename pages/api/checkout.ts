import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  const { items } = req.body
  // If Shopify env not configured, return a helpful message and a fake URL for demo purposes
  const store = process.env.SHOPIFY_STORE_DOMAIN
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN

  if (!store || !token) {
    // Demo checkout: send to a placeholder page (or could be integrated with Stripe later)
    return res.status(200).json({ checkoutUrl: '/demo-checkout' })
  }

  // TODO: If you add your Shopify dev store and token, implement the Storefront API call here to create a checkout and return the checkout URL.
  return res.status(501).json({ message: 'Shopify checkout integration not implemented yet. Add your SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN and implement checkoutCreate in /pages/api/checkout.ts' })
}
