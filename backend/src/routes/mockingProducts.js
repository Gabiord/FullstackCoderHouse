import { Router } from "express";
import { generateProduct } from "../utils.js";

const router = Router();

router.get("/", mockingProducts)

export default router;