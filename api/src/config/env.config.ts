import { config } from "dotenv";

config();

export default {
  DB_URL: process.env.DB_URL as string,
};
