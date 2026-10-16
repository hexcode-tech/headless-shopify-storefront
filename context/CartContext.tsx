import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Product } from '../lib/products'

type CartItem = { product: Product; quantity: number }

type CartContextValue = {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQty: (productId: string, qty: number) => void
  clear: () => void
  subtotalUSD: () => number
  currency: string
  setCurrency: (c: string) => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      if (typeof window === 'undefined') return []
      const raw = localStorage.getItem('cart')
      return raw ? JSON.parse(raw) : []
    } catch { return [] }
  })
  const [currency, setCurrencyState] = useState<string>(() => typeof window !== 'undefined' ? (localStorage.getItem('currency') || 'USD') : 'USD')

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(items)) }, [items])
  useEffect(() => { localStorage.setItem('currency', currency) }, [currency])

  function addItem(product: Product, quantity = 1) {
    setItems(prev => {
      const found = prev.find(i => i.product.id === product.id)
      if (found) return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
      return [...prev, { product, quantity }]
    })
  }
  function removeItem(productId: string) {
    setItems(prev => prev.filter(i => i.product.id !== productId))
  }
  function updateQty(productId: string, qty: number) {
    setItems(prev => prev.map(i => i.product.id === productId ? { ...i, quantity: qty } : i))
  }
  function clear() { setItems([]) }

  function subtotalUSD() { return items.reduce((s, i) => s + i.product.priceUSD * i.quantity, 0) }

  function setCurrency(c: string) { setCurrencyState(c) }

  const value: CartContextValue = { items, addItem, removeItem, updateQty, clear, subtotalUSD, currency, setCurrency }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
