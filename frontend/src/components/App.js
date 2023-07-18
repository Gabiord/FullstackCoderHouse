import { BrowserRouter } from "react-router-dom";
import CartContext from "../context/CartContext";
import Main from "./Main";
import NavBar from "./NavBar"
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "./utils";


const apiURL = "http://localhost:8080/api/sessions/current"

const token = getToken()

function App() {

  const [user, setUser] = useState(null)
  const [cargandoUusario, setCargandoUsuario] = useState(true);

  useEffect(()=>{
    async function cargarUsuario(){
      if(!token){
        setCargandoUsuario(false);
        return;
      }
      try {
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

  return (
    <CartContext>
      <BrowserRouter>
        <NavBar/>
        <Main />
      </BrowserRouter>
    </CartContext>
  );
}

export default App;
