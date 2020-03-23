// schema.ts
import { GraphQLSchema } from "graphql";
import "graphql-import-node";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolverMap";
import * as typeDefs from "./schema.graphql";

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
