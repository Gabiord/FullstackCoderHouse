import axios from "axios"
import { useEffect, useState } from "react";
import { getToken } from "./utils";

const apiURL = "http://localhost:8080/api/sessions/administrador/"

const token = getToken()

const Administrador = () => {

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
    
    if (user == null){
    return(
        <h1>NO ERES ADMIN, NO ESTAS AUTORIZADO</h1>
    )
    }

    return(
        <h1>ERES ADMIN! Esta es la pagina donde vas a poder eliminar, editar y agregar productos</h1>
    )

}

export default Administrador;