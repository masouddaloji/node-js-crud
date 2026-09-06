import { registry } from "#config/openapi.js";

import { userProfileResponseSchema } from "./user.schema.js";

const UserProfileResponse = registry.register("UserProfileResponse", userProfileResponseSchema);

registry.registerPath({
  method: "get",
  path: "/user/profile",
  tags: ["User"],
  operationId: "getUserProfile",
  summary: "Get user profile",
  description: "Returns the profile of the authenticated user.",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: "User profile retrieved successfully.",

      content: {
        "application/json": {
          schema: UserProfileResponse,
        },
      },
    },
    401: {
      description: "Authentication required.",
    },
    404: {
      description: "User not found.",
    },
  },
});
