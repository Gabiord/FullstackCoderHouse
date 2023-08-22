import { Router} from "express";
import { passportCall, authorization, uploader} from "../utils.js";
import * as usersController from "../controllers/users.controller.js" 

const router = Router();


router.get("/", usersController.getUsers)

router.post("/register", usersController.saveNewUser);

router.post("/premium/:uid", usersController.updateToPremiumUser)

router.post("/:uid/documents", uploader.fields([
    { name: 'user-identificacion', maxCount: 1 },
    { name: 'comprobante-domicilio', maxCount: 1 },
    { name: 'comprobante-estado-cuenta', maxCount: 1 }
]), usersController.uploadFiles)

router.post("/:uid/profile", uploader.single('profile-image'), usersController.uploadFiles)

router.delete("/delete", usersController.deleteInactiveUsers)

// Vistas y Acciones con Permisos de Administrador
router.get("/admin", 
    passportCall('jwt'),
    authorization("admin"),
    usersController.getUsers)

router.get("/admin/:uid",     
    passportCall('jwt'),
    authorization("admin"),
    usersController.getUser)

router.put("/admin/:uid", 
    passportCall('jwt'),
    authorization("admin"),
    usersController.updateToPremiumUser)

router.delete("/admin/:uid", 
    passportCall('jwt'),
    authorization("admin"),
    usersController.deleteUser)

export default router;

