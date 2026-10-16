import fs from 'fs'
import path from 'path'

const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json')

export function readOrders() {
  try { return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8')) } catch { return [] }
}

export function findOrderById(id: string) {
  const orders = readOrders()
  return orders.find((o: any) => o.id === id)
}
