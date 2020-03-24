import { createError } from "apollo-errors";

export const AuthorizationError = createError("AuthorizationError", {
  message: "You are not authorized",
});

export class MissingArgumentError extends Error {
  constructor(message = "", ...args: any[]) {
    super(...args);
    this.message =
      message +
      " environment variable has not been defined\nAdd the missing value to the .env file or supply it as an environment variable.";
    Error.captureStackTrace(this, MissingArgumentError);
  }
}
