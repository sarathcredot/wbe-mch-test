

import { Order } from "../model/order"
import { Cart } from "../model/cart"
import { Product } from "../model/product"
import { ObjectId } from "mongoose"



export const orderService = {


    createOrder: async (userId: ObjectId, proId: ObjectId) => {

        return new Promise(async (resolve, reject) => {

            try {

                const productData = await Product.findById({ _id: proId })

                if (!productData) {

                    throw new Error("Product not found")

                } else {

                    const randomNum = Math.floor(1000 + Math.random() * 9000)
                    const final = new Order({

                        userId,
                        orderId: `ORD${randomNum}`,
                        products: [{
                            productId: proId,
                            quantity: 1,
                            totalPrice: productData.salesPrice
                        }],
                        orderStatus: "pending",
                        totalAmount: productData.salesPrice
                    })

                    await final.save()
                    resolve(final)

                }

            } catch (error: any) {

                reject(error.message)
            }
        })
    },

    createOrderInCart: async (userId: ObjectId) => {

        return new Promise(async (resolve, reject) => {

            try {


                const findUserCart = await Cart.findOne({ userId: userId })

                if (!findUserCart) {

                    throw new Error("Cart not found")
                }

                const cartItems = findUserCart.products.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    totalPrice: item.totalPrice
                }))

                const randomNum = Math.floor(1000 + Math.random() * 9000)
                const final = new Order({
                    userId,
                    orderId: `ORD${randomNum}`,
                    products: cartItems,
                    orderStatus: "pending",
                    totalAmount: cartItems.reduce((acc, item) => acc + item.totalPrice, 0)
                })

                const order = await final.save()

                await Cart.findByIdAndUpdate(
                    { _id: findUserCart._id },
                    { products: [], totalAmount: 0 },
                    { new: true }
                )

                resolve(order)

            } catch (error: any) {

                reject(error.message)
            }
        })
    },


    getOrders: async (userId: ObjectId) => {

        return new Promise(async (resolve, reject) => {

            try {

                const orders = await Order.find({ userId: userId }).populate("products.productId")

                if (!orders || orders.length === 0) {

                    resolve({
                        msg: "No orders found",
                        orders: null
                    })

                } else {

                    resolve(orders)

                }


            } catch (error: any) {

                reject(error.message)
            }
        })
    }




}