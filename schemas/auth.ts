import { z, ZodError } from "zod";

// Define a schema for login inputs
export const LoginSchema = z.object({
  email: z
    .string()
    .email()
    .refine((value) => value.endsWith("@kiet.edu"), {
      message: "Email must be from @kiet.edu domain",
    }),
  password: z.string().min(8),
});
