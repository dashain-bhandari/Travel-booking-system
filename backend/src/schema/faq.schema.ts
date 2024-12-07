import { object, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "title is required",
    }),

    description: string({
      required_error: "description is required",
    }),

    expedition: string({
      required_error: "expedition is required",
    }),
  }),
};

const params = {
  params: object({
    faqId: string({
      required_error: "faqId is required",
    }),
  }),
};

export const createFaqSchema = object({
  ...payload,
});

export const updateFaqSchema = object({
  ...payload,
  ...params,
});

export const deleteFaqSchema = object({
  ...params,
});

export const getFaqSchema = object({
  ...params,
});

export type CreateFaqInput = TypeOf<typeof createFaqSchema>;
export type UpdateFaqInput = TypeOf<typeof updateFaqSchema>;
export type ReadFaqInput = TypeOf<typeof getFaqSchema>;
export type DeleteFaqInput = TypeOf<typeof deleteFaqSchema>;
