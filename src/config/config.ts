import dotenv from "dotenv";

dotenv.config();

const config = {
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT || 8080,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET,
};

export default config;
