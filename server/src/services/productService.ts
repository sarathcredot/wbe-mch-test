

import { Product } from "../model/product"
import { IProductType } from "../types"


export const ProductService = {

    createProduct: (data: IProductType) => {

        return new Promise(async (resolve, reject) => {

            try {

                const product = new Product(data)
                await product.save()
                resolve(product)

            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    getProductById: (id: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                const product = await Product.findById(id);

                if (!product) {

                    throw new Error("Product not found");
                }

                resolve(product);

            } catch (error: any) {

                reject(error.message);
            }
        });
    },

    getAllProducts: () => {

        return new Promise(async (resolve, reject) => {

            try {

                const products = await Product.find()

                resolve(products)

            } catch (error: any) {

                reject(error.message)
            }
        })
    }
}