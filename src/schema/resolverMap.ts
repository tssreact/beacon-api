// resolverMap.ts
import { IResolvers } from "graphql-tools";
import { UserModel, UserSchema } from "../data";

const resolverMap: IResolvers = {
  Query: {
    users: async (_: void, args: void): Promise<{ name: string }[]> => {
      const users = await UserModel.find();
      return users;
    },
  },
  Mutation: {
    createUser: async (
      _: void,
      {
        email,
        password,
        name,
      }: { email: string; password: string; name: string },
    ) => {
      try {
        const user = await UserModel.create({
          email,
          password,
          name,
        });
        return user;
      } catch (error) {
        throw error;
      }
    },
    login: async (
      _: void,
      { email, password }: { email: string; password: string },
    ): Promise<UserSchema> => {
      try {
        const user = await UserModel.findByCredentials(email, password);
        return user;
      } catch (error) {
        throw error;
      }
    },
  },
};
export default resolverMap;
