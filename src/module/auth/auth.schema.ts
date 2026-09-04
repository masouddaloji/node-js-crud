import { z } from "zod";

const registerPasswordSchema = z
  .string({
    error: "Password must be a string",
  })
  .min(8, "Password must be at least 8 characters")
  .max(255, "Password must be at most 255 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(/[!@#$%&*.:;]/, "Password must contain at least one special character");

const loginPasswordSchema = z
  .string({
    error: "Password must be a string",
  })
  .min(1, "Password cannot be empty");

const emailSchema = z
  .email("Email must be a valid email address")
  .max(255, "Email must be at most 255 characters");

export const registerUserSchema = z
  .object({
    fullName: z
      .string({
        error: "Full name must be a string",
      })
      .trim()
      .min(1, "Full name cannot be empty")
      .min(5, "Full name must be at least 5 characters")
      .max(255, "Full name must be at most 255 characters"),

    email: emailSchema,

    password: registerPasswordSchema,

    confirmPassword: z
      .string({
        error: "Confirm password must be a string",
      })
      .min(1, "Confirm password cannot be empty")
      .max(255, "Confirm password must be at most 255 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: emailSchema,

  password: loginPasswordSchema,
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;
