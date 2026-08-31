import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import { UnauthorizedError } from "#utils/ApiError.js";
import { verifyToken } from "#utils/token.js";

export const authMiddleware: RequestHandler = (req, _res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new UnauthorizedError("Authentication required");
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new UnauthorizedError("Invalid authorization header");
  }

  try {
    req.user = verifyToken(token);

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError("Access token expired");
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedError("Invalid access token");
    }

    throw error;
  }
};
