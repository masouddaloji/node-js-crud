import type { RequestHandler } from "express";

import { userService } from "./user.service.js";

const getProfile: RequestHandler = async (req, res) => {
  const userId = req.user!.userId;
  const data = await userService.findById({ id: userId });
  res.status(200).json({ data });
};

export const userController = { getProfile };
