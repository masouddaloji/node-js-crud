import type { NextFunction, Request, Response } from "express";

import { ApiError, ValidationError } from "@/utils";

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
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
