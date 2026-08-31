import type { db } from "#prisma/db.js";

import type { CreateTodoInput, UpdateTodoInput } from "./todo.schema.js";

export type TodoData = Parameters<typeof db.orm.public.Todo.create>[0];
export type TodoStatus = NonNullable<TodoData["status"]>;
export type UpdateTodoData = Partial<Omit<TodoData, "userId">>;

export type UpdateParams = {
  id: string;
  userId: string;
  data: UpdateTodoData;
};

export type FindByIdParams = {
  userId: string;
  id: string;
};
export type FindByStatusParams = {
  userId: string;
  status: TodoStatus;
};

export type CreateTodoParams = {
  userId: string;
  data: CreateTodoInput;
};

export type UpdateTodoParams = {
  userId: string;
  id: string;
  data: UpdateTodoInput;
};

export type DeleteTodoParams = {
  id: string;
  userId: string;
};
