import { z } from "zod";

export const userResponseSchema = z.object({
  id: z.uuid(),
  fullName: z.string(),
  email: z.email(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});
