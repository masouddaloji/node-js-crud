import { NotFoundError } from "#utils/ApiError.js";

import type { FindByIdParams } from "./type.js";
import { userRepository } from "./user.repository.js";

const findById = async ({ id }: FindByIdParams) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
};

export const userService = {
  findById,
};
