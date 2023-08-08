import { Router} from "express";
import * as usersController from "../controllers/users.controller.js" 
import { uploader } from "../utils.js"

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



export default router;