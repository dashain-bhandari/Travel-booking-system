import { z } from "zod";

export const formSchema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Activity is required.",
        })
    ,

    slug: z
        .string()
        .min(1, {
            message: "Slug is required.",
        })
    ,

    banner: z.coerce.string().min(1, {
        message: "Banner is required",
    }),

    images: z.any(),
    description: z.string().min(1, {
        message: "Description is required.",
    }),
    price: z.coerce.number(),
    previousPrice: z.coerce.number()
});
