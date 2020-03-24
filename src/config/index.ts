import { config as dotEnvConfig } from "dotenv";
import { MissingArgumentError } from "errors";

dotEnvConfig();

if (!process.env.JWT_SECRET) throw new MissingArgumentError("JWT_SECRET");
if (!process.env.MONGODB_URI) throw new MissingArgumentError("MONGODB_URI");

export const config = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGODB_URI,
  bcryptHashRounds: 8,
  jwtSecret: process.env.JWT_SECRET,
};
