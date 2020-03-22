import { connect, connection } from "mongoose";
import { config } from "../config";
import { log } from "../log";

export const connectToDatabase = async () => {
  connection.on("error", console.error.bind(console, "connection error:"));
  connection.once("open", () => log("Connected to MongoDB"));
  const instance = await connect(config.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  return instance;
};

export * from "./models";
