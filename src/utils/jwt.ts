import jwt from "jsonwebtoken";
import { randomBytes } from "node:crypto";
import { env } from "../config/env.ts";

const ACCESS_SECRET = env.JWT_ACCESS_SECRET;
const REFRESH_EXPIRES_DAYS = 7;

export const generateRefreshTokenString = () => {
  return randomBytes(32).toString("base64url");
};
console.log(randomBytes(64).toString("base64url"))
export const getRefreshExpiryDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + REFRESH_EXPIRES_DAYS);
  return date;
};

interface AccessTokenPayload {
  userId: string;
  role: string;
}

export const signAccessToken = (payload: AccessTokenPayload) => {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "30m",
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET) as AccessTokenPayload;
};
