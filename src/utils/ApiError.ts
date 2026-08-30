interface ApiErrorOptions {
  statusCode: number;
  message: string;
  isOperational?: boolean;
}

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor({ statusCode, message, isOperational = true }: ApiErrorOptions) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class NotFoundError extends ApiError {
  constructor(resource = "Resource") {
    super({ statusCode: 404, message: `${resource} not found` });
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Authentication required") {
    super({ statusCode: 401, message });
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Access denied") {
    super({ statusCode: 403, message });
  }
}

export class ValidationError extends ApiError {
  public readonly fields: Record<string, string[]>;

  constructor(fields: Record<string, string[]>) {
    super({ statusCode: 422, message: "Validation failed" });
    this.fields = fields;
  }
}
