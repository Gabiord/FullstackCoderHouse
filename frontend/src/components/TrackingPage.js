import { Loading } from 'notiflix'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"
import { useState } from 'react';
import ItemList from './ItemList';
import { Notify } from 'notiflix';


const TrackingPage = () => {

  const { id } = useParams()
  const [compra, setCompra] = useState({})
  const lista = "trackingPage"

  useEffect(() => {
    Loading.standard('Cargando', { svgColor: '#4b88a2' });
    const ventasCollection = collection(db, "ventas")
    const ref = doc(ventasCollection, id)
    const pedido = getDoc(ref)

    pedido
      .then((respuesta) => {
        Loading.remove();
        const data = respuesta.data()
        setCompra(data)
      })
      .catch((error) => {
        Notify.failure('No se pudo cargar');
      })
  }, [])

  return (
    <div class="flex justify-center items-center h-screen bg-gray-200 text-gray-900">
      <div class="rounded-md relative w-72 shadow-2xl p-3 bg-white">
        <div class="py-2">
          <div class="text-center text-xl font-bold">Ticket de compra</div>
          <div class="text-center text-xl font-bold">Detalles</div>
        </div>
        <div class="text-center text-xs font-bold mb-1">~~~~~~~~~~~~~~~~~~~~~~~~~~~~</div>
        <div class="text-xs pl-2">
          <div class="text-xs mb-1">Cliente：{compra.nombreyApellido}</div>
          <div class="text-xs mb-1">Telefono：{compra.telefono}</div>
          <div>ID de Orden：{id}</div>
        </div>
        <div class="border-double border-t-4 border-b-4 border-l-0 border-r-0 border-gray-900 my-3">
          <div class="flex text-sm pt-1 px-1">
            <span class="w-2/6">Nombre</span>
            <span class="w-2/6 text-right">Precio</span>
            <span class="w-2/6 text-right">Cantidad</span>
          </div>
          <div class="border-dashed border-t border-b border-l-0 border-r-0 border-gray-900 mt-1 my-2 py-2 px-1">
            <ItemList compra={compra.cart} lista={lista} />
          </div>
        </div>
        <div class="text-xs">
          <div class="mb-1">Subtotal：${compra.subtotal}</div>
          <div class="mb-1">Envio：${compra.envio}</div>
          <div class="mb-52">Impuesto：${compra.impuesto}</div>

          <div class="text-right">
            <div class="font-bold text-sm">Total：${compra.total}</div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default TrackingPage;
