import { db } from "@prisma/db";

type CreateUserData = Pick<
  Parameters<typeof db.orm.public.User.create>[0],
  "fullName" | "email" | "password"
>;

const create = (data: CreateUserData) => {
  return db.orm.public.User.create(data);
};

const findByEmail = (email: string) => {
  return db.orm.public.User.where({
    email,
  }).first();
};

export const userRepository = { create, findByEmail };
