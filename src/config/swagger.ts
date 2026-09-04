import "#module/auth/auth.openapi.js";
import "#module/todo/todo.openapi.js";

import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import { registry } from "./openapi.js";

export const swaggerSpec = new OpenApiGeneratorV3(registry.definitions).generateDocument({
  openapi: "3.0.3",

  info: {
    title: "Todo API",
    version: "1.0.0",
    description: "REST API for Todo application.",
  },

  servers: [
    {
      url: "http://localhost:4000",
      description: "Local development server",
    },
  ],

  tags: [
    {
      name: "Auth",
      description: "Authentication endpoints",
    },
    {
      name: "Todo",
      description: "Todo management endpoints",
    },
  ],
});
