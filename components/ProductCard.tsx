import Link from 'next/link'
import { Product } from '../lib/products'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product } : { product: Product }) {
  const { addItem, currency } = useCart()

  const price = (product.priceUSD * (currency === 'USD' ? 1 : currency === 'EUR' ? 0.92 : 1.25)).toFixed(2)
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'

  return (
    <div className="border rounded-md overflow-hidden">
      <Link href={`/products/${product.slug}`}>
        <a>
          <img src={product.image} alt={product.title} className="w-full h-56 object-cover" />
        </a>
      </Link>
      <div className="p-4">
        <h3 className="font-medium text-lg"><Link href={`/products/${product.slug}`}><a>{product.title}</a></Link></h3>
        <p className="text-sm text-gray-500 mt-2">{product.subtitle}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg font-semibold">{symbol}{price}</div>
          <button onClick={() => addItem(product, 1)} className="bg-primary text-white px-3 py-1 rounded-md">Add</button>
        </div>
      </div>
    </div>
  )
}
