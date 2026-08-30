import type { NextFunction, Request, Response } from "express";
import { ApiError, ValidationError } from "../utils/ApiError.ts";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err instanceof ValidationError ? { fields: err.fields } : {}),
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
