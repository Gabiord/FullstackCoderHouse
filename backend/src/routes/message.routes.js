import { Router } from "express";
import * as MessagesController from "../controllers/messages.controller.js"
import { passportCall, authorization} from "../utils.js";

const router = Router();

router.get("/", MessagesController.getAllMessages);

router.post("/",
passportCall('jwt'),
authorization("user"),  
MessagesController.saveNewMessage);

export default router;