import { Router} from "express";
import * as usersController from "../controllers/users.controller.js" 

const router = Router();


router.get("/", usersController.getUsers)

router.post("/register", usersController.saveNewUser);

router.post("/premium/:uid", usersController.updateToPremiumUser)


export default router;