import { ApolloServer } from "apollo-server-express";
import compression from "compression";
import cors from "cors";
import express from "express";
import depthLimit from "graphql-depth-limit";
import { createServer } from "http";
import schema from "./schema";
const app = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  introspection: true,
  playground: true
});

const PORT = process.env.PORT || 3000;

app.use("*", cors());
app.use(compression());
server.applyMiddleware({ app, path: "/graphql" });
const httpServer = createServer(app);

app.get("/", (req, res) => res.send("Browse to /graphql"));

httpServer.listen({ port: PORT }, (): void =>
  console.log(
    `\n🚀      GraphQL is now running on http://localhost:${PORT}/graphql`
  )
);
