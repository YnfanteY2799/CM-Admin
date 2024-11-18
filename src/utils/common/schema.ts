import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email("emerror").min(1, "emerror"),
  password: z.string().min(8, "pwerror"),
});

export type TLoginFS = z.infer<typeof LoginFormSchema>;

export const ForgotFormSchema = z.object({
  email: z.string().email("emerror").min(1, "emerror"),
});

export type TForgotFS = z.infer<typeof ForgotFormSchema>;
