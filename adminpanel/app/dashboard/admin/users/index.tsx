import { string, z } from "zod";

export const formSchema = z.object({
    firstName: z
    .string(),
    middleName: z
    .string(),
    lastName: z
    .string(),
email: z.string()
,

address: z.string()
,
message: z.string()
,
phoneNo: z.string()
,
availability:z.any(),
role:z.string(),
priceRange:z.string()
});