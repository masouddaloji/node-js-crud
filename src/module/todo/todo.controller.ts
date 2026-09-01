import type { RequestHandler } from "express";

import { todoService } from "./todo.service.js";
import type { TodoStatus } from "./type.js";

type TodoIdParams = {
  id: string;
};

type TodoStatusParams = {
  status: TodoStatus;
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
  res.status(204).json({ message: "Todo removed successfully" });
};

const findById: RequestHandler<TodoIdParams> = async (req, res) => {
  const userId = req.user!.userId;
  const id = req.params.id;
  const data = await todoService.findById({ userId, id });
  res.status(200).json({ data });
};
const findByStatus: RequestHandler<TodoStatusParams> = async (req, res) => {
  const userId = req.user!.userId;
  const status = req.params.status;
  const data = await todoService.findByStatus({ status, userId });
  res.status(200).json({ data });
};
const findAll: RequestHandler = async (req, res) => {
  const userId = req.user!.userId;
  const data = await todoService.findAll(userId);
  res.status(200).json({ data });
};

export const todoController = {
  create,
  update,
  delete: remove,
  findById,
  findByStatus,
  findAll,
};
