

import { Schema, model, Document, ObjectId } from 'mongoose';
import { IUserType } from "../types"




const UserSchema = new Schema<IUserType>({

    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})


export const User = model<IUserType>('User', UserSchema);
