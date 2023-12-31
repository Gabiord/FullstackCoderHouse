import userDTO from "../dto/user.dto.js";
import userModel from "./models/users.js";

export async function buscarenBD(prop){
    const user = await userModel.findOne({email: prop})
    return user;
}

export async function buscarUsuario(prop){
  const user = await userModel.findById(prop)
  return user
}

export async function buscarUsuarioyEliminar(prop){
  const respuesta = await userModel.findByIdAndDelete(prop)
}

export async function crearNuevoUsuario(prop){
    const user = await userModel.create(prop)
    return user
}

export async function buscarUsuarioyEditarContraseña(id, newPass){
    const user = await userModel.findByIdAndUpdate(id, {password : newPass})
    return user
}

export async function mostrarUsuarios(){
    const users = await userModel.find();
    return users;
}

export async function buscarUsusarioyActualizarLastConection(id){
  const user = await userModel.findByIdAndUpdate(id, {last_connection : Date.now()})
  return user
}

export async function buscarUsuarioyCambiaraPremium(id){

    const user = await userModel.findById(id)

    // Verificar si los documentos requeridos están cargados
    const requiredDocuments = ["user-identificacion", "comprobante-domicilio", "comprobante-estado-cuenta"];
    const hasRequiredDocuments = requiredDocuments.every((doc) =>
      user.documents.some((document) => document.name === doc)
    );

    if (!hasRequiredDocuments) {
        return {error: "no se ha terminado de cargar la documentacion"}
    }

    user.role = "premium";
    await user.save();
    return user
}

export async function buscarUsuarioyActualizarDocumentos(id, files){
    const user = await userModel.findById(id)

    // Agregar documentos al usuario
    const documents = [];

    if (files['user-identificacion']) {
        documents.push({
            name: "user-identificacion",
            reference: files['user-identificacion'][0].originalname
        })
    };

    if (files['comprobante-domicilio']) {
        documents.push({
          name: "comprobante-domicilio",
          reference: files['comprobante-domicilio'][0].originalname
        });
      }

    if (files['comprobante-estado-cuenta']) {
      documents.push({
        name: "comprobante-estado-cuenta",
        reference: files['comprobante-estado-cuenta'][0].originalname
      });
    }
    
    user.documents = documents;
    await user.save();
    
    return user
}

export async function buscarUsuariosConInactividad(cutoffDate){
  const users = await userModel.find({ last_connection: { $lt: cutoffDate } })
  return users
}

export async function EliminarUsuariosConInactividad(user){
  const users = await userModel.findByIdAndRemove(user.id)
  return users
}

