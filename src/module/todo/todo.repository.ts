import { db } from "#prisma/db.js";

import type {
  DeleteTodoParams,
  FindAllParams,
  FindByIdParams,
  TodoData,
  UpdateParams,
} from "./type.js";

const create = (data: TodoData) => {
  return db.orm.public.Todo.create(data);
};

const update = ({ id, userId, data }: UpdateParams) => {
  return db.orm.public.Todo.where({ id, userId }).update(data);
};

const remove = ({ id, userId }: DeleteTodoParams) => {
  return db.orm.public.Todo.where({ id, userId }).delete();
};

const findById = ({ id, userId }: FindByIdParams) => {
  return db.orm.public.Todo.where({ id, userId }).first();
};

const findAll = ({ userId, status, search, sortOrder }: FindAllParams) => {
  return db.orm.public.Todo.where({
    userId,
    ...(status && { status }),
    ...(search && {
      or: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    }),
  })
    .orderBy((todo) => (sortOrder === "desc" ? todo.createdAt.desc() : todo.createdAt.asc()))
    .all();
};

export const todoRepository = {
  create,
  update,
  delete: remove,
  findById,
  findAll,
};
