// resolverMap.ts
import { IResolvers } from "graphql-tools";
import { createUser, login, users } from "./resolvers";

const resolverMap: IResolvers = {
  Query: {
    users,
  },
  Mutation: {
    createUser,
    login,
  },
};
export default resolverMap;
