import { buscarenBD, 
        crearNuevoUsuario,
        mostrarUsuarios,
        buscarUsuarioyCambiaraPremium, 
        buscarUsuarioyActualizarDocumentos,
        buscarUsuariosConInactividad,
        EliminarUsuariosConInactividad,
        buscarUsuarioyEliminar} from "../services/db/users.service.js";
import { createHash } from "../utils.js";
import cartService from "../services/db/cart.service.js"
import userDTO from "../services/dto/user.dto.js";
import { sendEmailtoInactiveUser } from "./email.controller.js";
import usersToAdminDTO from "../services/dto/usersToAdmin.dto.js";


const CartService = new cartService()

export async function saveNewUser(request,response){
    
    try {
        const {first_name, last_name, age, email, password} = request.body;

        const verif = await buscarenBD(email)
        if(verif){return response.json({message: "el email ya esta en uso"})}

        const newUser = {
            first_name,
            last_name,
            age,
            email,
            password: createHash(password)
        }

        const user = await crearNuevoUsuario(newUser)
        const cart = await CartService.createNewCart(user._id)
        response.status(200).json(user)

    } catch (error) {
        response.status(400).json(error.message)
    }
}

export async function getUsers(request, response){
    try {
        const respuesta = await mostrarUsuarios()
        const users = []
        await respuesta.forEach(user => { const userposition = new usersToAdminDTO(user); users.push(userposition)})

        response.status(200).json(users)
    } catch (error) {
        response.status(400).json(error.message)
    }
}

export async function updateToPremiumUser(request, response){

    const idUser = request.params.uid
    
    try {
        const respuesta = await buscarUsuarioyCambiaraPremium(idUser);
        response.status(200).json(respuesta);
    } catch (error) {
        response.status(400).json(error.message)
    }
}

export async function uploadFiles(request, response){

    const idUser = request.params.uid
    const files = request.files;

    try {
        if (!files){
            return response.status(400).send({
                status:"error", message: "No se ha adjuntado ningun archivo"}
            )
        }
        const respuesta = await buscarUsuarioyActualizarDocumentos(idUser, files);
        response.status(200).json(respuesta);
        
    } catch (error) {
        response.status(400).json(error.message)
    }
    
}

export async function deleteInactiveUsers(request, response){
    const cutoffDate = new Date();
    const inactivityDays = 2;
    cutoffDate.setDate(cutoffDate.getDate() - inactivityDays);

    try {
      const usersToDelete = await buscarUsuariosConInactividad(cutoffDate)

      if (usersToDelete.length==0){
        return response.json({ message: 'No se encontraron usuarios inactivos' });
      }
        
      for(const user of usersToDelete){
        await sendEmailtoInactiveUser(user)
        await EliminarUsuariosConInactividad(user)
      }

      return response.json({ message: 'Usuarios inactivos eliminados y notificados' });

    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: 'Error al limpiar usuarios inactivos' });
    }
}

export async function getUser(request, response){
    const idUser = request.params.uid
    try {
        const respuesta = await buscarenBD(idUser)
        console.log(respuesta)
        response.status(200).json(respuesta)
    } catch (error) {
        response.status(400).json(error.message)
    }
}

export async function deleteUser(request, response){
    const idUser = request.params.uid
    try {
        const respuesta = await buscarUsuarioyEliminar(idUser)
        response.status(200).json(respuesta)
    } catch (error) {
        response.status(400).json(error.message)
    }

}
