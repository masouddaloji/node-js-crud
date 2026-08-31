import { db } from "#prisma/db.js";

type UserData = Pick<
  Parameters<typeof db.orm.public.User.create>[0],
  "fullName" | "email" | "password"
>;

const create = (data: UserData) => {
  return db.orm.public.User.create(data);
};

const findByEmail = (email: string) => {
  return db.orm.public.User.where({
    email,
  }).first();
};
const findById = (id: string) => {
  return db.orm.public.User.where({ id }).first();
};

export const userRepository = { create, findByEmail, findById };
