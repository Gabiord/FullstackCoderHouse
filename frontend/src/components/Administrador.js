import axios from "axios"
import { useEffect, useState } from "react";
import { getToken } from "./utils";

const apiURL = "http://localhost:8080/api/users/admin"

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
            const usuarios = await axios.get(apiURL, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            console.log(usuarios)
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
              <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Nombre Apellido</th>
              <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Email</th>
              <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Rol</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-grey-lighter">
              <td className="py-2 px-4 border-b border-grey-light">Juan Pérez</td>
              <td className="py-2 px-4 border-b border-grey-light">juan@gmail.com</td>
              <td className="py-2 px-4 border-b border-grey-light">user</td>
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-1 px-3 rounded">Cambiar a Premium</button>
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-1 px-3 rounded">Eliminar</button>
            </tr>
            {/* Add more rows here for each pending authorization */}
            <tr className="hover:bg-grey-lighter">
              <td className="py-2 px-4 border-b border-grey-light"><img src="https://via.placeholder.com/40" alt="Foto Perfil" className="rounded-full h-10 w-10" /></td>
              <td className="py-2 px-4 border-b border-grey-light">María Gómez</td>
              <td className="py-2 px-4 border-b border-grey-light">Usuario</td>
            </tr>
            <tr className="hover:bg-grey-lighter">
              <td className="py-2 px-4 border-b border-grey-light"><img src="https://via.placeholder.com/40" alt="Foto Perfil" className="rounded-full h-10 w-10" /></td>
              <td className="py-2 px-4 border-b border-grey-light">Carlos López</td>
              <td className="py-2 px-4 border-b border-grey-light">Usuario</td>
            </tr>
            <tr className="hover:bg-grey-lighter">
              <td className="py-2 px-4 border-b border-grey-light"><img src="https://via.placeholder.com/40" alt="Foto Perfil" className="rounded-full h-10 w-10" /></td>
              <td className="py-2 px-4 border-b border-grey-light">Laura Torres</td>
              <td className="py-2 px-4 border-b border-grey-light">Comercio</td>
            </tr>
            <tr className="hover:bg-grey-lighter">
              <td className="py-2 px-4 border-b border-grey-light"><img src="https://via.placeholder.com/40" alt="Foto Perfil" className="rounded-full h-10 w-10" /></td>
              <td className="py-2 px-4 border-b border-grey-light">Ana Ramírez</td>
              <td className="py-2 px-4 border-b border-grey-light">Usuario</td>
            </tr>
          </tbody>
        </table>
        {/* Botón "Ver más" para la tabla de Autorizaciones Pendientes */}
        <div className="text-right mt-4">
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded">
            Ver más
          </button>
        </div>
      </div>
    );
    

}

export default Administrador;