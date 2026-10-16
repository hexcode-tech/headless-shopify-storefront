import Link from 'next/link'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { items } = useCart()
  const itemCount = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <header className="max-w-6xl mx-auto py-4 px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/">
          <a className="flex items-center gap-3">
            <img src="/logo.svg" alt="NovaCart" className="w-10 h-10" />
            <span className="text-lg font-semibold">NovaCart</span>
          </a>
        </Link>
      </div>

      <nav className="flex items-center gap-4">
        <Link href="/products"><a className="text-sm hover:text-primary">Shop</a></Link>
        <Link href="/about"><a className="text-sm hover:text-primary">About</a></Link>
        <Link href="/cart">
          <a className="text-sm hover:text-primary">Cart ({itemCount})</a>
        </Link>
      </nav>
    </header>
  )
}
