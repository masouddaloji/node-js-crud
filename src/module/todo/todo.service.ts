import { userRepository } from "#module/user/user.repository.js";
import { NotFoundError } from "#utils/ApiError.js";

import { todoRepository } from "./todo.repository.js";
import type {
  CreateTodoParams,
  DeleteTodoParams,
  FindByIdParams,
  FindByStatusParams,
  UpdateTodoParams,
} from "./type.js";

const create = async ({ userId, data }: CreateTodoParams) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const todo = await todoRepository.create({
    userId,
    ...data,
  });
  return todo;
};

const update = async ({ id, userId, data }: UpdateTodoParams) => {
  const updatedTodo = await todoRepository.update({
    id,
    userId,
    data,
  });

  if (!updatedTodo) {
    throw new NotFoundError("Todo not found");
  }

  return updatedTodo;
};

const remove = async ({ id, userId }: DeleteTodoParams) => {
  const deletedTodo = await todoRepository.delete({ id, userId });

  if (!deletedTodo) {
    throw new NotFoundError("Todo not found");
  }

  return deletedTodo;
};

const findById = async ({ userId, id }: FindByIdParams) => {
  const todo = await todoRepository.findById({ id, userId });
  if (!todo) {
    throw new NotFoundError("Todo not found");
  }
  return todo;
};

const findByStatus = async ({ status, userId }: FindByStatusParams) => {
  const todos = await todoRepository.findByStatus({ userId, status });
  return todos;
};
const findAll = async (userId: string) => {
  const todos = await todoRepository.findAll(userId);
  return todos;
};

export const todoService = {
  create,
  update,
  delete: remove,
  findById,
  findByStatus,
  findAll,
};
