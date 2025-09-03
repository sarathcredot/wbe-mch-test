


import { Request, Response } from "express"
import { handleResponse } from "../utils/responseHandler"
import { orderService } from "../services/orderService"


export const orderController = {

    createOrder: async (req: any, res: Response) => {
        try {
            const userId = req.user?.id;
            const { proId } = req.body;

            const order = await orderService.createOrder(userId, proId);

            handleResponse.handleSuccess(res, order, "Order created successfully", 201)

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },

    createOrderInCart: async (req: any, res: Response) => {
        try {
            const userId = req.user?.id;

            const order = await orderService.createOrderInCart(userId);

            handleResponse.handleSuccess(res, order, "Order created from cart successfully", 201)

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    },

    getOrders: async (req: any, res: Response) => {
        try {
            const userId = req.user?.id;

            const orders = await orderService.getOrders(userId);

            handleResponse.handleSuccess(res, orders, "Orders retrieved successfully", 200)

        } catch (error: any) {

            handleResponse.handleError(res, "", error, 500)

        }
    }

}