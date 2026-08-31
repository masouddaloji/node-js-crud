import { z } from "zod";
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(255, "Password must be at most 255 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(/[!@#$%&*.:;]/, "Password must contain at least one special character");
export const registerUserSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(5, "Full name must be at least 5 characters")
      .max(255, "Full name must be at most 255 characters"),
    email: z.email("Invalid email address").max(255, "Email must be at most 255 characters"),
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, "Confirm password is required")
      .max(255, "Confirm password must be at most 255 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: z.email("Invalid email address").max(255, "Email must be at most 255 characters"),
  password: passwordSchema,
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;
