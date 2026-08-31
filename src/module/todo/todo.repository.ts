import { db } from "#prisma/db.js";

type TodoData = Parameters<typeof db.orm.public.Todo.create>[0];
type TodoStatus = NonNullable<TodoData["status"]>;

type UpdateParams = {
  id: string;
  data: TodoData;
};
type FindByStatusParams = {
  userId: string;
  status: TodoStatus;
};

const create = (data: TodoData) => {
  return db.orm.public.Todo.create(data);
};

const update = ({ id, data }: UpdateParams) => {
  return db.orm.public.Todo.where({ id }).update(data);
};

const remove = (id: string) => {
  return db.orm.public.Todo.where({ id }).delete();
};

const findById = (id: string) => {
  return db.orm.public.Todo.where({ id }).first();
};

const findByStatus = ({ userId, status }: FindByStatusParams) => {
  return db.orm.public.Todo.where({ userId, status });
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
