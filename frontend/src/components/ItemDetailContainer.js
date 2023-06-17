import React from "react";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail"
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios";


const ItemDetailContainer = () => {

    const [producto, setProducto] = useState({});
    const { id } = useParams()

    const apiURL = `http://localhost:8080/api/products/${id}`


    useEffect(() => {
        Loading.standard('Cargando', { svgColor: '#4b88a2' });
        axios.get(apiURL)
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
