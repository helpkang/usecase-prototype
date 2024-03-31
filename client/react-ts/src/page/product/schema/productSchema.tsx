import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(100, { message: "Name must be no more than 100 characters long" }),
  price: z
    .number()
    .min(0.5, { message: "Price must be at least 0.5" })
    .max(10000, { message: "Price must be no more than 10,000" }),
});
