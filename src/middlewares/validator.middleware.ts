import type { RequestHandler } from "express";
import { type ZodType } from "zod";

import { ValidationError } from "#utils/ApiError.js";

export const validateSchema = (schema: ZodType): RequestHandler => {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(new ValidationError(result.error.issues[0].message));
    }

    req.body = result.data;

    next();
  };
};
