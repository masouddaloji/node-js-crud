import type { Response } from "express";
const REFRESH_COOKIE_NAME = "refreshToken";

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "strict" as const,
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  return res.cookie(REFRESH_COOKIE_NAME, refreshToken, REFRESH_COOKIE_OPTIONS);
};

export const clearRefreshTokenCookie = (res: Response) => {
  return res.clearCookie(REFRESH_COOKIE_NAME);
};
