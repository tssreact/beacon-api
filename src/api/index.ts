// schema.ts
import { GraphQLSchema } from "graphql";
import "graphql-import-node";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolverMap";
/// <reference path="../definitions/graphql.d.ts" />
import typeDefs from "./schema.graphql";

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
