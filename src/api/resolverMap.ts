import { config } from "config";
import { UserModel } from "data";
import { AuthorizationError } from "errors";
import { IResolvers } from "graphql-tools";
import { verify } from "jsonwebtoken";
import { createUser, login, users } from "./resolvers";
import { createAddress } from "./resolvers/mutations/create-address";

const checkAuthAndResolve = async (
  context: any,
  args: any,
  controller: any,
) => {
  const token = context.authorization;
  if (!token) {
    throw new AuthorizationError();
  }

  const decoded: { _id: string } = (verify(
    token.replace("Bearer ", ""),
    config.jwtSecret,
  ) as any) as { _id: string };

  const user = await UserModel.findOne({ _id: decoded._id });

  if (!user) throw new AuthorizationError();

  context.user = user;

  return controller.apply(undefined, [context, args]);
};

const resolverMap: IResolvers = {
  Query: {
    users: (_, args, context) => checkAuthAndResolve(context, args, users),
  },
  Mutation: {
    createUser,
    login,
    createAddress: (_, args, context) =>
      checkAuthAndResolve(context, args, createAddress),
  },
};
export default resolverMap;
