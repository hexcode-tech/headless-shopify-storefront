import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>NovaCart — Global Boutique Marketplace</title>
        <meta name="description" content="NovaCart — Discover unique finds from around the world. Guest checkout, multi-currency, and fast shipping." />
      </Head>

      <main className="min-h-screen bg-white text-gray-900">
        <header className="max-w-6xl mx-auto py-6 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="NovaCart" className="w-10 h-10" />
            <div>
              <h1 className="text-xl font-semibold">NovaCart</h1>
              <p className="text-sm text-gray-500">Global Boutique Marketplace</p>
            </div>
          </div>
          <nav className="space-x-4 text-sm text-gray-700">
            <a href="#" className="hover:text-primary">Shop</a>
            <a href="#" className="hover:text-primary">About</a>
            <a href="#" className="hover:text-primary">Cart</a>
          </nav>
        </header>

        <section className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight">Discover unique products curated worldwide</h2>
            <p className="mt-6 text-lg text-gray-600">Shop with confidence — guest checkout, local currency pricing, and reliable shipping. NovaCart connects you to independent makers and boutique brands across the globe.</p>
            <div className="mt-8">
              <a href="#" className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium">Start Shopping</a>
            </div>
          </div>
          <div className="bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-lg p-8">
            <div className="h-64 bg-white rounded-lg shadow p-6 flex items-center justify-center text-gray-400">Product preview area</div>
          </div>
        </section>

        <footer className="border-t py-8 mt-20">
          <div className="max-w-6xl mx-auto px-4 text-sm text-gray-500">© {new Date().getFullYear()} NovaCart — Shop unique finds from around the world.</div>
        </footer>
      </main>
    </div>
  )
}
