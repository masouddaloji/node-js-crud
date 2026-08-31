// todoRepository

import { userRepository } from "#module/user/user.repository.js";
import { NotFoundError } from "#utils/ApiError.js";

import { todoRepository } from "./todo.repository.js";
import type { CreateTodoInput } from "./todo.schema.js";

type CreateTodoParams = {
  userId: string;
  todoId: string;
  data: CreateTodoInput;
};

type UpdateTodoParams = {
  userId: string;
  todoId: string;
  data: CreateTodoInput;
};
type DeleteTodoParams = {
  userId: string;
  todoId: string;
};

const create = async ({ userId, data }: CreateTodoParams) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new NotFoundError("Resource not found");
  }
  const todo = await todoRepository.create({
    userId,
    ...data,
  });
  return todo;
};

const update = async ({ userId, todoId, data }: UpdateTodoParams) => {
  const todo = await todoRepository.findById(todoId);
  if (!todo || todo.userId !== userId) {
    throw new NotFoundError("Todo not found");
  }
  const newTodoData = await todoRepository.update({
    id: todoId,
    data,
  });
  return newTodoData;
};

const remove = async ({ todoId, userId }: DeleteTodoParams) => {
  const todo = await todoRepository.findById(todoId);
  if (!todo || todo.userId !== userId) {
    throw new NotFoundError("Todo not found");
  }
  const removeTodoData = await todoRepository.delete(todoId);
  return removeTodoData;
};

export const todoService = {
  create,
  update,
  delete: remove,
};
