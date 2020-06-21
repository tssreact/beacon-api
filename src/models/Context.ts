import { UserSchema } from "data";

export type Context = {};

export type ContextWithUser = Context & { user: UserSchema };
