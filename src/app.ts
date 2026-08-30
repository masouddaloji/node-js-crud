import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Response } from "express";
import helmet from "helmet";

import { corsOptions } from "./config/cors.ts";
import { env } from "./config/env.ts";
import { errorHandler } from "./middlewares";
import { authRoutes } from "./module/auth/auth.routes.ts";

const port = env.PORT || 4000;

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.get("/", (_, res: Response) => {
  res.status(200).send("hello");
});

app.use(errorHandler);
app.use("/auth", authRoutes);
app.listen(port, () => {
  console.log("app run in port 4000");
});
