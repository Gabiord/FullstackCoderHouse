import { BrowserRouter } from "react-router-dom";
import CartContext from "../context/CartContext";
import Main from "./Main";
import NavBar from "./NavBar"
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { getToken, initAxiosInterceptors } from "./utils";


const apiURL = "http://localhost:8080/api/sessions/current"

initAxiosInterceptors();

function App() {

  const [user, setUser] = useState(null)
  const [cargandoUusario, setCargandoUsuario] = useState(true);

  useEffect(()=>{
    async function cargarUsuario(){
      if(!getToken()){
        setCargandoUsuario(false);
        console.log("aca")
        return;
      }
      try {
        const usuario = await axios.get(apiURL)
        setUser(usuario)
        console.log(user)
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
        <NavBar />
        <Main />
      </BrowserRouter>
    </CartContext>
  );
}

export default App;
