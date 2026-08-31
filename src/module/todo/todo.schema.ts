import { z } from "zod";

const todoStatusSchema = z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]);

export const createTodoSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .trim()
    .min(1, "Title is required")
    .max(255, "Title must be at most 255 characters"),

  description: z
    .string({ error: "Description must be a string" })
    .trim()
    .max(2000, "Description must be at most 2000 characters")
    .optional(),

  status: todoStatusSchema.optional(),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
