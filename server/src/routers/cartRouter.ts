

import express from "express";
const router = express.Router();
import { cartController } from "../controllers/cartController"
import { auth } from "../middlewaeres/auth"



// Authentication middleware
router.use(auth)



router.post("/", cartController.addCart);
router.get("/", cartController.getCartItems);
router.delete("/:proId", cartController.removeCartItem);
router.patch("/increment/:proId", cartController.incrementProductQuantity);
router.patch("/decrement/:proId", cartController.decrementProductQuantity);
router.get("/total-ammount", cartController.getCartTotalAmmount)







export default router;