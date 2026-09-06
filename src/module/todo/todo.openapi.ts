import { registry } from "#config/openapi.js";

import {
  createTodoSchema,
  todoIdParamsSchema,
  todoMutationResponseSchema,
  todoResponseSchema,
  todoStatusParamsSchema,
  updateTodoSchema,
} from "./todo.schema.js";

/*
 * Reusable schemas
 */

const CreateTodoRequest = registry.register("CreateTodoRequest", createTodoSchema);

const UpdateTodoRequest = registry.register("UpdateTodoRequest", updateTodoSchema);

const TodoIdParams = registry.register("TodoIdParams", todoIdParamsSchema);

const TodoStatusParams = registry.register("TodoStatusParams", todoStatusParamsSchema);

const TodoResponse = registry.register("TodoResponse", todoResponseSchema);

const TodoMutationResponse = registry.register("TodoMutationResponse", todoMutationResponseSchema);

const TodoListResponse = registry.register("TodoListResponse", todoResponseSchema.array());

/*
 * POST /todo
 */
registry.registerPath({
  method: "post",
  path: "/todo",
  tags: ["Todo"],
  operationId: "createTodo",
  summary: "Create a todo",
  description: "Creates a new todo for the authenticated user.",
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: CreateTodoRequest,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Todo created successfully.",
      content: {
        "application/json": {
          schema: TodoMutationResponse,
        },
      },
    },
    400: {
      description: "Validation error.",
    },
    401: {
      description: "Authentication required.",
    },
  },
});

/*
 * PATCH /todo/{id}
 */
registry.registerPath({
  method: "patch",
  path: "/todo/{id}",
  tags: ["Todo"],
  operationId: "updateTodo",
  summary: "Update a todo",
  description: "Updates an existing todo owned by the authenticated user.",
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {
    params: TodoIdParams,
    body: {
      required: true,
      content: {
        "application/json": {
          schema: UpdateTodoRequest,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Todo updated successfully.",
      content: {
        "application/json": {
          schema: TodoMutationResponse,
        },
      },
    },
    400: {
      description: "Validation error.",
    },
    401: {
      description: "Authentication required.",
    },
    404: {
      description: "Todo not found.",
    },
  },
});

/*
 * DELETE /todo/{id}
 */
registry.registerPath({
  method: "delete",
  path: "/todo/{id}",
  tags: ["Todo"],
  operationId: "deleteTodo",
  summary: "Delete a todo",
  description: "Deletes a todo owned by the authenticated user.",
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {
    params: TodoIdParams,
  },
  responses: {
    204: {
      description: "Todo deleted successfully.",
    },
    401: {
      description: "Authentication required.",
    },
    404: {
      description: "Todo not found.",
    },
  },
});

/*
 * GET /todo
 */
registry.registerPath({
  method: "get",
  path: "/todo",
  tags: ["Todo"],
  operationId: "getTodos",
  summary: "Get todos",
  description: "Returns all todos owned by the authenticated user.",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: "Todos retrieved successfully.",
      content: {
        "application/json": {
          schema: TodoListResponse,
        },
      },
    },
    401: {
      description: "Authentication required.",
    },
  },
});

/*
 * GET /todo/status/{status}
 */
registry.registerPath({
  method: "get",
  path: "/todo/status/{status}",
  tags: ["Todo"],
  operationId: "getTodosByStatus",
  summary: "Get todos by status",
  description: "Returns todos filtered by status.",
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {
    params: TodoStatusParams,
  },
  responses: {
    200: {
      description: "Todos retrieved successfully.",
      content: {
        "application/json": {
          schema: TodoListResponse,
        },
      },
    },
    400: {
      description: "Invalid todo status.",
    },
    401: {
      description: "Authentication required.",
    },
  },
});

/*
 * GET /todo/{id}
 */
registry.registerPath({
  method: "get",
  path: "/todo/{id}",
  tags: ["Todo"],
  operationId: "getTodo",
  summary: "Get a todo by ID",
  description: "Returns a single todo owned by the authenticated user.",
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {
    params: TodoIdParams,
  },
  responses: {
    200: {
      description: "Todo retrieved successfully.",
      content: {
        "application/json": {
          schema: TodoResponse,
        },
      },
    },
    401: {
      description: "Authentication required.",
    },
    404: {
      description: "Todo not found.",
    },
  },
});
