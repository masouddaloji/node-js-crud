import { ApiError, hashPassword } from "@/utils";
import { userRepository } from "../user/user.repository";
import type { RegisterUserInput } from "./auth.validator";

const registerUser = async ({
  fullName,
  email,
  password,
}: RegisterUserInput) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new ApiError({
      statusCode: 409,
      message: "Unable to create user",
    });
  }
  const hashedPassword = await hashPassword(password);
  return userRepository.create({ fullName, email, password: hashedPassword });
};

const loginUser = async (email: string, password: string) => {}
export const authService = { registerUser };
