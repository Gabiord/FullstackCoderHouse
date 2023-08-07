import { Router} from "express";
import * as usersController from "../controllers/users.controller.js" 
import { uploader } from "../utils.js"

const router = Router();


router.get("/", usersController.getUsers)

router.post("/register", usersController.saveNewUser);

router.post("/premium/:uid", usersController.updateToPremiumUser)

router.post("/:uid/documents", uploader.single('documents'), usersController.uploadFile)

router.post("/:uid/profile", uploader.single('profile-image'), usersController.uploadFile)







export default router;