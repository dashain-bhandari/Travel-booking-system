import { z } from "zod";

export const formSchema = z.object({
    
    firstName: z
        .string().optional()

    ,
    middleName: z
        .string().optional()

    ,
    lastName: z
        .string().optional()

    ,
    dob:z.string().optional(),
    phoneNumber:z.any().optional(),
    gender:z.string().optional(),
    availability: z.any().optional(),
    profile: z.any().optional(),
    address: z.any().optional(),
    coverPic: z.any().optional(),
    priceRange:z.string().optional()
});
