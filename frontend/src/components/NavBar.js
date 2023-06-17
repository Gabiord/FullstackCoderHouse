import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from "../images/logo512.png"
import { Link } from "react-router-dom"
import CartWidget from './CartWidget'
import SessionWidget from './SessionWidget'

const navigation = {
  categories: [
    {
      id: 'Categorias',
      name: 'Categorias',
      featured: [
        {
          name: 'Ropa de Mujer',
          href: "products/category/women's clothing",
          imageSrc: 'https://img.freepik.com/free-photo/dreamy-young-woman-sunglasses-looking-front_197531-16739.jpg?w=900&t=st=1675964848~exp=1675965448~hmac=0ef3ad8f24703cbc3a0bb54cbb8cd5e9edfb82c53b3e7b9734ef28ab729ce59e',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Ropa de Hombre',
          href: "products/category/men's clothing",
          imageSrc: 'https://img.freepik.com/free-photo/no-problem-concept-bearded-man-makes-okay-gesture-has-everything-control-all-fine-gesture-wears-spectacles-jumper-poses-against-pink-wall-says-i-got-this-guarantees-something_273609-42817.jpg?w=900&t=st=1675964973~exp=1675965573~hmac=0ce706d63c3580b50b6003ac27db8d8ad8370c4c1907f6ab4429f7bb51d767f8',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
        {
          name: 'Accesorios',
          href: "products/category/accessories",
          imageSrc: 'https://img.freepik.com/free-photo/little-socks-with-birthday-celebration-pattern_53876-105716.jpg?w=740&t=st=1675965152~exp=1675965752~hmac=6489f58f5dc3c576ef8a1c06237404231fd69a26548ab766fb3270a7498f69c3',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
        {
          name: 'Ropa de niños',
          href: "products/category/kid's clothing",
          imageSrc: 'https://img.freepik.com/free-photo/banner-with-surprised-children-peeking-edge_155003-10104.jpg?w=900&t=st=1675965043~exp=1675965643~hmac=33e8cd4caafcfc9bd804d92e0a4dfa93c601c72651b56523ea5e81db34e4d8bf',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ]
    }
  ]
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function NavBar() {

  
  const [open, setOpen] = useState(false)

  return (
    <div>

      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <h1 className='mt-2 block text-xl tracking-normal text-gray-900 pt-8 pl-20'>Categorias</h1>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 pt-10 pb-15">
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative text-sm">
                              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                              <Link to={item.href} className="mt-2 block font-medium text-gray-900 pb-8">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <p className="flex h-8 items-center justify-center bg-gray-200 px-4 text-sm font-medium text-gray-900 sm:px-6 lg:px-8">
          Envios Gratis a partir de $ 1.000
        </p>

        <nav aria-label="Top" className="mx-auto px-4 sm:px-6 lg:px-10 bg-[#F8DD6E]">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-[#F8DD6E] p-2 text-gray-700"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <img
                    className="h-16 w-auto"
                    src={logo}
                    alt="Logo de Happy Shop"
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                Categorias
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <Link to={item.href} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                            {item.name}
                                          </Link>
                                        </div>
                                      ))}
                                    </div>

                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                </div>
              </Popover.Group>
                                        
              <div className="ml-auto flex items-center">
                <SessionWidget/>

                {/* Cart */}
                <CartWidget />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default NavBar;