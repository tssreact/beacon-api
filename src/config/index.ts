import { config as dotEnvConfig } from "dotenv";

dotEnvConfig();

export const config = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGODB_URI || "mongodb://localhost/beacon",
  bcryptHashRounds: 8,
  jwtSalt: "SALTYSALTYWOO",
};
