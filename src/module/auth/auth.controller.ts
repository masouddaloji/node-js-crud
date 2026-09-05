import type { RequestHandler } from "express";

import { UnauthorizedError } from "#utils/ApiError.js";
import {
  clearRefreshTokenCookie,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "#utils/cookie.js";

import type { LoginUserInput, RegisterUserInput } from "./auth.schema.js";
import { authService } from "./auth.service.js";

const register: RequestHandler = async (req, res) => {
  const userData: RegisterUserInput = req.body;
  const { accessToken, refreshToken } = await authService.register(userData);

  setAccessTokenCookie(res, accessToken);
  setRefreshTokenCookie(res, refreshToken);

  return res.status(201).json({ message: "User registered successfully" });
};
const login: RequestHandler = async (req, res) => {
  const credentials: LoginUserInput = req.body;
  const { accessToken, refreshToken } = await authService.login(credentials);
  setAccessTokenCookie(res, accessToken);
  setRefreshTokenCookie(res, refreshToken);
  return res.status(200).json({ message: "Logged in successfully" });
};

const refresh: RequestHandler = async (req, res) => {
  const oldRefreshToken = req.cookies.refreshToken;
  if (!oldRefreshToken) {
    throw new UnauthorizedError("Refresh token not found");
  }
  const { accessToken, refreshToken } = await authService.refreshToken(oldRefreshToken);
  setRefreshTokenCookie(res, refreshToken);
  return res.status(200).json({ accessToken });
};

const logout: RequestHandler = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new UnauthorizedError("Refresh token not found");
  }
  await authService.logout(refreshToken);
  clearRefreshTokenCookie(res);
  return res.status(200).json({ message: "Logged out successfully" });
};
export const authController = {
  register,
  login,
  refresh,
  logout,
};
