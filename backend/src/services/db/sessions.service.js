import userModel from "./models/users.js";

export async function buscarenBD(prop){
    const user = await userModel.findOne({email: prop})
    return user;
}

export async function crearNuevoUsuario(prop){
    const user = await userModel.create(prop)
    return user
}

export async function buscarUsuarioyEitarContraseña(id, newPass){
    const user = await userModel.findByIdAndUpdate(id, {password : newPass})
    return user

}

