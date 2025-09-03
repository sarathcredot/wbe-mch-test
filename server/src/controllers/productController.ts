


import { ProductService } from "../services/productService"
import { Request, Response } from "express"
import { handleResponse } from "../utils/responseHandler"


export const productController = {

    createProduct: async (req: Request, res: Response) => {
        const { body } = req
        try {
            const product = await ProductService.createProduct(body)
            handleResponse.handleSuccess(res, product, "Product created successfully", 201)

        } catch (error: any) {

            handleResponse.handleError(res, error, "Failed to create product", 500)
        }
    },

    getProductById: async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const product = await ProductService.getProductById(id)
            handleResponse.handleSuccess(res, product, "Product retrieved successfully", 200)

        } catch (error: any) {

            handleResponse.handleError(res, error, "Failed to retrieve product", 500)
        }
    },

    getAllProducts: async (req: Request, res: Response) => {

        try {

            const products = await ProductService.getAllProducts()
            handleResponse.handleSuccess(res, products, "Product retrieved successfully", 200)


        } catch (error) {

            handleResponse.handleError(res, error, "Failed to fetch products", 500)

        }
    }
}