import React from 'react'
import { useCart } from '../context/CartContext'
import ItemCount from './ItemCount'
import { useState } from 'react'

const ProductInCart = ({ product }) => {

  const isCarrito = true
  const productQuantity = product.quantity
  const { eliminarProductoDelCarrito, actualizarItemDelCarrito } = useCart()
  const [subtotal, setSubtotal] = useState(product.total)


  const onAdd = (valor) => {
    actualizarItemDelCarrito(product.id, valor)
    setSubtotal(product.total)
  }

  const handleRemove = () => {
    eliminarProductoDelCarrito(product.id)
  }

  console.log(product)

  return (
    <>
      <div class="md:flex items-strech py-1 md:py-5 lg:py-1 border-gray-100 border-t-2">
        <div class="md:w-1/5 2xl:w-1/5 w-full">
          <img src={product.image} alt={product.title} class="object-center object-cover md:block rounded-lg" />
        </div>
        <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
          <div class="flex items-center justify-between w-full pt-1">
            <p class="text-base leading-none text-gray-800 dark:text-black">{product.title}</p>
            <p class="text-base leading-none text-gray-800 dark:text-black">$ {product.price}</p>

          </div>
          <div class="flex items-center justify-between pt-5">
            <ItemCount productQuantity={productQuantity} isCarrito={isCarrito} onAdd={onAdd} />
            <div class="flex itemms-center">
              <button onClick={handleRemove} className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Eliminar</button>
            </div>
          </div>
          <div class="flex items-center justify-between pt-5">
            <p class="text-base leading-none text-gray-800 dark:text-white pt-5">Subtotal : ${subtotal}</p>
          </div>
        </div>
      </div>
    </>
  )


}

export default ProductInCart
