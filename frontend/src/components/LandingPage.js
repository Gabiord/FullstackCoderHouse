import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function LandingPage() {

  return (
    <main className="relative px-6 lg:px-8 mainLanding">
      <div className="mx-auto max-w-2xl py-16 sm:py-32 lg:py-48">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Bienvenidos a Happy Shop
          </h1>
          <p className="mt-6 text-lg leading-8 text-white">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
            fugiat veniam occaecat fugiat aliqua.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to={"/products"} className="rounded-md bg-[#4b88a2] px-7 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-[#F8DD6E] hover:text-black">
              Ir a la tienda
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
