


import express from "express";
const router = express.Router();
import { productController } from "../controllers/productController"
import { validation } from "../utils/validation"
import { CreateProduct } from "../schema.ts/product"


router.get("/", productController.getAllProducts)
router.post("/", validation(CreateProduct), productController.createProduct)
router.get("/:id", productController.getProductById)




export default router;