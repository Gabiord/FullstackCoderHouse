import { buscarenBD, crearNuevoUsuario, mostrarUsuarios, buscarUsuarioyCambiaraPremium, buscarUsuarioyActualizarDocumentos} from "../services/db/users.service.js";
import { createHash } from "../utils.js";
import cartService from "../services/db/cart.service.js"
import userDTO from "../services/dto/user.dto.js";


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
        const usersDTO = [];
        await respuesta.forEach(user => { const userposition = new userDTO(user); usersDTO.push(userposition)})
        response.status(200).json(usersDTO)
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

    console.log(files)

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