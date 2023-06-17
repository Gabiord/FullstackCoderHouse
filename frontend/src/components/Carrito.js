import { useCart } from '../context/CartContext';
import ItemList from './ItemList';
import { Report } from 'notiflix';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import { getToken } from "./utils";


const apiURL = "http://localhost:8080/api/sessions/current"

const token = getToken()


const Carrito = () => {

  const lista = "carrito"
  const { cart, setCart } = useCart()

  const subtotal = cart.map(item => item.total).reduce((prev, curr) => prev + curr, 0);
  const envio = subtotal > 1000 ? 0 : 300;
  const impuesto = 0.22 * (subtotal + envio);
  const total = subtotal + envio + impuesto;

  const navigate = useNavigate();

  const handleclick = (prop) => {
    navigate(`/tracking/${prop}`)
  }

  const [user, setUser] = useState(null)
  const [cargandoUusario, setCargandoUsuario] = useState(true);

  useEffect(()=>{
    async function cargarUsuario(){
      if(!token){
        setCargandoUsuario(false);
        console.log("NO TENGO TOKEN")
        return;
      }
      try {
        console.log("TENGO TOKEN")
        const usuario = await axios.get(apiURL, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUser(usuario.data)
        setCargandoUsuario(false)

      } catch (error) {
        console.error(error.response.data)
      }
    }
    cargarUsuario();

  }, [])

  

  const handleClickConfirmarCompra = (evt) => {
    if (subtotal > 0) {
      evt.preventDefault();

      const code = Date.now()
      const purchase_datetime = new Date(Date.now()).toLocaleString();
      const purchaser = user.email
      const apiPurchase = `http://localhost:8080/api/carts/${user.cart_user_id}/purchase`

      console.log(token)

    axios({
        method: 'post',
        url: apiPurchase,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          code,
          purchase_datetime,
          purchaser,
          cart}
      }).then(result => {
        console.log(result.data)
      });   
      
    setCart([])
    
    }

   

    else {
      evt.preventDefault()
      Report.failure("El carrito esta vacio", "");
    }
  }

  return (
    <article className="bg-white pt-20">
      <h1 className="mb-9 text-center text-2xl font-bold">Carrito</h1>
      <div class="mx-auto max-w-7xl md:flex md:space-x-3 xl:px-0">
        <ItemList className="mt-1 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/5" lista={lista} />
        <div className="mt-1 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-4/5">
          <form className="justify-between mb-6 rounded-lg bg-white p-3 sm:justify-start" onSubmit={handleClickConfirmarCompra}>
            
            <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Usuario</p>
                <p className="text-gray-700">gabiord9@gmail.com</p>
              </div>

            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">$ {subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Envio</p>
              <p className="text-gray-700">$  {envio}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Impuesto (22%) </p>
              <p className="text-gray-700">$ {impuesto}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total Compra</p>
              <div className="">
                <p className="text-lg font-bold">$ {total}</p>
              </div>
            </div>

            <button type="submit" className="mt-6 w-full rounded-md bg-black py-1.5 font-medium text-blue-50 hover:bg-[#F8DD6E] hover:text-black">Terminar Compra</button>
          </form>
        </div>
      </div>
    </article>
  )
}

export default Carrito;
