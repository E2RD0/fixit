import dotenv from "dotenv";
dotenv.config();

export default {
  // App environment variables
  SERVICE_APP_NAME: process.env.SERVICE_APP_NAME || "fixit-service",
  SERVICE_APP_PORT: process.env.SERVICE_APP_PORT || "4000",
  SERVICE_APP_ENV: process.env.SERVICE_APP_ENV || "development",

  //Database environment variables
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || 27017,
  DB_NAME: process.env.DB_NAME || "fixit-service",
  DB_USERNAME: process.env.DB_USERNAME || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",

  //JWT environment variables
  JWT_SECRET: process.env.JWT_SECRET || "secret"
};
