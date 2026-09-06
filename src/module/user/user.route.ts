import { Router } from "express";

import { authMiddleware } from "#middlewares/auth.middleware.js";

import { userController } from "./user.controller.js";

const router = Router();
router.use(authMiddleware);
router.get("/profile", userController.getProfile);

export const userRoute = router;
