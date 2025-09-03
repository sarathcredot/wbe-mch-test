

import { z } from "zod";


export const CreateProduct = z.object({

    name: z.string().nonempty("Name is required"),
    disc: z.string().nonempty("Description is required"),
    price: z.string().nonempty("Price is required").regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
    salesPrice: z.string().nonempty("Sales price is required").regex(/^\d+(\.\d{1,2})?$/, "Invalid sales price format"),
    image: z.string(),
})