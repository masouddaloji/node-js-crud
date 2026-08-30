import argon2, { type HashOptions } from "argon2";

const HASH_OPTIONS: HashOptions = {
  type: argon2.argon2id,
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
};

export const hashPassword = async (currentPassword: string) => {
  return await argon2.hash(currentPassword, HASH_OPTIONS);
};

export const verifyPassword = async (hashedPassword: string, currentPassword: string) => {
  try {
    return await argon2.verify(hashedPassword, currentPassword);
  } catch (error) {
    console.error("Error verifying password:", error);
    return false;
  }
};
