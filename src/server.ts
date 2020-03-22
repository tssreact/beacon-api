import { ApolloServer } from "apollo-server-express";
import compression from "compression";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import depthLimit from "graphql-depth-limit";
import { createServer } from "http";
import { connect, connection } from "mongoose";
import { UserModel } from "./data";
import schema from "./schema";

config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/beacon";

// db
connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });
const db = connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");

  const user = new UserModel();
  user.name = "Gavin";

  try {
    await user.save();
  } catch (error) {
    console.error(error);
  }
});

const app = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  introspection: true,
  playground: true
});

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
