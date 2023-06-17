import { Router } from "express";
import { passportCall, authorization } from "../utils.js";
import * as CartsController from "../controllers/carts.controller.js"

const router = Router();

router.post("/:cid/purchase",
passportCall('jwt'),
authorization("user"),  
CartsController.finalizarCompra)


export default router;

       