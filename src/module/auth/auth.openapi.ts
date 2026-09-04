import { registry } from "#config/openapi.js";

import { loginUserSchema, registerUserSchema } from "./auth.schema.js";

/*
 * Reusable request schemas
 */
const RegisterUserRequest = registry.register("RegisterUserRequest", registerUserSchema);

const LoginUserRequest = registry.register("LoginUserRequest", loginUserSchema);

/*
 * POST /auth/register
 */
registry.registerPath({
  method: "post",
  path: "/auth/register",

  tags: ["Auth"],

  summary: "Register a new user",

  description: "Creates a new user account and returns an access token.",

  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: RegisterUserRequest,
        },
      },
    },
  },

  responses: {
    201: {
      description: "User registered successfully.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              accessToken: {
                type: "string",
              },
            },
            required: ["accessToken"],
          },
        },
      },
    },

    400: {
      description: "Validation error.",
    },

    409: {
      description: "User already exists.",
    },
  },
});

/*
 * POST /auth/login
 */
registry.registerPath({
  method: "post",
  path: "/auth/login",

  tags: ["Auth"],

  summary: "Login user",

  description: "Authenticates a user and returns an access token.",

  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: LoginUserRequest,
        },
      },
    },
  },

  responses: {
    200: {
      description: "Login successful.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              accessToken: {
                type: "string",
              },
            },
            required: ["accessToken"],
          },
        },
      },
    },

    400: {
      description: "Validation error.",
    },

    401: {
      description: "Invalid email or password.",
    },
  },
});

/*
 * POST /auth/refresh
 */
registry.registerPath({
  method: "post",
  path: "/auth/refresh",

  tags: ["Auth"],

  summary: "Refresh access token",

  description:
    "Generates a new access token using the refresh token stored in the HTTP-only cookie.",

  security: [
    {
      refreshTokenAuth: [],
    },
  ],

  responses: {
    200: {
      description: "Access token refreshed successfully.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              accessToken: {
                type: "string",
              },
            },
            required: ["accessToken"],
          },
        },
      },
    },

    401: {
      description: "Refresh token is missing or invalid.",
    },
  },
});

/*
 * POST /auth/logout
 */
registry.registerPath({
  method: "post",
  path: "/auth/logout",

  tags: ["Auth"],

  summary: "Logout user",

  description: "Revokes the current refresh token and clears the refresh token cookie.",

  security: [
    {
      refreshTokenAuth: [],
    },
  ],

  responses: {
    200: {
      description: "Logged out successfully.",
    },

    401: {
      description: "Refresh token is missing or invalid.",
    },
  },
});
