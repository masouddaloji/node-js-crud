import { Router } from "express";

import { authMiddleware } from "#middlewares/auth.middleware.js";
import { validateSchema } from "#middlewares/validator.middleware.js";

import { todoController } from "./todo.controller.js";
import { createTodoSchema, updateTodoSchema } from "./todo.schema.js";

const router = Router();
router.use(authMiddleware);
router.post("/", validateSchema(createTodoSchema), todoController.create);
router.patch("/:id", validateSchema(updateTodoSchema), todoController.update);
router.delete("/:id", todoController.delete);
router.get("/", todoController.findAll);
router.get("/:id", todoController.findById);
router.get("/:status", todoController.findByStatus);

export const todoRouter = router;
