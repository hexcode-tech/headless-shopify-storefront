import type { NextApiRequest, NextApiResponse } from 'next'
import { findOrderById } from '../../lib/orders'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { demo_order_id } = req.query
  if (!demo_order_id) return res.status(400).json({ message: 'order id required' })
  const order = findOrderById(String(demo_order_id))
  if (!order) return res.status(404).json({ message: 'order not found' })
  return res.status(200).json({ order })
}
