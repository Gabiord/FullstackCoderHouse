import React from "react"
import ItemCount from "./ItemCount";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useParams } from "react-router-dom";



function ItemDetail({ producto }) {

  const { agregarProductoAlCarrito } = useCart()
  const [cantidadContador, setCantidadContador] = useState(1)

  const { id } = useParams()

  const onAdd = (valor) => {
    setCantidadContador(valor)
  }

  const handleClick = () => {
    agregarProductoAlCarrito({ producto }, cantidadContador, id)
  }

  return (
    <div className="bg-white">
      <div className="pt-6">

        {/* Image gallery */}
        <div className="mx-auto max-w-2xl">
          <div className="aspect-w-3 aspect-h-4  rounded-lg lg:block">
            <img
              src={producto.product_thumbnail}
              alt={producto.product_name}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{producto.product_name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <p className="text-3xl tracking-tight text-gray-900">$ {producto.product_price}</p>
            <ItemCount onAdd={onAdd} />
            <button onClick={handleClick} className="flex w-auto mt-10 items-center justify-center rounded-md border border-transparent bg-black py-3 px-8 text-base font-medium text-white hover:bg-[#4b88a2] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Agregar al carrito
            </button>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            <div>
              <div className="space-y-6">
                <p className="text-base text-gray-900">{producto.product_description}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetail;
