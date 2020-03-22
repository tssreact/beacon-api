import { connect, connection } from "mongoose";
import { config } from "../config";
import { log } from "../log";
import { UserModel } from "./models";

const db = connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  log("Connected to MongoDB");

  const user = new UserModel();
  user.name = "Gavin";

  try {
    await user.save();
  } catch (error) {
    console.error(error);
  }
});

export const connectToDatabase = async () => {
  const connection = await connect(config.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  return connection;
};
