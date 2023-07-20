import { Router } from "express";
import * as ProductController from "../controllers/products.controller.js";
import { passportCall, authorization} from "../utils.js";
import cookieParser from 'cookie-parser';
const router = Router();

router.use(cookieParser()); 

router.get("/", 
    ProductController.getProducts
);

router.get("/:id", ProductController.getProductsById)


router.post("/savenewproduct",
        passportCall('jwt'),
        authorization("premium"), 
    ProductController.saveNewProduct)
 

router.post("/deleteProduct/:id", 
    passportCall('jwt'),
    ProductController.deleteProducById) 

export default router;