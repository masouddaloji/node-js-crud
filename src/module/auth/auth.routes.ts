import { Router } from "express";

import { validateSchema } from "#middlewares/validator.middleware.js";

import { authController } from "./auth.controller.js";
import { loginUserSchema, registerUserSchema } from "./auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerUserSchema), authController.register);
router.post("/login", validateSchema(loginUserSchema), authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

export const authRoutes = router;
