import { Response } from 'express';




export const handleResponse = {

    handleSuccess: (res:Response, data:any, message:string = 'Success', status:number = 200) => {
        res.status(status).json({
            status,
            message,
            data,
        });
        return;
    },


    handleError: (res:Response, error:any, message:string = 'Error', status:number = 500) => {
        console.error('Error:', message);
        res.status(status).json({
            status,
            message,
            error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error,
        });
        return;
    }


}













