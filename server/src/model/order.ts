

import { Schema, model, Document, ObjectId } from 'mongoose';

export interface IOrder extends Document {
    userId: ObjectId;
    orderId: string;
    orderStatus: string;
    products: {
        productId: ObjectId;
        quantity: number;
        totalPrice: number;
    }[];
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new Schema<IOrder>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: String, ref: 'Order', required: true },
    orderStatus: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
}, { timestamps: true });

export const Order = model<IOrder>('Order', orderSchema);
