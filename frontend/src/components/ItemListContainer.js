import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import { Notify } from "notiflix";
import { Loading } from "notiflix";
import axios from "axios";


function ItemListContainer() {
    const [load, setLoad] = useState(false);
    const [productos, setProductos] = useState([]);
    const lista = "itemListContainer"

    useEffect(() => {
        Loading.standard('Cargando', { svgColor: '#4b88a2' });
        axios.get("http://localhost:8080/api/products/")
            .then(result => {
                const products = result.data.payload
                setProductos(products)
                Loading.remove()
            })
            .catch((error)=>{
                console.error(error)
                Notify.failure("error al conectar con la api");
                Loading.remove()
            })     
    }, [])
        return (
        <div>
            <ItemList productos={productos} lista={lista} />
        </div>
    )
    
}


export default ItemListContainer;



