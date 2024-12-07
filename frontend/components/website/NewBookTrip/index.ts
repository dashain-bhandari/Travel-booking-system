import { z } from "zod";
// export const formSchema = z.object({
//   fullName: z.string().min(6, "Full Name must be at least 6 characters").max(100, "Full Name must be less than 100 characters"),
//   phone: z.string().min(10, "Phone number must be at least 10 characters").max(15, "Phone number must be less than 15 characters"),
//   dob: z.date({
//     required_error: "Date of birth is required.",
//   }),
//   adults: z.coerce.number().min(1, "At least one adult is required"),
//   childrens: z.coerce.number(),
//   note: z.string().optional(),
//   passportNumber: z.string().length(12, "Passport number must be 12 characters"),
//   isTermAndConditionChecked: z.boolean().refine((val) => val === true, "You must agree to the terms and conditions"),
//   emergencyName: z.string().optional(),
//   emergencyRelationship: z.string().optional(),
//   emergencyPhone: z.any().optional(),
//   adultDiscounts: z.string().optional(),
//   childrenDiscounts: z.string().optional(),
//   additionalServices: z.array(z.any()),
//   paymentOption: z.string(),
//   code: z.string().optional(),
//   postalCode: z.coerce.number(),
// });

export const formSchema = z.object({
  fullName: z.string().optional(),
  phone: z.string().optional(),
  dob: z.date().optional(),
  adults: z.coerce.number(),
  childrens: z.coerce.number(),
  note: z.string().optional(),
  passportNumber: z.string().optional(),
  isTermAndConditionChecked: z
    .boolean()
    .refine(
      (val) => val === true,
      "You must agree to the terms and conditions"
    ),
  emergencyName: z.string().optional(),
  emergencyRelationship: z.string().optional(),
  emergencyPhone: z.any().optional(),
  adultDiscounts: z.string().optional(),
  childrenDiscounts: z.string().optional(),
  additionalServices: z.array(z.any()),
  paymentOption: z.string().optional(),
  code: z.string().optional(),
  postalCode: z.coerce.number().optional(),
});
