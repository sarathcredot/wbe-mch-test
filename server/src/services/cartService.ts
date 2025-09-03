
import { Cart } from '../model/cart'
import { Product } from "../model/product"
import { ObjectId } from "mongoose"


export const cartService = {


    addToCart: async (data: { userId: ObjectId, proId: ObjectId, }) => {

        return new Promise(async (resolve, reject) => {

            try {

                const productData = await Product.findById({ _id: data.proId })

                if (!productData) {

                    throw new Error("Product not found")
                }

                const cartExist = await Cart.findOne({ userId: data.userId })

                if (cartExist) {

                    // check this product exist this cart 

                    const productExist = cartExist.products.find((p) => p.productId.toString() === data.proId.toString());


                    if (productExist) {
                        // update quantity and totalPrice
                        productExist.quantity += 1;
                        productExist.totalPrice = productExist.quantity * productData.salesPrice

                        // recalc cart totalAmount
                        cartExist.totalAmount = cartExist.products.reduce(
                            (acc, item) => acc + item.totalPrice,
                            0
                        );

                        await cartExist.save();
                        resolve(cartExist)

                    } else {
                        // If product not in cart, add it
                        cartExist.products.push({ productId: data.proId, totalPrice: productData.salesPrice })

                        cartExist.totalAmount = cartExist.products.reduce(
                            (acc, item) => acc + item.totalPrice,
                            0
                        );

                        await cartExist.save()

                        resolve(cartExist)

                    }

                } else {

                    // If cart does not exist, create a new one
                    const newCart = new Cart({
                        userId: data.userId,
                        products: [{
                            productId: data.proId,
                            totalPrice: productData.salesPrice
                        }],
                        totalAmount: productData.salesPrice
                    })

                    await newCart.save()

                    resolve(newCart)
                }

            } catch (error: any) {


                reject(error.message)
            }

        })
    },

    getCart: async (userId: ObjectId) => {

        return new Promise(async (resolve, reject) => {


            try {

                const cartData = await Cart.findOne({ userId: userId }).populate("products.productId")

                if (!cartData) {

                    resolve({
                        msg: "Cart is empty",
                        cartData: null
                    })
                }
                else {

                    resolve({
                        msg: "Cart fetched successfully",
                        cartData: cartData
                    })
                }



            } catch (error: any) {

                reject(error.message)
            }
        })

    },

    removeProductInCart: async (userId: ObjectId, proId: ObjectId) => {

        return new Promise(async (resolve, reject) => {

            try {

                let cart = await Cart.findOneAndUpdate(
                    { userId },
                    { $pull: { products: { productId: proId } } },
                    { new: true }
                );

                if (!cart) {

                    throw new Error("Cart not found");
                }

                // Recalculate totalAmount
                cart.totalAmount = cart.products.reduce(
                    (acc, item) => acc + item.totalPrice,
                    0
                );

                await cart.save();

                resolve(cart);


            } catch (error: any) {

                reject(error.message)
            }
        })

    },

    incrementCartItemQuantity: async (userId: ObjectId, proId: ObjectId) => {

        return new Promise(async (resolve, reject) => {

            try {

                let cart = await Cart.findOne({ userId });
                const productData = await Product.findById({ _id: proId })
                if (!productData) {

                    throw new Error("Product not found")
                }


                if (!cart) {


                    throw new Error("Cart not found");
                }

                const product = cart.products.find((p) => p.productId.toString() === proId.toString());


                if (!product) {

                    throw new Error("Product not found in cart");
                }

                product.quantity += 1;
                product.totalPrice = product.quantity * productData.salesPrice;

                cart.totalAmount = cart.products.reduce(
                    (acc, item) => acc + item.totalPrice,
                    0
                );

                await cart.save();

                resolve(cart);

            } catch (error: any) {

                reject(error.message)
            }
        })

    },

    decrementCartItemQuantity: async (userId: ObjectId, proId: ObjectId) => {

        return new Promise(async (resolve, reject) => {

            try {

                let cart = await Cart.findOne({ userId });
                const productData = await Product.findById({ _id: proId })
                if (!productData) {

                    throw new Error("Product not found")
                }


                if (!cart) {


                    throw new Error("Cart not found");
                }

                const product = cart.products.find((p) => p.productId.toString() === proId.toString());


                if (!product) {

                    throw new Error("Product not found in cart");
                }

                if (product.quantity <= 1) {

                    const updateCart = await Cart.findOneAndUpdate(
                        { userId, "products.productId": proId },
                        { $pull: { products: { productId: proId } } },
                        { new: true }
                    )

                    if (updateCart) {

                        updateCart.totalAmount =
                            updateCart.products.length > 0
                                ? updateCart.products.reduce((acc, item) => acc + item.totalPrice, 0)
                                : 0;

                        await updateCart.save();

                        resolve(updateCart);
                    }



                } else {

                    product.quantity -= 1;
                    product.totalPrice = product.quantity * productData.salesPrice;

                    cart.totalAmount = cart.products.reduce(
                        (acc, item) => acc + item.totalPrice,
                        0
                    );

                    await cart.save();

                    resolve(cart);
                }



            } catch (error: any) {

                reject(error.message)
            }
        })

    },

    getCartTotalAmmount: async (userId: ObjectId) => {


        return new Promise(async (resolve, reject) => {
            console.log("ammoutn")
            try {

                const cartData = await Cart.findOne({ userId: userId })

                if (!cartData || cartData.totalAmount <= 0) {

                    resolve({
                        ammount: 0
                    })
                } else {

                    resolve({
                        ammount: cartData.totalAmount
                    })
                }

            } catch (error: any) {

                reject(error.message)
            }
        })
    }

}