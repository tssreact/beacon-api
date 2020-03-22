import { ApolloServer } from "apollo-server-express";
import compression from "compression";
import cors from "cors";
import express from "express";
import depthLimit from "graphql-depth-limit";
import { createServer } from "http";
import { config } from "../config";
import { log } from "../log";
import schema from "../schema";

export const createWebServer = async () => {
  const app = express();

  const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
    introspection: true,
    playground: true,
  });

  app.use("*", cors());
  app.use(compression());
  server.applyMiddleware({ app, path: "/graphql" });
  const httpServer = createServer(app);

  app.get("/", (req, res) => res.send("Browse to /graphql"));

  httpServer.listen({ port: config.port }, (): void => {
    log(`GraphQL is now running on http://localhost:${config.port}/graphql`);
  });

  return httpServer;
};
