// resolverMap.ts
import { IResolvers } from "graphql-tools";
import { UserModel } from "../data";
import { createUser, login } from "./resolvers";

const resolverMap: IResolvers = {
  Query: {
    users: async (_: void, args: void): Promise<{ name: string }[]> => {
      const users = await UserModel.find();
      return users;
    },
  },
  Mutation: {
    createUser,
    login,
  },
};
export default resolverMap;
