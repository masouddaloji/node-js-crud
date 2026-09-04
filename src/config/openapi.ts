import "./zod-openapi.js";

import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export const registry = new OpenAPIRegistry();

export const bearerAuth = registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

export const refreshTokenAuth = registry.registerComponent("securitySchemes", "refreshTokenAuth", {
  type: "apiKey",
  in: "cookie",
  name: "refreshToken",
});
