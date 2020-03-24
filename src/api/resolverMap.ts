import { config } from "config";
import { AuthorizationError } from "errors";
import { IResolvers } from "graphql-tools";
import { verify } from "jsonwebtoken";
import { createUser, login, users } from "./resolvers";

const checkAuthAndResolve = (context: any, controller: any) => {
  const token = context.authorization;
  if (!token) {
    throw new AuthorizationError();
  }
  const decoded = verify(token.replace("Bearer ", ""), config.jwtSecret);
  return controller.apply(undefined, [decoded]);
};

const resolverMap: IResolvers = {
  Query: {
    users: (_, args, context) => checkAuthAndResolve(context, users),
  },
  Mutation: {
    createUser,
    login,
  },
};
export default resolverMap;
