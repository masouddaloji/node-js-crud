import type { CookieOptions, Response } from "express";

export const ACCESS_COOKIE_NAME = "accessToken";
const REFRESH_COOKIE_NAME = "refreshToken";

const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000;
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const baseCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  path: "/",
} satisfies CookieOptions;

const ACCESS_TOKEN_COOKIE_OPTIONS = {
  ...baseCookieOptions,
  maxAge: ACCESS_TOKEN_MAX_AGE,
} satisfies CookieOptions;

const REFRESH_TOKEN_COOKIE_OPTIONS = {
  ...baseCookieOptions,
  maxAge: REFRESH_TOKEN_MAX_AGE,
} satisfies CookieOptions;

export const setAccessTokenCookie = (res: Response, token: string) => {
  return res.cookie(ACCESS_COOKIE_NAME, token, ACCESS_TOKEN_COOKIE_OPTIONS);
};

export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  return res.cookie(REFRESH_COOKIE_NAME, refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
};

export const clearAccessTokenCookie = (res: Response) => {
  res.clearCookie(ACCESS_COOKIE_NAME, baseCookieOptions);
};

export const clearRefreshTokenCookie = (res: Response) => {
  res.clearCookie(REFRESH_COOKIE_NAME, baseCookieOptions);
};

export const clearAuthCookies = (res: Response) => {
  clearAccessTokenCookie(res);
  clearRefreshTokenCookie(res);

  return res;
};
