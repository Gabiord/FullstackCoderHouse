import { Router } from "express";
import * as ProductController from "../controllers/products.controller.js";
import { passportCall, authorization} from "../utils.js";
import cookieParser from 'cookie-parser';


const router = Router();

router.use(cookieParser()); 

router.get("/", 
    // passportCall('jwt'),
    // authorization("user"), 
    ProductController.getProducts
);

router.get("/:id", ProductController.getProductsById)

router.post("/savenewproduct", ProductController.saveNewProduct)



export default router;
