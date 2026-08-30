import express, { type Response } from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error-handler.middleware.ts";
import { corsOptions } from "./config/cors.ts";
import { randomBytes } from "node:crypto";
import { env } from "./config/env.ts";

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
app.listen(port, () => {
  console.log("app run in port 4000");
});
const token = randomBytes(128).toString("hex");
console.log(token);
