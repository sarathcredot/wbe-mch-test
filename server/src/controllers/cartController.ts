
import { cartService } from "../services/cartService"
import { Request, Response } from "express"
import { handleResponse } from "../utils/responseHandler"



export const cartController = {


    addCart: async (req: any, res: Response) => {

        try {
            const userId = req.user?.id;
            const { proId } = req.body;

            const cart = await cartService.addToCart({ userId, proId });

            handleResponse.handleSuccess(res, cart, "Product added to cart", 200)


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },

    getCartItems: async (req: any, res: Response) => {

        try {
            const userId = req.user?.id;

            const cartItems = await cartService.getCart(userId);

            handleResponse.handleSuccess(res, cartItems, "Cart items retrieved successfully", 200)

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },

    removeCartItem: async (req: any, res: Response) => {

        try {
            const userId = req.user?.id;
            const { proId } = req.params;

            const cart = await cartService.removeProductInCart(userId, proId);

            handleResponse.handleSuccess(res, cart, "Product removed from cart", 200)

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },

    incrementProductQuantity: async (req: any, res: Response) => {
        try {
            const userId = req.user?.id;
            const { proId } = req.params;

            const cart = await cartService.incrementCartItemQuantity(userId, proId);

            handleResponse.handleSuccess(res, cart, "Product quantity incremented", 200)

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },

    decrementProductQuantity: async (req: any, res: Response) => {

        try {
            const userId = req.user?.id;
            const { proId } = req.params;

            const cart = await cartService.decrementCartItemQuantity(userId, proId);

            handleResponse.handleSuccess(res, cart, "Product quantity decremented", 200)

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },

    getCartTotalAmmount: async (req: any, res: Response) => {

        try {
            const userId = req.user?.id;

            const data = await cartService.getCartTotalAmmount(userId)
            handleResponse.handleSuccess(res, data, "Product quantity decremented", 200)


        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)


        }

    }




}