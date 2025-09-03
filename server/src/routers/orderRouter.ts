

import express from "express";
const router = express.Router();
import { orderController } from "../controllers/orderController"
import { auth } from "../middlewaeres/auth"



// Authentication middleware
router.use(auth)

router.post("/", orderController.createOrder);
router.post("/create-from-cart", orderController.createOrderInCart);
router.get("/", orderController.getOrders);



export default router;
