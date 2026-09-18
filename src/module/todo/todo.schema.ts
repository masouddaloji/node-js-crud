import { z } from "zod";

export const todoStatusSchema = z.enum(["IN_PROGRESS", "COMPLETED"], {
  error: "Invalid todo status",
});

export const todoIdParamsSchema = z.object({
  id: z.uuid("Todo ID must be a valid UUID"),
});

export const createTodoSchema = z.object({
  title: z
    .string({
      error: "Title must be a string",
    })
    .trim()
    .min(1, "Title cannot be empty")
    .max(255, "Title must be at most 255 characters"),

  description: z
    .string({
      error: "Description must be a string",
    })
    .trim()
    .max(2000, "Description must be at most 2000 characters")
    .optional(),

  status: todoStatusSchema.optional(),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;

export const updateTodoSchema = createTodoSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    error: "At least one field must be provided",
  });

export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;

export type TodoStatus = z.infer<typeof todoStatusSchema>;

export const todoResponseSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string().nullable(),
  status: todoStatusSchema,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type TodoResponse = z.infer<typeof todoResponseSchema>;

export const findAllTodoSchema = z.object({
  search: z
    .string()
    .trim()
    .min(1, "Search cannot be empty")
    .max(100, "Search must be at most 100 characters")
    .optional(),

  status: todoStatusSchema.optional(),

  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type FindAllTodoInput = z.infer<typeof findAllTodoSchema>;

export const todoMutationResponseSchema = z.object({
  message: z.string(),
  data: todoResponseSchema,
});
