import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import { corsOptions } from "#config/cors.js";
import { env } from "#config/env.js";
import { swaggerSpec } from "#config/swagger.js";
import { errorHandler } from "#middlewares/error-handler.middleware.js";
import { authRoutes } from "#module/auth/auth.routes.js";
import { todoRouter } from "#module/todo/todo.routes.js";

const port = env.PORT || 4000;

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRoutes);
app.use("/todo", todoRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log("app run in port 4000");
});
