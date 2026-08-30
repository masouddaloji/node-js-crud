import { Router } from "express";

import { validate } from "@/middlewares";

import { authController } from "./auth.controller";
import { loginUserSchema, registerUserSchema } from "./auth.validator";

const router = Router();

router.post("/register", validate(registerUserSchema), authController.register);
router.post("/login", validate(loginUserSchema), authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

export const authRoutes = router;
