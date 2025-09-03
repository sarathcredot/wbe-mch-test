

import { Schema, model, Document, ObjectId } from 'mongoose';
import { IProductType } from "../types"




const productSchema = new Schema<IProductType>({
    name: { type: String, required: true },
    disc: { type: String, required: true },
    price: { type: Number, required: true },
    salesPrice: { type: Number, required: true },
    image: { type: String, required: true },
});

export const Product = model<IProductType>("Product", productSchema);

