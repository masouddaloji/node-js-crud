import { db } from "#prisma/db.js";

import type {
  DeleteTodoParams,
  FindByIdParams,
  FindByStatusParams,
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

const findByStatus = ({ userId, status }: FindByStatusParams) => {
  return db.orm.public.Todo.where({ userId, ...(status && { status }) }).all();
};

const findAll = (userId: string) => {
  return db.orm.public.Todo.where({ userId }).all();
};

export const todoRepository = {
  create,
  update,
  delete: remove,
  findById,
  findByStatus,
  findAll,
};
