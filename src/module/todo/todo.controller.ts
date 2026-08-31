import type { RequestHandler } from "express";

import { todoService } from "./todo.service.js";

const create: RequestHandler = async (req, res) => {
  const userId = req.user!.userId;
  const data = await todoService.create({ userId, data: req.body });
  res.status(201).json({ message: "Todo created successfully", data });
};

export const todoController = {
  create,
};
