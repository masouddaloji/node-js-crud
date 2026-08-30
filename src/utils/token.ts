import { createHash, randomBytes } from "node:crypto";

import jwt from "jsonwebtoken";

import { env } from "#config/env.js";

const ACCESS_SECRET = env.JWT_ACCESS_SECRET;

export const generateRefreshToken = () => {
  return randomBytes(32).toString("base64url");
};

export const getRefreshExpiryDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString();
};

interface AccessTokenPayload {
  userId: string;
  role: string;
}

export const signToken = (payload: AccessTokenPayload) => {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "30m",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET) as AccessTokenPayload;
};

export const hashRefreshToken = (token: string) => {
  return createHash("sha256").update(token).digest("base64url");
};
