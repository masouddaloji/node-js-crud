import type { RequestHandler } from "express";
import { flattenError, type ZodType } from "zod";

import { ValidationError } from "#utils/ApiError.js";

export const validateSchema = (schema: ZodType): RequestHandler => {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(new ValidationError(flattenError(result.error).fieldErrors));
    }
    req.body = result.data;
    next();
  };
};
