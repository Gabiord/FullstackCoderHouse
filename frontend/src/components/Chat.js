import axios from "axios"
import { useEffect, useState } from "react";
import { getToken } from "./utils";

const apiURL = "http://localhost:8080/api/messages/"

const token = getToken()

const Chat = () => {

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

    console.log(user)


    return(
        <h1>Esta es la pagina de mensajes</h1>
    )
}

export default Chat;