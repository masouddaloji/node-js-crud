import { userRepository } from "#module/user/user.repository.js";
import { ApiError, UnauthorizedError } from "#utils/ApiError.js";
import { hashPassword, verifyPassword } from "#utils/argon2.js";
import {
  generateRefreshToken,
  getRefreshExpiryDate,
  hashRefreshToken,
  signToken,
} from "#utils/token.js";

import { authRepository } from "./auth.repository.js";
import type { LoginUserInput, RegisterUserInput } from "./auth.schema.js";

const generateAuthTokens = async (userId: string) => {
  const accessToken = signToken({ userId, role: "USER" });
  const refreshToken = generateRefreshToken();

  await authRepository.createRefreshToken({
    userId,
    tokenHash: hashRefreshToken(refreshToken),
    expiresAt: getRefreshExpiryDate(),
  });

  return { accessToken, refreshToken };
};

const register = async ({ fullName, email, password }: RegisterUserInput) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new ApiError({
      statusCode: 409,
      message: "Unable to create user",
    });
  }
  const hashedPassword = await hashPassword(password);
  const user = await userRepository.create({ fullName, email, password: hashedPassword });
  return generateAuthTokens(user.id);
};

const login = async ({ email, password }: LoginUserInput) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }
  const passwordMatch = await verifyPassword(password, user.password);
  if (!passwordMatch) {
    throw new UnauthorizedError("Invalid email or password");
  }

  return generateAuthTokens(user.id);
};

const logout = async (refreshToken: string) => {
  const tokenHash = hashRefreshToken(refreshToken);
  await authRepository.revokeRefreshToken(tokenHash);
};

const refreshToken = async (refreshToken: string) => {
  const tokenHash = hashRefreshToken(refreshToken);
  const storedToken = await authRepository.findRefreshToken(tokenHash);
  if (!storedToken || storedToken.revokedAt || new Date(storedToken.expiresAt) < new Date()) {
    throw new UnauthorizedError("Invalid refresh token");
  }
  const userId = storedToken.userId;
  await authRepository.revokeRefreshToken(tokenHash);
  return generateAuthTokens(userId);
};

export const authService = { register, login, refreshToken, logout };
