import dotenv from "dotenv";

dotenv.config();

export default {
  BOT_TOKEN: process.env.BOT_TOKEN as string,
  API_BASE_URL: process.env.API_BASE_URL as string,
};
