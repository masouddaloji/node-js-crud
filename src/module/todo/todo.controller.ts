import type { RequestHandler } from "express";

import { findAllTodoSchema } from "./todo.schema.js";
import { todoService } from "./todo.service.js";
import type { FindAllParams } from "./type.js";

type TodoIdParams = {
  id: string;
};

const create: RequestHandler = async (req, res) => {
  const userId = req.user!.userId;
  const data = await todoService.create({ userId, data: req.body });
  res.status(201).json({ message: "Todo created successfully", data });
};

const update: RequestHandler<TodoIdParams> = async (req, res) => {
  const userId = req.user!.userId;
  const id = req.params.id;
  const data = req.body;
  const updateTodo = await todoService.update({ id, userId, data });
  res.status(200).json({ message: "Todo updated successfully", data: updateTodo });
};

const remove: RequestHandler<TodoIdParams> = async (req, res) => {
  const userId = req.user!.userId;
  const id = req.params.id;
  await todoService.delete({ id, userId });
  res.status(204).send();
};

const findById: RequestHandler<TodoIdParams> = async (req, res) => {
  const userId = req.user!.userId;
  const id = req.params.id;
  const data = await todoService.findById({ userId, id });
  res.status(200).json(data);
};

const findAll: RequestHandler<FindAllParams> = async (req, res) => {
  const userId = req.user!.userId;
  const { search, status, sortOrder } = findAllTodoSchema.parse(req.query);
  const data = await todoService.findAll({ userId, search, status, sortOrder });
  res.status(200).json(data);
};

export const todoController = {
  create,
  update,
  delete: remove,
  findById,
  findAll,
};
