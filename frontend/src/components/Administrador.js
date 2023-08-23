import axios from "axios"
import { useEffect, useState } from "react";
import { getToken } from "./utils";
import ItemList from './ItemList';

const apiURL = "http://localhost:8080/api/users/admin"

const token = getToken()

const Administrador = () => {

    const [user, setUser] = useState(null)
    const [cargandoUusario, setCargandoUsuario] = useState(true);
    const lista = "usersAdmin"

    useEffect(()=>{
        async function cargarUsuario(){
          if(!token){
            setCargandoUsuario(false);
            console.log("NO TENGO TOKEN")
            return;
          }
          try {
            console.log("TENGO TOKEN")
            const usuarios = await axios.get(apiURL, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            console.log(usuarios.data)
            setUser(usuarios.data)
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

    return (
      <div className="mt-8 bg-white p-4 shadow rounded-lg">
        <h2 className="text-gray-500 text-lg font-semibold pb-4">Usuarios</h2>
        <div className="my-1"></div> {/* Espacio de separación */}
        <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div> {/* Línea con gradiente */}
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="text-sm leading-normal">
              <th className="py-2 bg-grey-lightest uppercase text-sm text-grey-light border-b border-grey-light">Datos de usuarios</th>
            </tr>
          </thead>


          <tbody>
            <ItemList users={user} lista={lista} />
          </tbody>
        </table>
      </div>
    );
    

}

export default Administrador;