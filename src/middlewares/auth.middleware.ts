import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import { UnauthorizedError } from "#utils/ApiError.js";
import { ACCESS_COOKIE_NAME } from "#utils/cookie.js";
import { verifyToken } from "#utils/token.js";

export const authMiddleware: RequestHandler = (req, _res, next) => {
  const accessToken = req.cookies[ACCESS_COOKIE_NAME];

  if (!accessToken) {
    throw new UnauthorizedError("Authentication required");
  }

  try {
    req.user = verifyToken(accessToken);

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
