
import { Schema, model, Document, ObjectId } from 'mongoose';



export interface IUserType extends Document {
    userName: string
    email: string

}

export interface IProductType extends Document {
    
    name:string,
    disc:string,
    price:number,
    salesPrice:number,
    image:string,
}



export type UserReqType = {

    userName: string;
    email: string;

}


export type LoginDataType = {

    email: string;
}

