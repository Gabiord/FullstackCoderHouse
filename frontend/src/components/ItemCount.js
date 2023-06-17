import React from 'react'
import { useState } from 'react'


const ItemCount = (props) => {

  const { productQuantity, isCarrito, onAdd } = props
  const valorInicial = isCarrito ? productQuantity : 1;
  const [contador, setContador] = useState(valorInicial)

  const increment = (e) => {
    setContador(contador + 1)
    onAdd(contador + 1)
  }

  const decrement = (e) => {
    if (contador >= 1) {
      setContador(contador - 1)
      onAdd(contador - 1)
    }
  }

  return (
    <div>
      <div className="custom-number-input h-10 w-auto">
        <label for="custom-input-number" class="w-full text-gray-700 text-sm font-semibold">Cantidad</label>
        <div className="flex items-center border-gray-100">
          <button onClick={decrement} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </button>
          <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={contador} />
          <button onClick={increment} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </button>
        </div>
      </div>
    </div>
  )
}


export default ItemCount