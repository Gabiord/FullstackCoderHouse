import React from "react";
import { useEffect, useState } from "react"
import { json, useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail"
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios";


const ItemDetailContainer = () => {

    const [producto, setProducto] = useState({});
    const { id } = useParams()

    useEffect(() => {
        Loading.standard('Cargando', { svgColor: '#4b88a2' });
        axios.get(`http://localhost:8080/api/products/${id}`)
        .then(result => { 
                    const product = result.data;
                    setProducto(product);
                    Loading.remove();
        })
        .catch((error) => {
            console.error(error)
            Notify.failure('No se pudo cargar');
            Loading.remove()
        })

    }, [])

    return (
        <div>
            <ItemDetail producto={producto} />
        </div>
    )
}


export default ItemDetailContainer;
