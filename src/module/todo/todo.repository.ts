import { or } from "@prisma/orm-postgres/orm-client";

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
  let query = db.orm.public.Todo.where({
    userId,
    ...(status && { status }),
  });

  if (search) {
    query = query.where((todo) =>
      or(todo.title.ilike(`%${search}%`), todo.description.ilike(`%${search}%`)),
    );
  }

  return query
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
