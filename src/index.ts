import { connectToDatabase } from "./data";
import { createWebServer } from "./server";

const main = async () => {
  await connectToDatabase();
  await createWebServer();
};

main();
